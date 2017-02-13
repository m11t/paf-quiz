package m11.mib.paf.quiz;

import org.springframework.http.HttpStatus;

/**
 * RestErrorResponse
 * Packages JAVA-Exceptions into a common structure for the Angular2-Frontend
 *
 * @author M11
 * @version 1.0
 */
public class RestErrorResponse {
    
    private final HttpStatus status;
    private final String message;

    /**
     * @param httpStatus of the Response
     * @param message of the Response
     */
    public RestErrorResponse(HttpStatus httpStatus, final String message) {
        this.status = httpStatus;
        this.message = message;
    }

    /**
     * @return the HTTP status code
     */
    public Integer getStatus() {
        return status.value();
    }
    
    /**
     * @return the reason for the response
     */
    public String getReason() {
	return status.getReasonPhrase();
    }

    /**
     * @return the message of the response
     */
    public String getMessage() {
        return message;
    }

}
