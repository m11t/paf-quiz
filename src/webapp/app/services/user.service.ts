import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { User } from './../classes/user';
import { ResponseHandler } from './../classes/responsehandler';

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
    
    constructor(private http: Http) {
        super();
        this.userSubject = new BehaviorSubject(new User());
        this.user        = this.userSubject.asObservable();
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
    public login(userId: string, password: string): Observable<User> {
        let headers    = new Headers({'Content-Type': 'application/json'});
        let options    = new RequestOptions({headers: headers});

        // ~~~ Create observable login request to the server
        let observable = this.http.post(this.authURL+"/login?user="+userId+"&password="+password, options)
                            .map(this.mapJSON)
                            .catch(this.handleError)
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
    public logout(): User {
        let currentUser = this.userSubject.getValue(),
            nextUser = new User();
        
        nextUser.id = currentUser.id;
        this.userSubject.next(nextUser);
        return nextUser;
    }
}
