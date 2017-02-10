package m11.mib.paf.quiz.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import m11.mib.paf.quiz.RestErrorResponse;

/**
 * MT \ 10.02.2017 \ JWTAuthenticationFailureHandler
 * 
 *
 * @author M11
 * @version 1.0
 */
@Component
public class JWTAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private final ObjectMapper mapper;
    
    /**
     * @param mapper for the JSON
     */
    @Autowired
    public JWTAuthenticationFailureHandler(ObjectMapper mapper) {
        this.mapper = mapper;
    }	
    
    /* (non-Javadoc)
     * @see org.springframework.security.web.authentication.AuthenticationFailureHandler#onAuthenticationFailure(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.springframework.security.core.AuthenticationException)
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
	response.setStatus(HttpStatus.UNAUTHORIZED.value());
	response.setContentType(MediaType.APPLICATION_JSON_VALUE);
	
	mapper.writeValue(response.getWriter(), new RestErrorResponse(HttpStatus.UNAUTHORIZED, e.getMessage()));
    }
}
