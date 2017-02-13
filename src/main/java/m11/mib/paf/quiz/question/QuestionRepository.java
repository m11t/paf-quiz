package m11.mib.paf.quiz.question;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * QuestionRepository
 * Provides Crud-Methods for Category-Resources plus:
 *   - the possibility to find the question with the highest id (for QuizController)
 *
 * @author M11
 * @version 1.0
 */
public interface QuestionRepository extends PagingAndSortingRepository<Question, Long> {

    Question findFirstByOrderByIdDesc();
}
