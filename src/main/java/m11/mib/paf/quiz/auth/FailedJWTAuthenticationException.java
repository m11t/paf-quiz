package m11.mib.paf.quiz.auth;

import org.springframework.security.core.AuthenticationException;

/**
 * MT \ 09.02.2017 \ FailedJWTAuthenticationException
 * 
 *
 * @author M11
 * @version 1.0
 */
@SuppressWarnings("serial")
public class FailedJWTAuthenticationException extends AuthenticationException {
    
    public FailedJWTAuthenticationException() {
	super("The provided token could not be verified and as a result your user could not be authorized. Please try again or contact support if the error persists.");
    }
}
