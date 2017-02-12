import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Question } from './question';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class QuestionService extends ResponseHandler {

    private questionsLink: string = '/api/questions';

    constructor(
        private http: Http,
        private userService: UserService,
                messageService: MessageService
    ) {
        super(messageService);
    }

    /**
     * Return the serialized Question from a server response
     * 
     * @private
     * @param {*} response to be converted
     * @returns {Question} question object created from the response
     * 
     * @memberOf QuestionService
     */
    private mapQuestion(response: any): Question {
        return new Question(response);
    }

    /**
     * Returns the list of questions from a Server HAL response
     * 
     * @private
     * @param {*} response to be converted
     * @returns {Array<Question>} list of questions
     * 
     * @memberOf QuestionService
     */
    private mapQuestions(response: any) {
        return response._embedded.questions.map(
            (question: any) => new Question(question)
        );
    }

    /**
     * Returns an observable for the http request to a question resource
     * 
     * @param {string} link         link to the question resource
     * @returns {Observable<User>}  HTTP-Request-Observable
     * 
     * @memberOf QuestionService
     */
    public getQuestion(link: string): Observable<Question> {
        return this.http
                .get(link, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .map(this.mapQuestion)
                .catch(err => this.handleError(err));
    }

    /**
     * Get a list of questions from the server
     * 
     * @param {string} link to the list of questions
     * @returns {Observable<Array<Question>>} HTTP-Request
     * 
     * @memberOf QuestionService
     */
    public getQuestions(link: string) {
        return this.http
                .get(link, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .map(this.mapQuestions)
                .catch(err => this.handleError(err));
    }

    /**
     * Save a question in the servers database
     * 
     * @param {Question} question to be saved
     * @returns {Observable<Question>} HTTP-Request
     * 
     * @memberOf QuestionService
     */
    public save(question: Question): Observable<Question> {
        let requestOptions = this.userService.getAuthorizationOptions();
            requestOptions.headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.questionsLink, question, requestOptions)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }

    /**
     * Save the image of a question
     * 
     * @param {string} link to the repository endpoint to save the image
     * @param {FormData} formData including the image file
     * @returns {Observable<Question>} HTTP-Request
     * 
     * @memberOf QuestionService
     */
    public saveImage(link: string, formData: FormData) {
        return this.http
                .post(link, formData, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }

    /**
     * Remove a question from the server
     * 
     * @param {Question} question to be deleted
     * @returns {Observable<Question>} HTTP-Request
     * 
     * @memberOf QuestionService
     */
    public remove(question: Question): Observable<Question> {
        return this.http
                .delete(question._links.self.href, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .catch(err => this.handleError(err))
    }
}