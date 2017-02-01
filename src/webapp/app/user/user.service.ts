import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { User } from './user';
import { ResponseHandler } from './../misc/responsehandler';
import { MessageService } from './../misc/message.service';

/**
 * REST service class for interacting with the user REST-API
 * 
 * @export
 * @class UserService
 * @extends {ResponseHandler}
 */
@Injectable()
export class UserService extends ResponseHandler {
    private authURL = "/api/auth";

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
     * Returns an observable for the http request to a user resource
     * 
     * @param {string} link         link to the user resource
     * @returns {Observable<User>}  HTTP-Request-Observable
     * 
     * @memberOf UserService
     */
    public getUser(link: string): Observable<User> {
        return this.http
                .get(link)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }

    /**
     * Cache a User as current user in the localStorage
     * 
     * @param {User} user
     * 
     * @memberOf UserService
     */
    public setUserToLocalStorage(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Return the user from the localStorage
     * 
     * @returns {User}
     * 
     * @memberOf UserService
     */
    public getUserFromLocalStorage(): User {
        let user = JSON.parse(localStorage.getItem('user')) || {};
        return new User(user);
    }

    /**
     * Remove the current user from the localStorage
     * 
     * 
     * @memberOf UserService
     */
    public removeUserFromLocalStorage() {
        localStorage.removeItem('user');
    }

    /**
     * Tries to signup the user with the provided user credentials
     * If this is successful the users links are additionally loaded and the observable {@link UserService#user} is updated
     * 
     * @param {string} userId       the user id
     * @param {string} password     the password
     * @returns {Observable<User>}  the observable HTTP-Signup-Request
     * 
     * @memberOf UserService
     */
    public signUp(userId: string, password: string): Observable<User> {
        let parameters = new URLSearchParams();
            parameters.append("user"    , userId);
            parameters.append("password", password);

        // ~~~ Create observable login request to the server
        return this.http
                .post(this.authURL+"/signup", parameters)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }

    /**
     * Tries to login with the provided user credentials
     * If this is successful the users links are additionally loaded and the observable {@link UserService#user} is updated
     * 
     * @param {string} userId       User ID
     * @param {string} password     Password
     * @returns {Observable<User>}  the Observable HTTP-Login-Request
     * 
     * @memberOf UserService
     */
    public logIn(userId: string, password: string): Observable<User> {
        let parameters = new URLSearchParams();
            parameters.append("user"    , userId);
            parameters.append("password", password);

        // ~~~ Create observable login request to the server
        return this.http
                .post(this.authURL+"/login", parameters)
                .map(this.mapJSON)
                .catch(err => this.handleError(err));
    }

    /**
     * Logs out the current user 
     * 
     * @param {User} currentUser
     * @returns {User}           a user dummy with only the previously logged in users id
     * 
     * @memberOf UserService
     */
    public logOut(currentUser: User): User {
        let nextUser    = new User();
            nextUser.id = currentUser.id;

        this.removeUserFromLocalStorage();
        return nextUser;
    }

}
