import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Result } from './result';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class ResultService extends ResponseHandler {

    private resultLink: string = '/api/results';

    constructor(
        private http: Http,
        private userService: UserService,
                messageService: MessageService
    ) {
        super(messageService);
    }

    /**
     * Returns the list of results from a Server HAL response
     * 
     * @private
     * @param {*} response to be converted
     * @returns {Array<Result>} list of Results
     * 
     * @memberOf ResultService
     */
    private mapResults(response: any) {
        return response._embedded.results.map(
            (result: any) => new Result(result)
        );
    }

    /**
     * Get a list of results from the server
     * 
     * @param {string} link to the list of results
     * @returns {Observable<Array<Result>>} HTTP-Request
     * 
     * @memberOf ResultService
     */
    public getResults(link: string = this.resultLink) {
        return this.http
                .get(link, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .map(this.mapResults)
                .catch(err => this.handleError(err));
    }

    /**
     * Save a result in the servers database
     * 
     * @param {Result} result to be saved
     * @returns {Observable} HTTP-Request
     * 
     * @memberOf ResultService
     */
    public save(result: Result) {
        let requestOptions = this.userService.getAuthorizationOptions();
            requestOptions.headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.resultLink, result, requestOptions)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }
}