import { Component } from '@angular/core';
import { User } from './classes/user';

/**
 * Application Component
 * 
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'paf-quiz',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
    
    public user : User;

    constructor() {
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

}