import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from './category';
import { MessageService } from './../misc/message.service';
import { ResponseHandler } from './../misc/responsehandler';

@Injectable()
export class CategoryService extends ResponseHandler {

    private categoryLink: string = '/api/categories';

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
    public getCategories(link: string = this.categoryLink) {
        return this.http
                .get(link)
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
        let requestHeaders = new Headers({'Content-Type': 'application/json'});
        let requestOptions = new RequestOptions({headers: requestHeaders});
        return this.http
                .post(this.categoryLink, category, requestOptions)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }
}