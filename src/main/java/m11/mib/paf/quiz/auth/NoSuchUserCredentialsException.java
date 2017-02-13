package m11.mib.paf.quiz.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * NoSuchUserCredentialsException
 * Exception when a user could not be logged into the application
 *
 * @author M11
 * @version 1.0
 */
@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoSuchUserCredentialsException extends RuntimeException {

    public NoSuchUserCredentialsException() {
	super("There is no user with the provided credentials.");
    }
}
