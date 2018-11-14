import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import * as enums from 'app/enums/_index';
import * as services from 'app/services/_index';

@Injectable()
export class AuthCanActivateGuard implements CanActivate {
  constructor(
    private printer: services.PrinterService,
    private auth: services.AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {
    if (this.auth.authenticated()) {
      this.printer.log(
        enums.busEnum.AUTH_CAN_ACTIVATE,
        'authenticated, resolved (true)'
      );
      return true;
    } else {
      this.printer.log(enums.busEnum.AUTH_CAN_ACTIVATE, 'not authenticated');

      let url: string = routerStateSnapshot.url;

      this.printer.log(
        enums.busEnum.AUTH_CAN_ACTIVATE,
        'setting redirect_url:',
        url
      );
      localStorage.setItem('redirect_url', url);

      this.printer.log(
        enums.busEnum.AUTH_CAN_ACTIVATE,
        'navigating login...',
        url
      );
      this.router.navigate(['/login']);

      this.printer.log(enums.busEnum.AUTH_CAN_ACTIVATE, 'resolved (false)');
      return false;
    }
  }
}
