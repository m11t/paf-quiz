import { Component } from '@angular/core';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { MessageService } from './misc/message.service';

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
        this.user = JSON.parse(localStorage.getItem('user'));
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
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Log out the current user
     * 
     * 
     * @memberOf AppComponent
     */
    public logOut() {
        this.user = this.userService.logOut(this.user);
        localStorage.removeItem('user');
    }
}