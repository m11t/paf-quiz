package m11.mib.paf.quiz.user;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * UserRepository
 * Provides Crud-Methods for User-Resources
 *
 * @author M11
 * @version 1.0
 */
public interface UserRepository extends PagingAndSortingRepository<User, String> {

}
