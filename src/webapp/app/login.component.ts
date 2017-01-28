import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { User } from './classes/user';

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

    user: User;

    @Output()
    onLoginSuccessful = new EventEmitter();

    constructor(public userService: UserService, public messageService: MessageService) { 
        this.user  = new User();
    }

    /**
     * Tries a login with the current user credentials entered into the form.
     * 
     * 
     * @memberOf LoginComponent
     */
    public onSubmit() {
        this.userService
          .login(
            this.user.id, 
            this.user.password
          )
          .subscribe(
            user => this.onLoginSuccessful.emit(new User(user))
          );
    }
    
}