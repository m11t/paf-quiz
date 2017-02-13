package m11.mib.paf.quiz.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * UserAlreadyExistsException
 * Exception for when somebody tries to signup with an existing user id
 *
 * @author M11
 * @version 1.0
 */
@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException() {
	super("A user with this id already exists in the application.");
    }
}
