package m11.mib.paf.quiz;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ErrorViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.category.CategoryRepository;
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

    /**
     * Redirect all unsupported requests to the angular app
     * @return 
     */
    @Bean
    ErrorViewResolver supportPathBasedLocationStrategyWithoutHashes() {
        return new ErrorViewResolver() {
            @Override
            public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, Object> model) {
                return status == HttpStatus.NOT_FOUND
                        ? new ModelAndView("index.html", Collections.<String, Object>emptyMap(), HttpStatus.OK)
                        : null;
            }
        };
    }    
    
    @Bean
    public CommandLineRunner demo(
	    	RepositoryRestConfiguration config,
	    	UserRepository userRepository,
	    	CategoryRepository categoryRepository
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
	    
	    // ~~~ Mehrere Standardkategorien (Trivial Pursuit)
	    categoryRepository.save(new Category("Erdkunde"));
	    categoryRepository.save(new Category("Unterhaltung"));
	    categoryRepository.save(new Category("Geschichte"));
	    categoryRepository.save(new Category("Kunst und Literatur"));
	    categoryRepository.save(new Category("Wissenschaft und Technik"));
	    categoryRepository.save(new Category("Sport und Vergnügen"));
	};
    }

}
