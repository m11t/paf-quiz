import { Component, Input } from '@angular/core';

import { User } from './../user/user';

/**
 * Form component to create and edit a questions of a user
 * 
 * @export
 * @class QuestionFormComponent
 */
@Component({
    selector: "question-form",
    templateUrl: "app/question/form.component.html"
})
export class QuestionFormComponent {
    
    @Input()
    user: User;

    constructor() {
        
    }

}