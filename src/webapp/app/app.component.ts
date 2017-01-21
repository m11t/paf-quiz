import { Component } from '@angular/core';
import { User } from './classes/user';

@Component({
  selector: 'paf-quiz',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
    
    public user : User;

    constructor() {
        this.user = new User();
        this.user.logout();
    }

}