package m11.mib.paf.quiz.auth;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
    public ResponseEntity<?> login(@RequestParam("user") String userId, @RequestParam("password") String password) {
	User user = this.userRepository.findOne(userId);

	// ~~~ Login failed due to wrong user id
	if ( user == null ) {
	    throw new NoSuchUserCredentialsException();
	}
	// ~~~ Login failed due to wrong password
	if ( !user.logIn(password) ) {
	    throw new NoSuchUserCredentialsException();
	}

	// ~~~ Enhance resource with additional links
	//user.add( new Link("/api/users/{id}").expand(user.getJsonId()).withSelfRel() );
	return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/auth/signup")
    public ResponseEntity<?> signup(@RequestParam("user") String userId, @RequestParam("password") String password) {

	// ~~~ Signup failed to duplicate user id
	if ( this.userRepository.exists(userId) ) {
	    throw new UserAlreadyExistsException();
	}
	
	// ~~~ Create new user and save it in the database
	User user = new User(userId, password);
	this.userRepository.save(user);
	
	// ~~~ Directly log the user into the application
	user.logIn(password);
	//user.add( new Link("/api/users/{id}").expand(user.getJsonId()).withSelfRel() );
	return ResponseEntity.ok(user);
    }

}
