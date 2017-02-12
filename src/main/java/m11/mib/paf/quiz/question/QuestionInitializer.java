package m11.mib.paf.quiz.question;

import java.util.ArrayList;
import java.util.List;

import m11.mib.paf.quiz.answer.Answer;
import m11.mib.paf.quiz.answer.AnswerRepository;
import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.category.CategoryInitializer;
import m11.mib.paf.quiz.category.CategoryRepository;
import m11.mib.paf.quiz.user.User;
import m11.mib.paf.quiz.user.UserRepository;

/**
 * QuestionInitializer
 * Startup databse filler for questions and their answers
 *
 * @author M11
 * @version 1.0
 */
public class QuestionInitializer {

    private final AnswerRepository answerRepository; // ~~~ CrudRepository of the answers, injected by Spring
    private final CategoryRepository categoryRepository; // ~~~ CrudRepository of the categories, injected by Spring
    private final QuestionRepository questionRepository; // ~~~ CrudRepository of the questions, injected by Spring
    private final UserRepository userRepository; // ~~~ CrudRepository of the users, injected by Spring

    public QuestionInitializer(
	    AnswerRepository answerRepository,
	    CategoryRepository categoryRepository,
	    QuestionRepository questionRepository,
	    UserRepository userRepository
	   ) {
	this.answerRepository = answerRepository;
	this.categoryRepository = categoryRepository;
	this.questionRepository = questionRepository;
	this.userRepository = userRepository;
    }
    
    private Question create(String categoryName, String text, User questioner) {
	String         categoryImage = CategoryInitializer.getImageFor(categoryName);
	Category       category      = categoryRepository.findOne(categoryName);
	List<Category> categoryList  = new ArrayList<Category>();
	categoryList.add(category);
	return questionRepository.save(new Question(categoryName, text, categoryImage, questioner, categoryList));
    }
    
    /**
     * Initialize the Questions in the database
     * There are a few questions per category posed by the moderator
     */
    public void initialize() {
	User moderator = userRepository.findOne("Moderator");
	
	Question one = create(CategoryInitializer.ENTERTAINMENT, "In dem Rathaus welcher Stadt wird seit 1545 ein Charity Dinner, das Schaffermahl, zugunsten armer Seeleute eingenommen?", moderator);
	answerRepository.save(new Answer(one, "Rostock", false));
	answerRepository.save(new Answer(one, "Bremen", true));
	answerRepository.save(new Answer(one, "Kiel", false));
	answerRepository.save(new Answer(one, "Hamburg", false));

	Question two = create(CategoryInitializer.GEOGRAPHY, "In welcher US-amerikanischen Stadt kann man im berühmt-romantischen Tunnel of Love eine Drive-thru-Hochzeit feiern?", moderator);
	answerRepository.save(new Answer(two, "Los Angeles", false));
	answerRepository.save(new Answer(two, "Las Vegas", true));
	answerRepository.save(new Answer(two, "Miami", false));
	answerRepository.save(new Answer(two, "San Francisco", false));
	
	Question three = create(CategoryInitializer.ART_AND_LITERATURE, "In welcher Konzerthalle Londons trat die berühmte Sängerin Lata Mangeshkar als erste Inderin auf?", moderator);
	answerRepository.save(new Answer(three, "Palladium", false));
	answerRepository.save(new Answer(three, "Sommerset House Trust", false));
	answerRepository.save(new Answer(three, "Royal Albert Hall", true));
	answerRepository.save(new Answer(three, "Victoria Theater", false));
    }
}
