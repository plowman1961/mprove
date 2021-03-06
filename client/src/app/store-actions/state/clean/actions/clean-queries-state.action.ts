import { Action } from '@ngrx/store';
import * as actionTypes from '@app/store-actions/action-types';

export class CleanQueriesStateAction implements Action {
  readonly type = actionTypes.CLEAN_QUERIES_STATE;

  constructor(
    public payload: { project_id: string; repo_id: string; struct_id: string }
  ) {}
}
