import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import * as actionTypes from '@app/store-actions/action-types';
import * as actions from '@app/store-actions/actions';
import * as api from '@app/api/_index';
import * as enums from '@app/enums/_index';
import * as interfaces from '@app/interfaces/_index';
import * as selectors from '@app/store-selectors/_index';
import * as services from '@app/services/_index';

@Injectable()
export class UpdateDashboardsStateEffect {
  @Effect({ dispatch: false }) updateDashboardsState$: Observable<
    Action
  > = this.actions$.pipe(
    ofType(actionTypes.UPDATE_DASHBOARDS_STATE),
    tap((action: actions.UpdateDashboardsStateAction) => {
      let selectedRepo: api.Repo;
      this.store
        .select(selectors.getSelectedProjectModeRepo)
        .pipe(take(1))
        .subscribe(x => (selectedRepo = x));

      let selectedDashboard: api.Dashboard;
      this.store
        .select(selectors.getSelectedProjectModeRepoDashboard)
        .pipe(take(1))
        .subscribe(dashboard => (selectedDashboard = dashboard));

      if (selectedDashboard) {
        // dashboard updated before repo
        if (selectedDashboard.struct_id !== selectedRepo.struct_id) {
          this.printer.log(
            enums.busEnum.UPDATE_DASHBOARDS_EFFECT,
            'selected dashboard struct_id mismatch'
          );
          this.printer.log(
            enums.busEnum.UPDATE_DASHBOARDS_EFFECT,
            'navigating profile...'
          );

          this.router.navigate(['profile']);
        }
      }
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private printer: services.PrinterService,
    private store: Store<interfaces.AppState>
  ) {}
}
