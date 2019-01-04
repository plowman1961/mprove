import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as actions from 'app/store/actions/_index';
import * as actionTypes from 'app/store/action-types';

@Injectable()
export class CommitRepoSuccessEffect {
  @Effect() commitRepoSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(actionTypes.COMMIT_REPO_SUCCESS),
    mergeMap((action: actions.CommitRepoSuccessAction) =>
      from([new actions.UpdateReposStateAction([action.payload.dev_repo])])
    )
  );

  constructor(private actions$: Actions) {}
}
