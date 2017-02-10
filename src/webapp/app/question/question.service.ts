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
     * Returns the list of questions from a Server HAL response
     * 
     * @private
     * @param {*} response to be converted
     * @returns {Array<Question>} list of questions
     * 
     * @memberOf QuestionService
     */
    private mapQuestions(response: any) {
        return response._embedded.questions;
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
}