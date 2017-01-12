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

import m11.mib.paf.quiz.question.Question;
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
    private Boolean isCorrect;
    
    @ManyToOne
    @JoinColumn(name = "user")
    private User resultOfUser;
    
    @ManyToOne
    @JoinColumn(name = "question")
    private Question resultForQuestion;

    @ManyToMany
    @JoinTable(
	name               = "result_answers",
	joinColumns        = @JoinColumn(name = "result"),
	inverseJoinColumns = @JoinColumn(name = "answer")
    )
    private List<Result> givenAnswers;
    
    public Result() {}

    /**
     * @return Whether the result is correct
     */
    public boolean isCorrect() {
	return isCorrect;
    }

    /**
     * @param isCorrect Whether the result was correct
     */
    public void setCorrect(boolean isCorrect) {
	this.isCorrect = isCorrect;
    };
    
}
