import { Injectable } from '@angular/core';

/**
 * Class to provide a universal error and messaging service
 * 
 * @export
 * @class MessageService
 */
@Injectable()
export class MessageService {

    message: string;

    constructor() {
        this.message = "";
    }

    /**
     * Set the next message 
     * 
     * @param {string} message
     * 
     * @memberOf MessageService
     */
    public next(message: string) {
        this.message = message;
    }
}