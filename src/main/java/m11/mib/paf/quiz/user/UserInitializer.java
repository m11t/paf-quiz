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
     * 	Player - Has answered a few questions
     */
    public void initialize() {
    	userRepository.save(new User("Moderator", "Moderator"));
    	userRepository.save(new User("Player", "Player"));
    	userRepository.save(new User("Hater", "Hater"));
    }
}
