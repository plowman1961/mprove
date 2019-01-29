import { Action } from '@ngrx/store';
import * as actionTypes from '@app/store/action-types';

export class ConfirmSuccessAction implements Action {
  readonly type = actionTypes.CONFIRM_SUCCESS;

  constructor() {}
}
