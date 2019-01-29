import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store/action-types';

export class DeleteFolderAction implements Action {
  readonly type = actionTypes.DELETE_FOLDER;

  constructor(public payload: api.DeleteFolderRequestBodyPayload) {}
}
