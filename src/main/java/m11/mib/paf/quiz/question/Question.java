package m11.mib.paf.quiz.question;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;

import m11.mib.paf.quiz.answer.Answer;
import m11.mib.paf.quiz.category.Category;
import m11.mib.paf.quiz.user.User;

import javax.persistence.JoinColumn;

/**
 * Question
 * Basic JPA-Entity for a Quiz question
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
    private String image;
    
    @ManyToOne
    @JoinColumn(name = "questioner")
    private User questioner;
 
    @OneToMany(mappedBy = "questionOfAnswer", cascade = CascadeType.REMOVE)
    private List<Answer> answers;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
	name               = "question_categories",
	joinColumns        = @JoinColumn(name = "question"),
	inverseJoinColumns = @JoinColumn(name = "category")
    )
    private List<Category> categoriesOfQuestion;
    
    @Transient
    @JsonProperty("id")
    private Long jsonId;
    
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
     * @param label for the question
     * @param text containing the question
     * @param image to support the question
     */
    public Question(String label, String text, String image) {
	this.setLabel(label);
	this.setText(text);
	this.setImage(image);
    }

    /**
     * Create a new question with the full member support
     * 
     * @param label for the question
     * @param text containing the question
     * @param image to support the question
     * @param user asking the question
     * @param categorization of the question
     */
    public Question(String label, String text, String image, User user, List<Category> categorization) {
	this.setLabel(label);
	this.setText(text);
	this.setImage(image);
	this.setQuestioner(user);
	this.setCategoriesOfQuestion(categorization);
    }
    
    /**
     * @return the jsonId
     */
    public Long getJsonId() {
        return id;
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
    public String getImage() {
	return image;
    }

    /**
     * @param image the image to support the question
     */
    public void setImage(String image) {
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
     * @return the categoriesOfQuestion
     */
    public List<Category> getCategoriesOfQuestion() {
        return categoriesOfQuestion;
    }

    /**
     * @param categoriesOfQuestion the categoriesOfQuestion to set
     */
    public void setCategoriesOfQuestion(List<Category> categoriesOfQuestion) {
        this.categoriesOfQuestion = categoriesOfQuestion;
    }

}
