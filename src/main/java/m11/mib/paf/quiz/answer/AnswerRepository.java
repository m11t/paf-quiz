package m11.mib.paf.quiz.answer;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * AnswerRepository
 * Provides Crud-Methods for Answer-Resources
 *
 * @author M11
 * @version 1.0
 */
public interface AnswerRepository extends PagingAndSortingRepository<Answer, Long> {

}
