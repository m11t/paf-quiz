import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MessageService } from './../misc/message.service';
import { AlertMessage, IRestErrorResponse, RestErrorResponse } from './rest-error-response';

/**
 * Abstract class for handling REST responses
 * 
 * @export
 * @class ResponseHandler
 */
export class ResponseHandler {

    protected constructor(protected messageService: MessageService) { }

    /**
     * Extracts the error message from a REST response and returns it
     * 
     * @protected
     * @param {(Response | any)} error the REST response
     * @returns {AlertMessage} the error message from the server
     * 
     * @memberOf ResponseHandler
     */
    protected getError(error: Response | any): AlertMessage {
        let alert: AlertMessage;
        let body : any;
        
        if ( error instanceof Response ) {
            if ( error.headers.get('Content-Type').includes('json') ) {
                body = error.json();
                try {
                    alert = new RestErrorResponse(body);
                } catch (error) {
                    alert = new AlertMessage(JSON.stringify(body), AlertMessage.ALERT_WARNING);
                }
            } else {
                alert = new AlertMessage(error.text(), AlertMessage.ALERT_WARNING);
            }
        } else {
            alert = new AlertMessage(error.toString(), AlertMessage.ALERT_WARNING);
        }
        return alert;
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
     * @param {(Response | any)} error          the response from the server
     * @returns {ErrorObservable<AlertMessage>} the error message as an observable
     * 
     * @memberOf ResponseHandler
     */
    protected handleError(error: Response | any) {
        let alert: AlertMessage = this.getError(error);
        this.messageService.next(alert);
        return Observable.throw(alert);
    }
}