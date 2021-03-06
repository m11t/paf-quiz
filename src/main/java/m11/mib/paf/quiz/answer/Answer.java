package m11.mib.paf.quiz.answer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import m11.mib.paf.quiz.question.Question;

/**
 * Answer
 * Basic JPA-Entity for an Answer to a Quiz question
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
     * Create a new Answer
     * 
     * @param question  question of the answer
     * @param text      the text for the answer
     * @param isCorrect whether the answer is correct
     */
    public Answer(Question question, String text, Boolean isCorrect) {
	this.setText(text);
	this.setCorrect(isCorrect);
	this.setQuestionOfAnswer(question);
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

    /**
     * @return the questionOfAnswer
     */
    public Question getQuestionOfAnswer() {
        return questionOfAnswer;
    }

    /**
     * @param questionOfAnswer the questionOfAnswer to set
     */
    public void setQuestionOfAnswer(Question questionOfAnswer) {
        this.questionOfAnswer = questionOfAnswer;
    }
    
}
