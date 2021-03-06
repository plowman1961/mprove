import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as actions from '@app/store-actions/actions';
import * as actionTypes from '@app/store-actions/action-types';

@Injectable()
export class SetUserTimezoneSuccessEffect {
  @Effect() setUserTimezoneSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.SET_USER_TIMEZONE_SUCCESS),
    mergeMap((action: actions.SetUserTimezoneSuccessAction) =>
      from([new actions.UpdateUserStateAction(action.payload.user)])
    )
  );

  constructor(private actions$: Actions) {}
}
