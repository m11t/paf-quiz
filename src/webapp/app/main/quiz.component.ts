import { Component, OnInit } from '@angular/core';

import { Answer } from './../answer/answer';
import { AnswerService } from './../answer/answer.service';
import { Question } from './../question/question';
import { QuestionService } from './../question/question.service';
import { User } from './../user/user';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';

/**
 * Quiz Component for the actual quizzing with random questions
 * 
 * @export
 * @class QuizComponent
 */
@Component({
  templateUrl: 'app/main/quiz.component.html'
})
export class QuizComponent implements OnInit {

    user    : User;
    question: Question;
    choice  : number;

    constructor(
        public answerService: AnswerService,
        public questionService: QuestionService,
        public userService: UserService
    ) {  }

    /**
     * Lifecycle-Hook for initialisation of the component
     * The current user is obtained as well as a random question from the server.
     * 
     * @memberOf QuizComponent
     */
    public ngOnInit() {
        this.user = this.userService.getUserFromLocalStorage();
        this.questionService.getQuestion("/api/questions/2").subscribe(question => {
            this.answerService.getAnswers(question._links.answers.href).subscribe(answers => {
                question.setAnswers(answers);
                this.question = question;
            });
        });
    }

    /**
     * Choose a question as correct
     * 
     * @param {number} index
     * 
     * @memberOf QuizComponent
     */
    public choose(index: number) {
        this.choice = index;
    }

}