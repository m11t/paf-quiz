import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { MessageService } from './misc/message.service';

/**
 * Application Component
 * 
 * @export
 * @class WrapperComponent
 */
@Component({
  templateUrl: 'app/wrapper.component.html',
  providers: [
      UserService
  ]
})
export class WrapperComponent {

    user: User;

    constructor(private router: Router, public userService: UserService) {
        this.user = this.userService.getUserFromLocalStorage();
    }

    /**
     * Log out the current user
     * 
     * 
     * @memberOf WrapperComponent
     */
    public logOut() {
        this.user = this.userService.logOut(this.user);
        this.router.navigate(['/login']);
    }
}