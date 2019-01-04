import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as actions from 'app/store/actions/_index';
import * as actionTypes from 'app/store/action-types';

@Injectable()
export class RunQueriesSuccessEffect {
  @Effect() runQueriesSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.RUN_QUERIES_SUCCESS),
    mergeMap((action: actions.RunQueriesSuccessAction) =>
      from([
        new actions.UpdateQueriesStateAction(action.payload.running_queries)
      ])
    )
  );

  constructor(private actions$: Actions) {}
}
