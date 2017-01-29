import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './user/user.service';
import { MessageService } from './misc/message.service';
import { User } from './user/user';

/**
 * Login Component 
 * 
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html',
  providers: [
    UserService,
    MessageService
  ]
})
export class LoginComponent {

    user         : User;
    showingSignUp: boolean;

    @Output()
    onLoginSuccessful = new EventEmitter();

    constructor(public userService: UserService, public messageService: MessageService) { 
        this.user          = new User();
        this.showingSignUp = false;
    }

    /**
     * Toggles the sign up form
     * 
     * 
     * @memberOf LoginComponent
     */
    public toggleSignUp() {
      this.showingSignUp = !this.showingSignUp;
    }

    /**
     * Tries a login with the current user credentials entered into the form.
     * 
     * 
     * @memberOf LoginComponent
     */
    public logIn() {
        this.userService
          .logIn(
            this.user.id, 
            this.user.password
          )
          .subscribe(
            user => this.onLoginSuccessful.emit(new User(user))
          );
    }

    /**
     * Signs the user up for an account and logs him in, if the validation has been successful.
     * 
     * 
     * @memberOf LoginComponent
     */
    public signUp() {
      this.userService
        .signUp(
          this.user.id,
          this.user.password
        )
        .subscribe(
          user => {
            this.onLoginSuccessful.emit(new User(user));
            this.showingSignUp = false;
          }
        )
    }
    
}