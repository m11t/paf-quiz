package m11.mib.paf.quiz.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.RequestMatcher;

import com.auth0.jwt.JWT;

import m11.mib.paf.quiz.WebSecurityConfig;

/**
 * MT \ 09.02.2017 \ AuthenticationFilter
 * 
 *
 * @author M11
 * @version 1.0
 */
public class JWTAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final AuthenticationFailureHandler failureHandler;
    
    public JWTAuthenticationFilter(AuthenticationFailureHandler failureHandler, RequestMatcher requestMatcher) {
	super(requestMatcher);
	this.failureHandler = failureHandler;
    }

    /* (non-Javadoc)
     * @see org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter#attemptAuthentication(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
	    throws AuthenticationException, IOException, ServletException {
	
	// ~~~ Token aus dem Header extrahieren
	String token;
	try {
	    token = request.getHeader(WebSecurityConfig.JWT_TOKEN_HEADER);
	    token = token.substring(WebSecurityConfig.JWT_TOKEN_PREFIX.length());
	} catch (Exception e) {
	    throw new FailedJWTAuthenticationException();
	}
	
	// ~~~ Token als Authentication verpackt weiterleiten
	return getAuthenticationManager().authenticate(new JWTAuthenticationToken(JWT.decode(token)));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) 
	    throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) 
	    throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        failureHandler.onAuthenticationFailure(request, response, failed);
    }
}
