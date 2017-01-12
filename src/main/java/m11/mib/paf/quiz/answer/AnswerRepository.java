package m11.mib.paf.quiz.answer;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import m11.mib.paf.quiz.question.Question;

/**
 * MT \ 12.01.2017 \ AnswerRepository
 * 
 *
 * @author M11
 * @version 1.0
 */
public interface AnswerRepository extends CrudRepository<Answer, Long> {

    //List<Answer> findByQuestion(Question questionOfAnswer);
}
