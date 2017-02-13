package m11.mib.paf.quiz.user;

/**
 * UserInitializer
 * Startup databse filler for users
 *
 * @author M11
 * @version 1.0
 */
public class UserInitializer {

    private final UserRepository userRepository; // ~~~ CrudRepository of the users, injected by Spring
    
    public UserInitializer(UserRepository userRepository) {
	this.userRepository = userRepository;
    }
    
    /**
     * Initialize the Users in the database
     * There are two standard users:
     * 	Moderator - Has asked a mutlitude of questions
     * 	Rookie - Has some results
     *  Pro - Has some mor results
     */
    public void initialize() {
    	userRepository.save(new User("Moderator", "Moderator"));
    	userRepository.save(new User("Rookie", "Rookie"));
    	userRepository.save(new User("Pro", "Pro"));
    }
}
