package m11.mib.paf.quiz.result;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.user.User;

/**
 * MT \ 12.01.2017 \ Result
 * 
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Boolean correct;
    
    @ManyToOne
    @JoinColumn(name = "user")
    private User userOfResult;
    
    @ManyToMany
    @JoinTable(
	name               = "result_categories",
	joinColumns        = @JoinColumn(name = "result"),
	inverseJoinColumns = @JoinColumn(name = "category")
    )
    private List<Category> categoriesOfResult;
    
    public Result() {}

    /**
     * @return Whether the result is correct
     */
    public boolean isCorrect() {
	return correct;
    }

    /**
     * @param isCorrect Whether the result was correct
     */
    public void setCorrect(boolean isCorrect) {
	this.correct = isCorrect;
    }

    /**
     * @return the userOfResult
     */
    public User getUserOfResult() {
        return userOfResult;
    }

    /**
     * @param userOfResult the userOfResult to set
     */
    public void setUserOfResult(User userOfResult) {
        this.userOfResult = userOfResult;
    }

    /**
     * @return the categoriesOfResult
     */
    public List<Category> getCategoriesOfResult() {
        return categoriesOfResult;
    }

    /**
     * @param categoriesOfResult the categoriesOfResult to set
     */
    public void setCategoriesOfResult(List<Category> categoriesOfResult) {
        this.categoriesOfResult = categoriesOfResult;
    };
    
}
