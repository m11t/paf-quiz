import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Abstract class for handling REST responses
 * 
 * @export
 * @class ResponseHandler
 */
export class ResponseHandler {
    protected constructor() { }

    /**
     * Extracts the actual data of a REST response
     * 
     * @protected
     * @param {Response} response   the REST response
     * @returns {any}               the actual data returned from the server
     * 
     * @memberOf ResponseHandler
     */
    protected mapJSON(response: Response) {
        return response.json() || {};
    }

    /**
     * Error handler for REST responses
     * 
     * @protected
     * @param {(Response | any)} error      the response from the server
     * @returns {ErrorObservable<string>}   the error message as an observable
     * 
     * @memberOf ResponseHandler
     */
    protected handleError(error: Response | any) {
        let errorMessage: string;

        if ( error instanceof Response ) {
            const body = error.json() || '';
            const err  = body.error || JSON.stringify(body);
            errorMessage = error.status + " - " + (error.statusText || '') + " " + err;
        } else {
            errorMessage = (error.message) ? error.message : error.toString();
        }
        console.error(errorMessage)
        return Observable.throw(errorMessage);
    }
}