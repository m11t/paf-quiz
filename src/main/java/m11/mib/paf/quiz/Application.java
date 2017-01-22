package m11.mib.paf.quiz;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import m11.mib.paf.quiz.user.User;
import m11.mib.paf.quiz.user.UserRepository;

/**
 * MT \ 12.01.2017 \ Application
 * 
 *
 * @author M11
 * @version 1.0
 */
@SpringBootApplication
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);
    
    /**
     * @param args
     */
    public static void main(String[] args) {
	SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public CommandLineRunner demo(
	    	RepositoryRestConfiguration config,
	    	UserRepository userRepository
	   ) {
	return (args) -> {

	    // ~~~ Generate a couple of users
	    userRepository.save(new User("M11" , "M11s-Passwort"));
	    userRepository.save(new User("Lia" , "Lias-Passwort"));
	    userRepository.save(new User("Gast", "Gast"));
	    
	    // ~~~ Logging der angelegten Benutzer
	    for (User user : userRepository.findAll()) {
		log.info(user.toString());
	    }
	};
    }

}
