import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class LoginComponent implements OnInit {

    forwardTo    : string;
    user         : User;
    showingSignUp: boolean;

    constructor(
        private route         : ActivatedRoute,
        private router        : Router,
        public  userService   : UserService, 
        public  messageService: MessageService
    ) {}

    ngOnInit() {
        this.user          = new User();
        this.showingSignUp = false;
        this.forwardTo     = this.route.snapshot.queryParams['forwardTo'] || '';
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
            loggedUser => {
              this.userService.getUser(loggedUser._links.self.href)
                .subscribe(linkingUser => {
                  this.userService.setUserToLocalStorage(User.createUser(loggedUser.id, loggedUser.token, linkingUser._links))
                  this.router.navigate([this.forwardTo]);
                });
            }
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
          loggedUser => {
            this.userService.getUser(loggedUser._links.self.href)
              .subscribe(linkingUser => {
                this.userService.setUserToLocalStorage(User.createUser(loggedUser.id, loggedUser.token, linkingUser._links))
                this.showingSignUp = false;
              });
          }
        )
    }
    
}