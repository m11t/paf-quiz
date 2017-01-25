import { Observable } from 'rxjs/Observable';
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
    
    constructor(private http: Http) {
        super();
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
        let parameters = {user: userId, password:password};

        return this.http
                .post(this.authURL+"/login?user="+userId+"&password="+password, options)
                .map(this.mapJSON)
                .catch(this.handleError);
    }
}
