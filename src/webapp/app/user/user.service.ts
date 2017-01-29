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

    /**
     * @member {User} user Current user
     * @memberOf UserService
     */
    user: User;
    
    constructor(private http: Http, private messageService: MessageService) {
        super();
        this.user = new User();
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
        let observable = this.http.post(this.authURL+"/signup", parameters)
                            .map(this.mapJSON)
                            .catch(err => this.handleError(err))
                            .share();
        // ~~~ Automatically subscribe in order to update the member user
        observable.subscribe(user => {
            let userWithLinks = new User(user);
            this.http.get(user._links.self.href).map(this.mapJSON).catch(err => this.handleError(err)).subscribe(userResource => {
                userWithLinks.setLinks(userResource._links);
                this.user = userWithLinks;
            });
        });
        return observable;
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
        let observable = this.http.post(this.authURL+"/login", parameters)
                            .map(this.mapJSON)
                            .catch(err => this.handleError(err))
                            .share();
        // ~~~ Automatically subscribe in order to update the member user
        observable.subscribe(user => {
            let userWithLinks = new User(user);
            this.http.get(user._links.self.href).map(this.mapJSON).catch(err => this.handleError(err)).subscribe(userResource => {
                userWithLinks.setLinks(userResource._links);
                this.user = userWithLinks;
            });
        });
        return observable;
    }

    /**
     * Logs out the current user 
     * 
     * 
     * @memberOf UserService
     */
    public logOut(): User {
        let currentUser = this.user;
        this.user       = new User();
        this.user.id    = currentUser.id;
        return this.user;
    }

}
