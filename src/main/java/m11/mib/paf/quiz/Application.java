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

import m11.mib.paf.quiz.answer.AnswerRepository;
import m11.mib.paf.quiz.category.CategoryInitializer;
import m11.mib.paf.quiz.category.CategoryRepository;
import m11.mib.paf.quiz.question.QuestionInitializer;
import m11.mib.paf.quiz.question.QuestionRepository;
import m11.mib.paf.quiz.result.ResultInitializer;
import m11.mib.paf.quiz.result.ResultRepository;
import m11.mib.paf.quiz.user.UserInitializer;
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
	    	AnswerRepository answerRepository,
	    	CategoryRepository categoryRepository,
	    	QuestionRepository questionRepository,
	    	ResultRepository resultRepository,
	    	UserRepository userRepository
	   ) {
	return (args) -> {
	    // ~~~ Generate users for the quiz
	    UserInitializer userInitializer = new UserInitializer(userRepository);
	    userInitializer.initialize();
	    log.info(userRepository.count() + " users established");
	    
	    // ~~~ Generate a few standard categories (Trivial Pursuit)
	    CategoryInitializer categoryInitializer = new CategoryInitializer(categoryRepository);
	    categoryInitializer.initialize();
	    log.info(categoryRepository.count() + " categories established");

	    // ~~~ Generate a few questions
	    QuestionInitializer questionInitializer = new QuestionInitializer(answerRepository, categoryRepository, questionRepository, userRepository);
	    questionInitializer.initialize();
	    log.info(questionRepository.count() + " questions with " + answerRepository.count() + " answers established");

	    // ~~~ Generate a few results
	    ResultInitializer resultInitializer = new ResultInitializer(categoryRepository, resultRepository, userRepository);
	    resultInitializer.initialize();
	    log.info(resultRepository.count() + " results established");
	};
    }

}
