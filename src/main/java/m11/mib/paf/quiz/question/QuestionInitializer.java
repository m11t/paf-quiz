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
    
    private void create(User questioner, String categoryName, String text, Answer... answers) {
	String         categoryImage = CategoryInitializer.getImageFor(categoryName);
	Category       category      = categoryRepository.findOne(categoryName);
	List<Category> categoryList  = new ArrayList<Category>();
	categoryList.add(category);
	
	Question question = questionRepository.save(new Question(categoryName, text, categoryImage, questioner, categoryList)); 
	for (int i = 0; i < answers.length; i++) {
	    answers[i].setQuestionOfAnswer(question);
	    answerRepository.save(answers[i]);
	}
    }
    
    /**
     * Initialize the Questions in the database
     * There are a few questions per category posed by the moderator as well as a few by the pro
     */
    public void initialize() {
	User moderator = userRepository.findOne("Moderator");
	User pro       = userRepository.findOne("Pro");
	
	// ~~~ History questions by the moderator
	create(moderator, CategoryInitializer.HISTORY, 
		"Die griechische Völkerwanderung auch „Dorische Wanderung“ genannt, ausgelöst durch den Vorstoß der Illyrer zum Mittelmeer. Wann fand sie statt?", 
		new Answer("1200 bis 1000 v. Chr.", true), 
		new Answer("1000 bis 500 v. Chr.", false), 
		new Answer("500 bis 1100 n. Chr.", false));
	create(moderator, CategoryInitializer.HISTORY, 
		"Was ist das sogenannte Prinzipat?", 
		new Answer("Es kombiniert anarchische und republikanische Elemente", false), 
		new Answer("Es stellt ein Ausgleich zwischen monarchischen und republikanischen Elementen dar", true), 
		new Answer("Die Machtbefugnisse werden dem Volk übertragen", false));
	create(moderator, CategoryInitializer.HISTORY, 
		"In welchen Jahren lebte Karl der Große, der die Sachsenkriege führte?", 
		new Answer("782-843", false), 
		new Answer("650-712", false), 
		new Answer("768-814", true));

	// ~~~ Science questions by the moderator
	create(moderator, CategoryInitializer.SCIENCE_AND_NATURE, 
		"Wann tritt die Lorenz-Kraft auf?", 
		new Answer("Wenn sich ein elektrischer Ladungsträger durch ein Magnetfeld bewegt", true), 
		new Answer("Sie entsteht in einem mechanischen Drehmoment", false), 
		new Answer("Wenn sich ein montierter stromdurchflossener Leiter im Magnetfeld befindet und sich ein elektrisches Querfeld bildet", false));
	create(moderator, CategoryInitializer.SCIENCE_AND_NATURE, 
		"Wer hat die Bezeichnung + und - für plus und minus, die heute bei kleinen Trockenbatterien verwendet wird, eingeführt?", 
		new Answer("Isaac Newton", false), 
		new Answer("Georg Christoph Lichtenberg", true), 
		new Answer("Wilhelm Heinrich Friedrich Ferdinand Christian von Humboldt", false));
	create(moderator, CategoryInitializer.SCIENCE_AND_NATURE, 
		"Wie unterscheidet sich die rein elektrische von der herkömmlichen Beschleunigung mit Benzinmotor bei dem aktuellen hybrid Sportwagen BMW i8?", 
		new Answer("Die elektrische Beschleunigung ist genauso wie die mit dem Benzinmotor", false), 
		new Answer("Die elektrische Beschleunigung ist schneller", false), 
		new Answer("Die Beschleunigung mit dem Benzinmotor ist schneller", true));
	
	// ~~~ Sport questions by the moderator
	create(moderator, CategoryInitializer.SPORT_AND_LEISURE, 
		"Wo befindet sich der Schollenmuskel auch soleus genannt?", 
		new Answer("Im Oberarm", false), 
		new Answer("In der Wade", true), 
		new Answer("Im Oberschenkel", false));
	create(moderator, CategoryInitializer.SPORT_AND_LEISURE, 
		"Die Olympischen Sommerspiele 2020 werden in welcher Stadt stattfinden?", 
		new Answer("Peking", false), 
		new Answer("Seoul", false), 
		new Answer("Tokio", true));
	create(moderator, CategoryInitializer.SPORT_AND_LEISURE, 
		"Welches Handballteam wurde 2014 Champions-League-Sieger?", 
		new Answer("SG Flensburg-Handewitt", true), 
		new Answer("SK Aarhus", false), 
		new Answer("THW-Kiel", false));

	// ~~~ Geography questions by the moderator
	create(moderator, CategoryInitializer.GEOGRAPHY, 
		"Welches der genannten Länder hat die meisten Einwohner?", 
		new Answer("Japan", false), 
		new Answer("Tansania", false), 
		new Answer("Russland", true));
	create(moderator, CategoryInitializer.GEOGRAPHY, 
		"In welches Gewässer mündet die Donau?", 
		new Answer("Ins Kaspische Meer", false), 
		new Answer("Ins Schwarze Meer", true), 
		new Answer("Ins Adriatische Meer", false));
	create(moderator, CategoryInitializer.GEOGRAPHY, 
		"Was bezeichnet der Hawaiianische Ausdruck: „Humuhumu nukunuku apua'a“ ", 
		new Answer("Eine Begrüßungs-Redewendung der Einheimischen", false), 
		new Answer("Einen hawaiianischen Tanz, basierend auf dem Hula", false), 
		new Answer("Einen Diamant-Picassodrückerfisch, welcher in den Riffterrassen wohnt", true));

	// ~~~ Art questions by the moderator
	create(moderator, CategoryInitializer.ART_AND_LITERATURE, 
		"Von welchem Künstler wurde im Jahr 1909 das bekannte Bild „Der Kuss“ gemalt?", 
		new Answer("Edvard Munch", false), 
		new Answer("Emil Nolde", false), 
		new Answer("Gustav Klimt", true));
	create(moderator, CategoryInitializer.ART_AND_LITERATURE, 
		"Wann entstand die Kunstrichtung des Expressionismus?", 
		new Answer("Um 1800", false), 
		new Answer("Um 1910", true), 
		new Answer("Um 1710", false));
	create(moderator, CategoryInitializer.ART_AND_LITERATURE, 
		"Wann erschien das erste Harry Potter Buch?", 
		new Answer("1999", false), 
		new Answer("1997", true), 
		new Answer("1996", false));

	// ~~~ Entertainment questions by the moderator
	create(moderator, CategoryInitializer.ENTERTAINMENT, 
		"Wie viele Kinder haben Brad Pitt und Angelina Jolie?", 
		new Answer("6", true), 
		new Answer("8", false), 
		new Answer("4", false));
	create(moderator, CategoryInitializer.ENTERTAINMENT, 
		"Was war die erste Single der Beatles?", 
		new Answer("Love Me Do", true), 
		new Answer("I Want to Hold Your Hand", false), 
		new Answer("Yesterday", false));
	create(moderator, CategoryInitializer.ENTERTAINMENT, 
		"Woran erinnern die Tanzelemente, welche in dem Musikvideo von PSY zu dem Milliardenhit „Gangnam Style“ zu sehen sind?", 
		new Answer("Putzen", false), 
		new Answer("Reiten", true), 
		new Answer("Surfen", false));

	// ~~~ Questions by the pro
	create(pro, CategoryInitializer.GEOGRAPHY, 
		"In welcher US-amerikanischen Stadt kann man im berühmt-romantischen Tunnel of Love eine Drive-thru-Hochzeit feiern?", 
		new Answer("Los Angeles", false), 
		new Answer("Las Vegas", true), 
		new Answer("Miami", false), 
		new Answer("San Francisco", false));
	create(pro, CategoryInitializer.ENTERTAINMENT, 
		"In dem Rathaus welcher Stadt wird seit 1545 ein Charity Dinner, das Schaffermahl, zugunsten armer Seeleute eingenommen?", 
		new Answer("Rostock", false), 
		new Answer("Bremen", true), 
		new Answer("Kiel", false), 
		new Answer("Hamburg", false));
	create(pro, CategoryInitializer.ART_AND_LITERATURE, 
		"In welcher Konzerthalle Londons trat die berühmte Sängerin Lata Mangeshkar als erste Inderin auf?", 
		new Answer("Palladium", false), 
		new Answer("Sommerset House Trust", false), 
		new Answer("Royal Albert Hall", true), 
		new Answer("Victoria Theater", false));
    }
}
