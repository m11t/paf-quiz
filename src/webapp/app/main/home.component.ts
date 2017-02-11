import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../user/user';
import { MessageService } from './../misc/message.service';

/**
 * Home Component with a few shortcuts
 * 
 * @export
 * @class HomeComponent
 */
@Component({
  templateUrl: 'app/main/home.component.html'
})
export class HomeComponent {

    constructor(private router: Router) {
        
    }

}