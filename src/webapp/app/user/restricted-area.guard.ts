import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
/**
 * Class guarding the restricted areas of the quiz application
 * 
 * @export
 * @class RestrictedAreaGuard
 * @implements {CanActivate}
 */
@Injectable()
export class RestrictedAreaGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    /**
     * Function to determine, whether a resource may be activated or not
     * 
     * @param {ActivatedRouteSnapshot} route Requested route
     * @param {RouterStateSnapshot}    state Router state
     * @returns
     * 
     * @memberOf RestrictedAreaGuard
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // ~~~ User is logged in
        if (localStorage.getItem('user')) {
            return true;
        }
 
        // ~~~ User is not logged into the system
        this.router.navigate(['/login'], { queryParams: { forwardTo: state.url }});
        return false;
    }
}