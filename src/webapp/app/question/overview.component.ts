import { Component, Input, OnInit } from '@angular/core';

import { User } from './../user/user';
import { UserService } from './../user/user.service';
import { Question } from './question';
import { QuestionService } from './question.service';
import { MessageService } from './../misc/message.service';

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
    
    private user     : User;
    public  questions: Array<Question>;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private questionService: QuestionService
    ) {
        
    }

    /**
     * Lifecycle-Hook for initialisation of the component
     * The list of questions of the current user is retrieved from the server
     * 
     * @memberOf QuestionOverviewComponent
     */
    public ngOnInit() {
        this.user = this.userService.getUserFromLocalStorage();
        this.questionService.getQuestions(this.user._links.questions.href).subscribe(
            (questions) => this.questions = questions
        );
    }

    /**
     * Remove a question from the server
     * 
     * @param {Question} question
     * 
     * @memberOf QuestionOverviewComponent
     */
    public remove(question: Question) {
        this.questionService.remove(question).subscribe(deleted => {
            this.messageService.nextSuccess("The question was successfully deleted!");
            this.questionService.getQuestions(this.user._links.questions.href).subscribe(
                (questions) => this.questions = questions
            );
        });
    }

}