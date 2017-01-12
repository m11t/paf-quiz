package m11.mib.paf.quiz.answer;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import m11.mib.paf.quiz.question.Question;
import m11.mib.paf.quiz.result.Result;

/**
 * MT \ 12.01.2017 \ Answer
 * 
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String text;
    private Boolean isCorrect;
    
    @ManyToOne
    @JoinColumn(name = "question")
    private Question questionOfAnswer;

    @ManyToMany(mappedBy = "givenAnswers")
    private List<Result> results;

    public Answer() {}
    
    /**
     * Create a new Answer
     * 
     * @param text      the text for the answer
     * @param isCorrect whether the answer is correct
     */
    public Answer(String text, Boolean isCorrect) {
	this.setText(text);
	this.setCorrect(isCorrect);
    }
    
    /**
     * @return the text of the answer
     */
    public String getText() {
	return text;
    }
    /**
     * @param text the text for the answer
     */
    public void setText(String text) {
	this.text = text;
    }
    /**
     * @return whether the answer is correct
     */
    public Boolean isCorrect() {
	return isCorrect;
    }
    /**
     * @param isCorrect whether the answer is correct
     */
    public void setCorrect(Boolean isCorrect) {
	this.isCorrect = isCorrect;
    }
    
}
