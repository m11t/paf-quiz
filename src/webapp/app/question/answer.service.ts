import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Answer } from './answer';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class AnswerService extends ResponseHandler {

    private answersLink: string = '/api/answers';

    constructor(private http: Http, private messageService: MessageService) {
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
     * Returns the list of answers from a Server HAL response
     * 
     * @private
     * @param {*} response to be converted
     * @returns {Array<Answer>} list of answers
     * 
     * @memberOf AnswerService
     */
    private mapAnswers(response: any) {
        return response._embedded.answers;
    }

    /**
     * Get a list of answers from the server
     * 
     * @param {string} link to the list of answers
     * @returns {Observable<Array<Answer>>} HTTP-Request
     * 
     * @memberOf AnswerService
     */
    public getAnswers(link: string) {
        return this.http
                .get(link)
                .map(this.mapJSON)
                .map(this.mapAnswers)
                .catch(err => this.handleError(err));
    }

    /**
     * Save an Answer in the servers database
     * 
     * @param {Answer} answer to be saved
     * @returns {Observable} HTTP-Request
     * 
     * @memberOf AnswerService
     */
    public save(answer: Answer): Observable<Answer> {
        let requestHeaders = new Headers({'Content-Type': 'application/json'});
        let requestOptions = new RequestOptions({headers: requestHeaders});
        return this.http
                .post(this.answersLink, answer, requestOptions)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }

    
    /**
     * Save an answer in the server and return a Promise for it
     * 
     * @param {Answer} answer to be saved
     * @returns {Promise<Answer>} HTTP-Request
     * 
     * @memberOf AnswerService
     */
    public saveAsPromise(answer: Answer): Promise<Answer> {
        return new Promise((resolve, reject) => {
            this.save(answer).subscribe(
                answer => resolve(answer),
                error => reject(error)
            );
        });
    }
}