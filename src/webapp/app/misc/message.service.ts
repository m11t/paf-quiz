import { Injectable } from '@angular/core';
import { RestErrorResponse, IRestErrorResponse, AlertMessage } from './rest-error-response';

/**
 * Class to provide a universal error and messaging service
 * 
 * @export
 * @class MessageService
 */
@Injectable()
export class MessageService {

    message: AlertMessage;

    constructor() {
        this.message = null;
    }

    /**
     * Set the next message 
     * 
     * @param {AlertMessage} message
     * 
     * @memberOf MessageService
     */
    public next(message: AlertMessage) {
        this.message = message;
    }

    /**
     * Set the next message as an info message
     * 
     * @param {string} message
     * 
     * @memberOf MessageService
     */
    public nextInfo(message: string) {
        this.message = new AlertMessage(message, AlertMessage.ALERT_INFO);
    }

    /**
     * Set the next message as a success message
     * 
     * @param {string} message
     * 
     * @memberOf MessageService
     */
    public nextSuccess(message: string) {
        this.message = new AlertMessage(message, AlertMessage.ALERT_SUCCESS);
    }

    /**
     * Set the next message as a warning message
     * 
     * @param {string} message
     * 
     * @memberOf MessageService
     */
    public nextWarning(message: string) {
        this.message = new AlertMessage(message, AlertMessage.ALERT_WARNING);
    }

    /**
     * Set the next messsage as a danger message
     * 
     * @param {string} message
     * 
     * @memberOf MessageService
     */
    public nextError(message: string) {
        this.message = new AlertMessage(message, AlertMessage.ALERT_DANGER);
    }

    /**
     * Clear the message service
     * 
     * @memberOf MessageService
     */
    public clear() {
        this.message = null;
    }
}