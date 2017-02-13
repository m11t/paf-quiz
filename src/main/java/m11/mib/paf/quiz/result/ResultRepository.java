package m11.mib.paf.quiz.result;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.user.User;

/**
 * ResultRepository
 * Provides Crud-Methods for Category-Resources plus:
 *   - additional aggregate functions for statistics by Categories, User, correct
 *
 * @author M11
 * @version 1.0
 */
public interface ResultRepository extends PagingAndSortingRepository<Result, Long> {

    long count();
    long countByUserOfResult(@Param(value = "user") User user);
    long countByUserOfResultAndCorrectTrue(@Param(value = "user") User user);
    long countByCategoriesOfResult(@Param(value = "categories") Category categories);
    long countByCategoriesOfResultAndCorrectTrue(@Param(value = "categories") Category categories);
    long countByUserOfResultAndCategoriesOfResult(@Param(value = "user") User user, @Param(value = "categories") Category categories);
    long countByUserOfResultAndCategoriesOfResultAndCorrectTrue(@Param(value = "user") User user, @Param(value = "categories") Category categories);
}
