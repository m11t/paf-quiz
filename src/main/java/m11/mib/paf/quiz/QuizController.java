package m11.mib.paf.quiz;

import java.io.IOException;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import m11.mib.paf.quiz.question.Question;
import m11.mib.paf.quiz.question.QuestionRepository;
import m11.mib.paf.quiz.question.QuestionResource;

/**
 * QuizController
 *
 * @author M11
 * @version 1.0
 */
@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired private QuestionRepository questionRepository;
    @Autowired private EntityLinks entityLinks;

    /**
     * REST-Endpoint for getting a random question from the server.
     * 
     * @return the resource of the complete question
     * @throws IOException 
     */
    @RequestMapping(path = "/quiz", method = RequestMethod.GET)
    public Resource<Question> getQuestion() throws IOException {
	long max = this.questionRepository.findFirstByOrderByIdDesc().getJsonId();
	long random;
	Question question;
	do {
	    random   = ThreadLocalRandom.current().nextLong(1, max + 1);
	    question = this.questionRepository.findOne(random);
	} while (question == null);

	QuestionResource questionResource = new QuestionResource(question);
	questionResource.add(this.entityLinks.linkToSingleResource(Question.class, question.getJsonId()));
	return questionResource;
    }
    
}
