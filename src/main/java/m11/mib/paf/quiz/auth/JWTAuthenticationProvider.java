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
 * MT \ 09.02.2017 \ JWTAuthenticationProvider
 * 
 *
 * @author M11
 * @version 1.0
 */
@Component
public class JWTAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    /* (non-Javadoc)
     * @see org.springframework.security.authentication.AuthenticationProvider#authenticate(org.springframework.security.core.Authentication)
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

    /* (non-Javadoc)
     * @see org.springframework.security.authentication.AuthenticationProvider#supports(java.lang.Class)
     */
    @Override
    public boolean supports(Class<?> authentication) {
	return JWTAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
