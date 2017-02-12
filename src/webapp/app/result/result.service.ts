import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from './../category/category';
import { Result } from './result';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class ResultService extends ResponseHandler {

    private resultLink: string = '/api/results';
    private statByCategory: string = '/api/results/search/countByCategoriesOfResult';
    private statByCategoryAndCorrect: string = '/api/results/search/countByCategoriesOfResultAndCorrectTrue';
    private statByCategoryAndUser: string = '/api/results/search/countByUserOfResultAndCategoriesOfResult';
    private statByCategoryAndUserAndCorrect: string = '/api/results/search/countByUserOfResultAndCategoriesOfResultAndCorrectTrue';

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
                .post(link, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .map(this.mapResults)
                .catch(err => this.handleError(err));
    }

    /**
     * Count all results by category
     * 
     * @param {Category} category to count by
     * @returns {Observable<number>} the number of items
     * 
     * @memberOf ResultService
     */
    public countByCategory(category: Category): Observable<number> {
        let parameters = new URLSearchParams();
            parameters.append("categories", category._links.self.href);
        
        return this.http
                .get(this.statByCategory + "?" + parameters, this.userService.getAuthorizationOptions())
                .map(this.mapNumber)
                .catch(err => this.handleError(err));
    }

    /**
     * Count all results by category and current user
     * 
     * @param {Category} category to count by
     * @returns {Observable<number>} the number of items
     * 
     * @memberOf ResultService
     */
    public countByCategoryAndUser(category: Category): Observable<number> {
        let parameters = new URLSearchParams();
            parameters.append("categories", category._links.self.href);
            parameters.append("user", this.userService.getUserFromLocalStorage()._links.self.href);
        
        return this.http
                .get(this.statByCategoryAndUser + "?" + parameters, this.userService.getAuthorizationOptions())
                .map(this.mapNumber)
                .catch(err => this.handleError(err));
    }

    /**
     * Count correct results by category
     * 
     * @param {Category} category to count by
     * @returns {Observable<number>} the number of items
     * 
     * @memberOf ResultService
     */
    public countCorrectByCategory(category: Category): Observable<number> {
        let parameters = new URLSearchParams();
            parameters.append("categories", category._links.self.href);
       
        return this.http
                .get(this.statByCategoryAndCorrect + "?" + parameters, this.userService.getAuthorizationOptions())
                .map(this.mapNumber)
                .catch(err => this.handleError(err));
    }

    /**
     * Count correct results by category and current user
     * 
     * @param {Category} category to count by
     * @returns {Observable<number>} the number of items
     * 
     * @memberOf ResultService
     */
    public countCorrectByCategoryAndUser(category: Category): Observable<number> {
        let parameters = new URLSearchParams();
            parameters.append("categories", category._links.self.href);
            parameters.append("user", this.userService.getUserFromLocalStorage()._links.self.href);
        
        return this.http
                .get(this.statByCategoryAndUserAndCorrect + "?" + parameters, this.userService.getAuthorizationOptions())
                .map(this.mapNumber)
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