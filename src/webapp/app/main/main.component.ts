import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../user/user';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';

/**
 * Application Component
 * 
 * @export
 * @class MainComponent
 */
@Component({
  templateUrl: 'app/main/main.component.html',
  providers: [
      UserService
  ]
})
export class MainComponent {

    user: User;

    constructor(private router: Router, public userService: UserService) {
        this.user = this.userService.getUserFromLocalStorage();
    }

    /**
     * Log out the current user
     * 
     * 
     * @memberOf MainComponent
     */
    public logOut() {
        this.user = this.userService.logOut(this.user);
        this.router.navigate(['/login']);
    }
}