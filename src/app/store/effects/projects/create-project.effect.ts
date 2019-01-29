import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from '@app/store/actions/_index';
import * as actionTypes from '@app/store/action-types';
import * as services from '@app/services/_index';

@Injectable()
export class CreateProjectEffect {
  @Effect() createProject$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.CREATE_PROJECT),
    mergeMap((action: actions.CreateProjectAction) =>
      this.backendService.createProject(action.payload).pipe(
        map(body => new actions.CreateProjectSuccessAction(body.payload)),
        catchError(e => of(new actions.CreateProjectFailAction({ error: e })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: services.BackendService
  ) {}
}
