import * as express from 'express';
import * as expressWs from 'express-ws';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as lusca from 'lusca';
import * as passport from 'passport';
import * as jsonwebtoken from 'jsonwebtoken';

import expressValidator = require('express-validator');

import { interfaces } from './barrels/interfaces';
import { middleware } from './barrels/middleware';
import { store } from './barrels/store';
import { handler } from './barrels/handler';
import { enums } from './barrels/enums';
import { helper } from './barrels/helper';

import { registerRoutes } from './register-routes';
import { passportLocalStrategy } from './passport-local-strategy';

export function createExpress() {
  passport.use(passportLocalStrategy);

  const appExpress = express();

  const expressWsInstance = expressWs(appExpress);
  const app = expressWsInstance.app;

  app.set('port', process.env.BACKEND_PORT || 8080);
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(expressValidator());
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Auth'
    );
    next();
  });

  let middlewares = [
    handler.catchAsyncErrors(
      middleware.checkRequestId,
      enums.middlewareErrorsEnum.MIDDLEWARE_CHECK_REQUEST_ID
    ),
    handler.promisifyCatchAsyncErrors(
      middleware.checkJwt,
      enums.middlewareErrorsEnum.MIDDLEWARE_CHECK_JWT
    )
  ];

  // Initialize Passport before using the route middleware
  app.use(passport.initialize());

  registerRoutes(app, middlewares);

  // WEBSOCKET

  let wsClients: interfaces.WebsocketClient[] = [];

  app.ws('/api/v1/webchat/:init_id', async (ws, req) => {
    let initId = req.params.init_id;

    let protocolHeader = req.headers['sec-websocket-protocol'];

    let token = protocolHeader
      ? protocolHeader.toString().substring(6)
      : undefined;

    let isValid: boolean = true;

    try {
      let decoded = jsonwebtoken.verify(token, process.env.BACKEND_JWT_SECRET);
    } catch (err) {
      isValid = false;
    }

    if (!isValid) {
      // Authorization error
      ws.close(4504);
      return;
    }

    if (!initId) {
      // Init_id is missing in url
      ws.close(4500);
      return;
    }

    let storeSessions = store.getSessionsRepo();

    let session = await storeSessions
      .findOne({
        session_id: initId
      })
      .catch(e =>
        helper.reThrow(e, enums.storeErrorsEnum.STORE_SESSIONS_FIND_ONE)
      );

    if (!session) {
      // init_id not found
      ws.close(4501);
      return;
    }

    if (session.is_activated === enums.bEnum.FALSE) {
      session.is_activated = enums.bEnum.TRUE;
      session.last_pong_ts = helper.makeTs();

      await storeSessions
        .save(session)
        .catch(e =>
          helper.reThrow(e, enums.storeErrorsEnum.STORE_SESSIONS_SAVE)
        );
    }

    let wsClient: interfaces.WebsocketClient = {
      session_id: session.session_id,
      user_id: session.user_id,
      ws: ws
    };

    wsClients.push(wsClient);
  });

  app.use(handler.errorToResponse);

  app.listen(app.get('port'), () => {
    console.log('Backend is running.');
  });

  return {
    express_ws_instance: expressWsInstance,
    ws_clients: wsClients
  };
}
