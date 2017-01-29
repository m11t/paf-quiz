package m11.mib.paf.quiz.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    private final UserRepository userRepository;
    private final RepositoryEntityLinks entityLinks;
    
    /**
     * @param userRepository 
     */
    @Autowired
    public AuthenticationController(UserRepository userRepository, RepositoryEntityLinks entityLinks) {
	this.userRepository = userRepository;
	this.entityLinks    = entityLinks;
    }
    
    /**
     * REST-Endpoint for logging into the quiz.
     * Takes the user credentials and tries to verify, that the user exists and the password is correct.
     * At the end a JSON-Web-Token is generated with the users legitimate claim and then served as response.
     * 
     * @param userId
     * @param password
     * @return the User with its valid claim as a JSON-Web-Token
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

	// ~~~ Add additional links
	user.add(this.entityLinks.linkToSingleResource(User.class, user.getJsonId()).withSelfRel());
	return ResponseEntity.ok(user);
    }
    
    /**
     * REST-Endpoint for signing up to the quiz.
     * Takes the user credentials and tries to create a new user in the database.
     * At the end the user is directly logged into the system and returned with the users legitimate claim.
     * 
     * @param userId
     * @param password
     * @return the User with its valid claim as a JSON-Web-Token
     */
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

	// ~~~ Build a User resource and add additional links
	user.add(this.entityLinks.linkToSingleResource(User.class, user.getJsonId()).withSelfRel());
	return ResponseEntity.ok(user);
    }

}
