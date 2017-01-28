package m11.mib.paf.quiz.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * MT \ 28.01.2017 \ NoSuchUserCredentialsException
 * 
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
