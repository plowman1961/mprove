import { createSelector } from '@ngrx/store';
import { getLayoutState } from '@app/store/selectors/get-state/get-layout-state';
import * as interfaces from '@app/interfaces/_index';

export const getLayoutDry = createSelector(
  getLayoutState,
  (state: interfaces.LayoutState) => state.dry
);
