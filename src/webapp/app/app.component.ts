import { Component } from '@angular/core';
import { User } from './classes/user';
import { UserService } from './services/user.service';

/**
 * Application Component
 * 
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'paf-quiz',
  templateUrl: 'app/app.component.html',
  providers: [
      UserService
  ]
})
export class AppComponent {

    user: User;

    constructor(public userService: UserService) {
        this.user = new User();
    }

    /**
     * Caches the user data after successful login
     * 
     * @param {User} user
     * 
     * @memberOf AppComponent
     */
    public onLoginSuccessful(user: User) {
        this.user = user;
    }

    /**
     * Log out the current user
     * 
     * 
     * @memberOf AppComponent
     */
    public logOut() {
        this.user = this.userService.logOut();
    }
}