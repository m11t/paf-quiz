/**
 * Interface describing an error/message response from the REST-API
 * 
 * @export
 * @interface IRestErrorResponse
 */
export interface IRestErrorResponse {
    status  : number;
    reason  : string;
    message : string;
}

/**
 * General class for alert messages in the frontend
 * 
 * @export
 * @class AlertMessage
 */
export class AlertMessage {
    static readonly ALERT_INFO   : string = "alert-info";
    static readonly ALERT_SUCCESS: string = "alert-success";
    static readonly ALERT_WARNING: string = "alert-warning";
    static readonly ALERT_DANGER : string = "alert-danger";

    public title     : string;
    public message   : string;
    public alertClass: string;
    
    constructor(message: string, alertClass: string) {
        this.title      = "";
        this.message    = message;
        this.alertClass = alertClass;
    }
    
    public toString(): string {
        return this.message;
    }
}

/**
 * The class for working with an error/message response from the REST-API
 * 
 * @export
 * @class RestErrorResponse
 * @extends {AlertMessage}
 * @implements {IRestErrorResponse}
 */
export class RestErrorResponse extends AlertMessage implements IRestErrorResponse {

    public status : number;
    public reason : string;

    constructor(error: IRestErrorResponse) {
        super(error.message, AlertMessage.ALERT_INFO);
        this.status     = error.status;
        this.reason     = error.reason;
        this.title      = this.status + " - " + this.reason;
        this.alertClass = this.getAlertClass();
    }

    private getAlertClass(): string {
        if ( this.status < 200 ) {
            return AlertMessage.ALERT_INFO;
        } else if ( this.status < 400 ) {
            return AlertMessage.ALERT_SUCCESS;
        } else if ( this.status < 500 ) {
            return AlertMessage.ALERT_WARNING;
        }
        return AlertMessage.ALERT_DANGER;
    }

}