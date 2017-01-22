package m11.mib.paf.quiz;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.exceptions.JWTCreationException;

import m11.mib.paf.quiz.auth.JWTAuthenticationToken;
import m11.mib.paf.quiz.user.User;
import m11.mib.paf.quiz.user.UserRepository;

/**
 * MT \ 22.01.2017 \ AuthenticationController
 * 
 *
 * @author M11
 * @version 1.0
 */
@RestController
public class AuthenticationController {

    private UserRepository userRepository;
    
    /**
     * @param userRepository 
     */
    @Autowired
    public AuthenticationController(UserRepository userRepository) {
	this.userRepository = userRepository;
    }
    
    /**
     * REST-Endpoint for logging into the quiz.
     * Takes the user credentials and tries to verify, that the user exists and the password is correct.
     * At the end a JSON-Web-Token is generated with the users legitimate claim and then served as response.
     * 
     * @param userId
     * @param password
     * @return the JSON-Web-Token packed into a JSON
     */
    @RequestMapping(value = "/api/auth/login")
    public HttpEntity<JWTAuthenticationToken> login(@RequestParam("user") String userId, @RequestParam("password") String password) {
	User                   user      = this.userRepository.findOne(userId);
	JWTAuthenticationToken userToken;

	// ~~~ Login ist fehlgeschlagen aufgrund eines falschen Passworts
	if ( !user.logIn(password) ) {
	    return new ResponseEntity<JWTAuthenticationToken>(HttpStatus.UNAUTHORIZED);
	}

	// ~~~ Versuchen den JWT-Token erstellen zu lassen
	try {
	    userToken = new JWTAuthenticationToken(userId, password);
	} catch (IllegalArgumentException | JWTCreationException | UnsupportedEncodingException e) {
	    e.printStackTrace();
	    return new ResponseEntity<JWTAuthenticationToken>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	return new ResponseEntity<JWTAuthenticationToken>(userToken, HttpStatus.OK);
    }
}
