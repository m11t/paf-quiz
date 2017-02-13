package m11.mib.paf.quiz.category;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * CategoryRepository
 * Provides Crud-Methods for Category-Resources
 *
 * @author M11
 * @version 1.0
 */
public interface CategoryRepository extends PagingAndSortingRepository<Category, String> {

}
