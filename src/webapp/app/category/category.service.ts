import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from './category';
import { UserService } from './../user/user.service';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class CategoryService extends ResponseHandler {

    private categoryLink: string = '/api/categories';

    constructor(
        private http: Http,
        private userService: UserService,
                messageService: MessageService
    ) {
        super(messageService);
    }

    /**
     * Returns the list of categories from a Server HAL response
     * 
     * @private
     * @param {*} response to be converted
     * @returns {Array<Category>} list of Categorys
     * 
     * @memberOf CategoryService
     */
    private mapCategories(response: any) {
        return response._embedded.categories.map(
            (category: any) => new Category(category)
        );
    }

    /**
     * Get a list of categories from the server
     * 
     * @param {string} link to the list of categories
     * @returns {Observable<Array<Category>>} HTTP-Request
     * 
     * @memberOf CategoryService
     */
    public getCategories(link: string = this.categoryLink): Observable<Array<Category>> {
        return this.http
                .get(link, this.userService.getAuthorizationOptions())
                .map(this.mapJSON)
                .map(this.mapCategories)
                .catch(err => this.handleError(err));
    }

    /**
     * Save a category in the servers database
     * 
     * @param {Category} category to be saved
     * @returns {Observable} HTTP-Request
     * 
     * @memberOf CategoryService
     */
    public save(category: Category) {
        let requestOptions = this.userService.getAuthorizationOptions();
            requestOptions.headers.append('Content-Type', 'application/json');
        return this.http
                .post(this.categoryLink, category, requestOptions)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }
}