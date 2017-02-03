import { Component, Input, OnInit } from '@angular/core';

import { User } from './../user/user';

/**
 * Overview component to display the questions of a user
 * Additionally the user gets the possibility to manage his pool of questions
 * 
 * @export
 * @class QuestionOverviewComponent
 */
@Component({
    templateUrl: "app/question/overview.component.html"
})
export class QuestionOverviewComponent implements OnInit {
    
    @Input()
    user: User;

    constructor() {
        
    }

    ngOnInit() {
        
    }

}