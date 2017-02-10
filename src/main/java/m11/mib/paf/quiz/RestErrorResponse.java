package m11.mib.paf.quiz;

import org.springframework.http.HttpStatus;

/**
 * MT \ 10.02.2017 \ RestErrorResponse
 * 
 *
 * @author M11
 * @version 1.0
 */
public class RestErrorResponse {
    
    private final HttpStatus status;
    private final String message;

    public RestErrorResponse(HttpStatus status, final String message) {
        this.status = status;
        this.message = message;
    }

    public Integer getStatus() {
        return status.value();
    }
    
    public String getReason() {
	return status.getReasonPhrase();
    }

    public String getMessage() {
        return message;
    }

}
