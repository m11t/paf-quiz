package m11.mib.paf.quiz.question;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import m11.mib.paf.quiz.category.CategoryImageProvider;

/**
 * QuestionSpecialController
 * Provides a REST-Endpoint for uploading an image
 *
 * @author M11
 * @version 1.0
 */
@RestController
@RequestMapping("/api/questions")
public class QuestionSpecialController {

    @Autowired private QuestionRepository questionRepository;
    @Autowired private PagedResourcesAssembler<Question> pagedResourcesAssembler;
    
    /**
     * REST-Endpoint for adding an image to a question.
     * Takes the question id and a multi-part file and tries to save it in the database under the questions id.
     * 
     * @param id of the question
     * @param image to save
     * @return the resource of the complete question
     * @throws IOException 
     */
    @RequestMapping(path = "/{id}/image", method = RequestMethod.POST)
    public PagedResources<Resource<Question>> setImage(	@PathVariable("id") Long id,
	    						@RequestParam(required = false) MultipartFile image) throws IOException {
	Question question = questionRepository.findOne(id);
	String dataUrl = new CategoryImageProvider().getImageFor(question.getCategoriesOfQuestion().get(0).getJsonName());
	if ( image != null ) {
	    dataUrl = "data:" + image.getContentType() + ";base64," + Base64Utils.encodeToString(image.getBytes());
	}
	question.setImage(dataUrl);
	questionRepository.save(question);
	
	List<Question> questionList = new ArrayList<Question>();
	questionList.add(question);
	
	Page<Question> questionPage = new PageImpl<Question>(questionList);
	return pagedResourcesAssembler.toResource(questionPage);
    }
}
