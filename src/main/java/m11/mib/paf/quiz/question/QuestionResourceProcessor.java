package m11.mib.paf.quiz.question;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;

/**
 * QuestionResourceProcessor
 * Expand the Question-Resource by the link to the image-endpoint
 *
 * @author M11
 * @version 1.0
 */
@Component
public class QuestionResourceProcessor implements ResourceProcessor<Resource<Question>> {

    /**
     * Add the self link to a QuestionResource (for QuizController)
     * @see org.springframework.hateoas.ResourceProcessor#process(org.springframework.hateoas.ResourceSupport)
     */
    @Override
    public Resource<Question> process(Resource<Question> questionResource) {
        UriComponents uriComponents = ServletUriComponentsBuilder.fromCurrentContextPath()
                			.path("/api/questions/{id}/image")
                			.buildAndExpand(Long.toString(questionResource.getContent().getJsonId()));
        questionResource.add(new Link(uriComponents.toUriString(), "image"));
        return questionResource;
    }

}
