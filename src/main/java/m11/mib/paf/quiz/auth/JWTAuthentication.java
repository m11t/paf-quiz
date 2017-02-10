package m11.mib.paf.quiz.auth;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import m11.mib.paf.quiz.user.User;

/**
 * MT \ 09.02.2017 \ AuthenticatedUser
 * Simple 
 *
 * @author M11
 * @version 1.0
 */
@SuppressWarnings("serial")
public class JWTAuthentication implements Authentication {

    private final User user;
    
    public JWTAuthentication(User user) {
	this.user = user;
    }
    
    /* (non-Javadoc)
     * @see java.security.Principal#getName()
     */
    @Override
    public String getName() {
	return user.getJsonId();
    }

    /* (non-Javadoc)
     * @see org.springframework.security.core.Authentication#getAuthorities()
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
	return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    /* (non-Javadoc)
     * @see org.springframework.security.core.Authentication#getCredentials()
     */
    @Override
    public Object getCredentials() {
	// TODO Auto-generated method stub
	return null;
    }

    /* (non-Javadoc)
     * @see org.springframework.security.core.Authentication#getDetails()
     */
    @Override
    public Object getDetails() {
	// TODO Auto-generated method stub
	return null;
    }

    /* (non-Javadoc)
     * @see org.springframework.security.core.Authentication#getPrincipal()
     */
    @Override
    public Object getPrincipal() {
	// TODO Auto-generated method stub
	return null;
    }

    /* (non-Javadoc)
     * @see org.springframework.security.core.Authentication#isAuthenticated()
     */
    @Override
    public boolean isAuthenticated() {
	return true;
    }

    /* (non-Javadoc)
     * @see org.springframework.security.core.Authentication#setAuthenticated(boolean)
     */
    @Override
    public void setAuthenticated(boolean authenticated) throws IllegalArgumentException {
    }

}
