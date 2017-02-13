package m11.mib.paf.quiz.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;

import m11.mib.paf.quiz.user.User;
import m11.mib.paf.quiz.user.UserRepository;

/**
 * JWTAuthenticationProvider
 * Custom implementation to authenticate with a JSON-Web-Token
 *
 * @author M11
 * @version 1.0
 */
@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    /**
     * Verify the JSON-Web-Token and  authenticate the User
     * @see org.springframework.security.authentication.AuthenticationProvider#authenticate(org.springframework.security.core.Authentication)
     * 
     * @param authentication to be verified
     * @return the authenticated user
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
	JWT jwt = (JWT) authentication.getCredentials();
	User user = userRepository.findOne(jwt.getSubject());
	if ( !user.verify(jwt.getToken()) ) {
	    throw new FailedJWTAuthenticationException();
	}
	return new JWTAuthentication(user);
    }

    /**
     * Check whether this Class can authenticate a certain Authentication object
     * @see org.springframework.security.authentication.AuthenticationProvider#supports(java.lang.Class)
     * 
     * @param authentication to be checked
     * @return whehter the authentication object is a JSON-Web-Token
     */
    @Override
    public boolean supports(Class<?> authentication) {
	return JWTAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
