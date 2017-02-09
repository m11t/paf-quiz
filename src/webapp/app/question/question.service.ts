import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Question } from './question';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class QuestionService extends ResponseHandler {

    private questionsLink: string = '/api/questions';

    constructor(
        private http: Http, 
        private messageService: MessageService
    ) {
        super();
    }

    /**
     * Overrides [ResponseHandler.handleError]{@link ResponseHandler#handleError} to additionaly post the message to the global {@link MessageService}
     * 
     * @protected
     * @param {(Response | any)} error
     * @returns
     * 
     * @memberOf UserService
     */
    protected handleError(error: Response | any) {
        let errorMessage = this.getError(error);
        this.messageService.next(errorMessage);
        return Observable.throw(errorMessage);
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
                .get(link)
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
        let requestHeaders = new Headers({'Content-Type': 'application/json'});
        let requestOptions = new RequestOptions({headers: requestHeaders});
        return this.http
                .post(this.questionsLink, question, requestOptions)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }
}