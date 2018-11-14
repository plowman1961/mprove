import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import * as interfaces from 'app/interfaces/_index';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export class NgrxCustomRouterStateSerializer
  implements RouterStateSerializer<interfaces.NgrxRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): interfaces.NgrxRouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams };
  }
}
