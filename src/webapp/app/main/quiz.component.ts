import { Component, OnInit } from '@angular/core';

import { Answer } from './../answer/answer';
import { AnswerService } from './../answer/answer.service';
import { Category } from './../category/category';
import { CategoryService } from './../category/category.service';
import { Question } from './../question/question';
import { QuestionService } from './../question/question.service';
import { Result } from './../result/result';
import { ResultService } from './../result/result.service';
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
        public categoryService: CategoryService,
        public questionService: QuestionService,
        public resultService: ResultService,
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
        this.result = new Result();
        this.result.userOfResult = this.user;
        this.questionService.getQuestion("/api/quiz").subscribe(quiz => {
            this.questionService.getQuestion(quiz._links.question.href).subscribe(question => {
                this.question = question;
                this.answerService.getAnswers(question._links.answers.href).subscribe(answers => {
                    this.question.setAnswers(answers);
                });
                this.categoryService.getCategories(question._links.categoriesOfQuestion.href).subscribe(categories => {
                    this.result.setCategories(categories);
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
        this.user = this.userService.getUserFromLocalStorage();
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
            this.result.removeAnswer(this.result.answers.indexOf(answer));
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
        return this.result.answers.indexOf(answer) >= 0;
    }

    /**
     * Confirm the choices and save the result in the database
     * 
     * @memberOf QuizComponent
     */
    public confirm() {
        this.resultService.save(this.result.preparedForSave()).delay(3000).subscribe(result => {
            this.getRandomQuestion();
        });
    }
}