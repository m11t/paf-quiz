package m11.mib.paf.quiz.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * MT \ 28.01.2017 \ FailedJWTCreationException
 * 
 *
 * @author M11
 * @version 1.0
 */
@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class FailedJWTCreationException extends RuntimeException {

    public FailedJWTCreationException() {
	super("Your user could not be authenticated. Please try again or contact support if the error persists.");
    }
}
