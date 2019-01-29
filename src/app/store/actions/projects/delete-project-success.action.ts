import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store/action-types';

export class DeleteProjectSuccessAction implements Action {
  readonly type = actionTypes.DELETE_PROJECT_SUCCESS;

  constructor(public payload: api.DeleteProjectResponse200BodyPayload) {}
}
