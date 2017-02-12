package m11.mib.paf.quiz.result;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.user.User;

/**
 * ResultRepository
 * With an additional aggregate function by Categories and by User for statistics
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
