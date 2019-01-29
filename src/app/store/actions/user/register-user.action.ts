import { Action } from '@ngrx/store';
import * as api from '@app/api/_index';
import * as actionTypes from '@app/store/action-types';

export class RegisterUserAction implements Action {
  readonly type = actionTypes.REGISTER_USER;

  constructor(public payload: api.RegisterUserRequestBodyPayload) {}
}
