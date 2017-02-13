package m11.mib.paf.quiz.auth;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.auth0.jwt.JWT;

/**
 * JWTAuthenticationToken
 * Simple Authentication implementation for JWT verfication purposes.
 *
 * @author M11
 * @version 1.0
 */
@SuppressWarnings("serial")
public class JWTAuthenticationToken implements Authentication {

    private final JWT token;
    
    /**
     * @param token for authentication
     */
    public JWTAuthenticationToken(JWT token) {
	super();
	this.token = token;
    }

    @Override
    public String getName() {
	return null;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
	return null;
    }
    @Override
    public Object getCredentials() {
	return this.token;
    }
    @Override
    public Object getDetails() {
	return null;
    }
    @Override
    public Object getPrincipal() {
	return null;
    }
    @Override
    public boolean isAuthenticated() {
	return false;
    }
    @Override
    public void setAuthenticated(boolean authenticated) throws IllegalArgumentException {
    }

}
