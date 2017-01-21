import { Component, Input } from '@angular/core';
import { User } from './classes/user';

@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html'
})
export class LoginComponent {

    @Input()
    user : User;
    
}