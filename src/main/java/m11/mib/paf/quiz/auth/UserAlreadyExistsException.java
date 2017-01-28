package m11.mib.paf.quiz.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * MT \ 28.01.2017 \ UserAlreadyExistsException
 * 
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
