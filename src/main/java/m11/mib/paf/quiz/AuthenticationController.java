package m11.mib.paf.quiz;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

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
    public HttpEntity<User> login(@RequestParam("user") String userId, @RequestParam("password") String password) {
	User user = this.userRepository.findOne(userId);

	// ~~~ Login failed due to wrong password
	if ( !user.logIn(password) ) {
	    return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
	}

	// ~~~ Try to create a JWT-Token
	try {
	    user.token = JWT.create()
			.withIssuer("paf-quiz")
			.withSubject(userId)
			.sign(Algorithm.HMAC256(password));
	} catch (IllegalArgumentException | JWTCreationException | UnsupportedEncodingException e) {
	    e.printStackTrace();
	    return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// ~~~ Enhance resource with additional links
	user.add(linkTo(methodOn(UserRepository.class).findOne(userId)).withSelfRel());
	return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}
