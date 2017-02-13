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
 * AuthenticationFilter
 * Ensures authentication for the REST-API
 *
 * @author M11
 * @version 1.0
 */
public class JWTAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final AuthenticationFailureHandler failureHandler;
    
    /**
     * @param failureHandler
     * @param requestMatcher
     */
    public JWTAuthenticationFilter(AuthenticationFailureHandler failureHandler, RequestMatcher requestMatcher) {
	super(requestMatcher);
	this.failureHandler = failureHandler;
    }

    /**
     * Decode the JSON-Web-Token and pass it to the AuthenticationManager
     * @see org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter#attemptAuthentication(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     * 
     * @param request from the frontend
     * @param response to the frontend
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

    /**
     * Handle a successful authentication
     * 
     * @see org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter#successfulAuthentication(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, javax.servlet.FilterChain, org.springframework.security.core.Authentication)
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) 
	    throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }

    /**
     * Handle an unsuccessful authentication
     * 
     * @see org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter#unsuccessfulAuthentication(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.springframework.security.core.AuthenticationException)
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) 
	    throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        failureHandler.onAuthenticationFailure(request, response, failed);
    }
}
