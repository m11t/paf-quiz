import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './../services/message.service';

/**
 * Abstract class for handling REST responses
 * 
 * @export
 * @class ResponseHandler
 */
export class ResponseHandler {

    protected constructor() { }

    /**
     * Extracts the error message from a REST response and returns it
     * 
     * @protected
     * @param {(Response | any)} error the REST response
     * @returns {string}               the error message from the server
     * 
     * @memberOf ResponseHandler
     */
    protected getError(error: Response | any): string {
       let errorMessage: string;

        if ( error instanceof Response ) {
            const body = error.json() || '';
            errorMessage = body.message || JSON.stringify(body);
        } else {
            errorMessage = (error.message) ? error.message : error.toString();
        }
        return errorMessage;
     }

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
        return Observable.throw(this.getError(error));
    }
}