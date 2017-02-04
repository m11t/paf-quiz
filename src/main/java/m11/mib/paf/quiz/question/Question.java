package m11.mib.paf.quiz.question;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import m11.mib.paf.quiz.answer.Answer;
import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.result.Result;
import m11.mib.paf.quiz.user.User;

import javax.persistence.JoinColumn;

/**
 * MT \ 12.01.2017 \ Question
 * 
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String label;
    private String text;
    
    @Lob
    private byte[] image;
    
    @ManyToOne
    @JoinColumn(name = "questioner")
    private User questioner;
 
    @OneToMany(mappedBy = "questionOfAnswer")
    private List<Answer> answers;

    @OneToMany(mappedBy = "resultForQuestion")
    private List<Result> results;
    
    @ManyToMany
    @JoinTable(
	name               = "question_categories",
	joinColumns        = @JoinColumn(name = "question"),
	inverseJoinColumns = @JoinColumn(name = "category")
    )
    private List<Category> isCategorizedBy;
    
    public Question() {}
    
    /**
     * Create a new question
     * 
     * @param label the label for the question
     * @param text  the text containing the question
     */
    public Question(String label, String text) {
	this.setLabel(label);
	this.setText(text);
    }
    
    /**
     * Create a new question with a supporting image
     * 
     * @param label the label for the question
     * @param text  the text containing the question
     * @param image the image to support the question
     */
    public Question(String label, String text, byte[] image) {
	this.setLabel(label);
	this.setText(text);
	this.setImage(image);
    }

    /**
     * @return the label of the question
     */
    public String getLabel() {
	return label;
    }

    /**
     * @param label the label for the question
     */
    public void setLabel(String label) {
	this.label = label;
    }

    /**
     * @return the text of the question
     */
    public String getText() {
	return text;
    }

    /**
     * @param text the text containing the question
     */
    public void setText(String text) {
	this.text = text;
    }

    /**
     * @return the image of the question
     */
    public byte[] getImage() {
	return image;
    }

    /**
     * @param image the image to support the question
     */
    public void setImage(byte[] image) {
	this.image = image;
    }

    /**
     * @return the questioner
     */
    public User getQuestioner() {
        return questioner;
    }

    /**
     * @param questioner the questioner to set
     */
    public void setQuestioner(User questioner) {
        this.questioner = questioner;
    }

    /**
     * @return the answers
     */
    public List<Answer> getAnswers() {
        return answers;
    }

    /**
     * @param answers the answers to set
     */
    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    /**
     * @return the results
     */
    public List<Result> getResults() {
        return results;
    }

    /**
     * @param results the results to set
     */
    public void setResults(List<Result> results) {
        this.results = results;
    }

    /**
     * @return the isCategorizedBy
     */
    public List<Category> getIsCategorizedBy() {
        return isCategorizedBy;
    }

    /**
     * @param isCategorizedBy the isCategorizedBy to set
     */
    public void setIsCategorizedBy(List<Category> isCategorizedBy) {
        this.isCategorizedBy = isCategorizedBy;
    }

}
