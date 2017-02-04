import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../user/user';
import { UserService } from './../user/user.service';
import { Question } from './question';
import { QuestionService } from './question.service';

/**
 * Form component to create and edit a questions of a user
 * 
 * @export
 * @class QuestionFormComponent
 */
@Component({
    templateUrl: "app/question/form.component.html"
})
export class QuestionFormComponent implements OnInit {
    
    user    : User;
    question: Question;

    constructor(
        private router: Router, 
        private userService: UserService, 
        private questionService: QuestionService
    ) { }

    /**
     * Lifecycle-Hook for initialisation of the component
     * A new question is prepared and filled with the current user.
     * 
     * @memberOf QuestionFormComponent
     */
    public ngOnInit() {
        this.user     = this.userService.getUserFromLocalStorage();
        this.question = new Question();
        this.question.questioner = this.user._links.self.href;
    }

    /**
     * Submit the currently created/edited question to be saved in the servers database
     * 
     * @memberOf QuestionFormComponent
     */
    public onSubmit() {
        this.questionService.save(this.question).subscribe(
            (value) => {
                console.log(value);
                this.router.navigate(['/question','list']);
            }
        );
    }

}