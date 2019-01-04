import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as actions from 'app/store/actions/_index';
import * as actionTypes from 'app/store/action-types';
import * as interfaces from 'app/interfaces/_index';
import * as selectors from 'app/store/selectors/_index';

@Injectable()
export class RestartWebSocketEffect {
  @Effect() restartWebSocket$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.RESTART_WEBSOCKET),
    map((action: actions.RestartWebSocketAction) => {
      let wsOpen: boolean = false;
      this.store
        .select(selectors.getWebSocketIsOpen)
        .pipe(take(1))
        .subscribe(isOpen => (wsOpen = isOpen));

      if (wsOpen) {
        return new actions.CloseWebSocketAction();
      } else {
        return new actions.OpenWebSocketAction();
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<interfaces.AppState>
  ) {}
}
