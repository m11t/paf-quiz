package m11.mib.paf.quiz.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import m11.mib.paf.quiz.RestErrorResponse;

/**
 * EntryPoint
 * REST-Entrypoint for Authentication exceptions
 *
 * @author M11
 * @version 1.0
 */
@Component
public class JWTEntryPoint implements AuthenticationEntryPoint {

    /**
     * Writes the RestErrorResponse to the response body
     * @see org.springframework.security.web.AuthenticationEntryPoint#commence(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.springframework.security.core.AuthenticationException)
     * 
     * @param request
     * @param response
     * @param excpetion to be passed to the frontend
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
	response.setStatus(HttpStatus.FORBIDDEN.value());
	response.setContentType(MediaType.APPLICATION_JSON_VALUE);
	
	String message = e.getMessage();
	if ( e.getCause() != null ) {
	    message = e.getCause().getMessage();
	}
	byte[] body = new ObjectMapper().writeValueAsBytes(new RestErrorResponse(HttpStatus.FORBIDDEN, message));
	response.getOutputStream().write(body);
    }

}
