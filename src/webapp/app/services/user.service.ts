import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { User } from './../classes/user';
import { ResponseHandler } from './../classes/responsehandler';
import { MessageService } from './message.service';

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
    private userSubject: BehaviorSubject<User>;

    /**
     * @member {BehaviorSubject<User>} user Current user
     * @memberOf UserService
     */
    user: Observable<User>;
    
    constructor(private http: Http, private messageService: MessageService) {
        super();
        this.userSubject = new BehaviorSubject(new User());
        this.user        = this.userSubject.asObservable();
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
        observable.subscribe(
            user => this.userSubject.next(new User(user))
        );
        return observable;
    }

    /**
     * Tries to login with the provided user credentials
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
        observable.subscribe(
            user => this.userSubject.next(new User(user))
        );
        return observable;
    }

    /**
     * Logs out the current user 
     * 
     * 
     * @memberOf UserService
     */
    public logOut(): User {
        let currentUser = this.userSubject.getValue(),
            nextUser = new User();
        
        nextUser.id = currentUser.id;
        this.userSubject.next(nextUser);
        return nextUser;
    }
}
