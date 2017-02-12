import { Component, OnInit } from '@angular/core';

import { Answer } from './../answer/answer';
import { AnswerService } from './../answer/answer.service';
import { Question } from './../question/question';
import { QuestionService } from './../question/question.service';
import { Result } from './../result/result';
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
    result  : Result;

    constructor(
        public answerService: AnswerService,
        public questionService: QuestionService,
        public userService: UserService
    ) {  }

    /**
     * Get a random question
     * 
     * @private
     * 
     * @memberOf QuizComponent
     */
    private getRandomQuestion() {
        this.questionService.getQuestion("/api/quiz").subscribe(quiz => {
            this.questionService.getQuestion(quiz._links.question.href).subscribe(question => {
                this.answerService.getAnswers(question._links.answers.href).subscribe(answers => {
                    question.setAnswers(answers);
                    this.question = question;
                    this.result.resultForQuestion = question;
                    this.result.resultOfUser      = this.user;
                });
            });
        });
    } 

    /**
     * Lifecycle-Hook for initialisation of the component
     * The current user is obtained as well as a random question from the server.
     * 
     * @memberOf QuizComponent
     */
    public ngOnInit() {
        this.result = new Result();
        this.user   = this.userService.getUserFromLocalStorage();
        this.getRandomQuestion();
    }

    /**
     * Select/Deselect an answer as correct
     * 
     * @param {Answer} answer selected/deselected
     * 
     * @memberOf QuizComponent
     */
    public choose(answer: Answer) {
        if ( this.chosen(answer) ) {
            this.result.removeAnswer(this.result.givenAnswers.indexOf(answer));
            return;
        }
        this.result.addAnswer(answer);
    }

    /**
     * Checks whether an answer is selected
     * 
     * @param {Answer} answer to check
     * @returns {boolean} whether the answer is selected
     * 
     * @memberOf QuizComponent
     */
    public chosen(answer: Answer): boolean {
        return this.result.givenAnswers.indexOf(answer) >= 0;
    }
}