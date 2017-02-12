package m11.mib.paf.quiz.question;

import org.springframework.hateoas.Resource;

/**
 * QuestionResource
 *
 * @author M11
 * @version 1.0
 */
public class QuestionResource extends Resource<Question>  {

    public QuestionResource(Question question) {
	super(question);
    }

}
