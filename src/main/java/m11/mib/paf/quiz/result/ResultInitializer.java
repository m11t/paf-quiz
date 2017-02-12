package m11.mib.paf.quiz.result;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import m11.mib.paf.quiz.Application;
import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.category.CategoryRepository;
import m11.mib.paf.quiz.user.User;
import m11.mib.paf.quiz.user.UserRepository;

/**
 * ResultInitializer
 * Startup databse filler for results
 *
 * @author M11
 * @version 1.0
 */
public class ResultInitializer {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    private final CategoryRepository categoryRepository; // ~~~ CrudRepository of the categories, injected by Spring
    private final ResultRepository resultRepository; // ~~~ CrudRepository of the results, injected by Spring
    private final UserRepository userRepository; // ~~~ CrudRepository of the users, injected by Spring

    public ResultInitializer(
	    CategoryRepository categoryRepository,
	    ResultRepository resultrepository,
	    UserRepository userRepository
	   ) {
	this.categoryRepository = categoryRepository;
	this.resultRepository = resultrepository;
	this.userRepository = userRepository;
    }

    /**
     * @param user to create results for
     * @param category of the created results
     */
    private void createResultsFor(User user, Category category) {
	List<Category> categoryList = new ArrayList<Category>();
	categoryList.add(category);
	
	int random = ThreadLocalRandom.current().nextInt(0, 10);
	for (int i = 0; i < 10; i++) {
	    if ( i < random ) {
		this.resultRepository.save(new Result(user, categoryList, true));
	    } else {
		this.resultRepository.save(new Result(user, categoryList, false));
	    }
	}
	log.info(this.resultRepository.countByCategoriesOfResult(category) + " total results for " + category.getJsonName());
	log.info(this.resultRepository.countByCategoriesOfResultAndCorrectTrue(category) + " correct results for " + category.getJsonName());
	log.info(this.resultRepository.countByUserOfResultAndCategoriesOfResult(user, category) + " total results of " + user.getJsonId() + " for " + category.getJsonName());
	log.info(this.resultRepository.countByUserOfResultAndCategoriesOfResultAndCorrectTrue(user, category) + " correct results of " + user.getJsonId() + " for " + category.getJsonName());
    }
    
    /**
     * Initialize various results for different users in the database
     * Each of these users gets 10 results per Category to support a simple statistical output. 
     */
    public void initialize() {
	Iterable<Category> categories = this.categoryRepository.findAll();
	
	User player = this.userRepository.findOne("Player");
	User hater  = this.userRepository.findOne("Hater");
	
	for (Category category : categories) {
	    this.createResultsFor(player, category);
	    this.createResultsFor(hater, category);
	}
    }

}
