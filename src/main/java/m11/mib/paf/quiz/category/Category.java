package m11.mib.paf.quiz.category;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonProperty;

import m11.mib.paf.quiz.question.Question;
import m11.mib.paf.quiz.result.Result;

/**
 * Category
 * Basic JPA-Entity for categorizing a Quiz question
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class Category {

    @Id
    private String name;
    @Transient
    @JsonProperty("name")
    private String jsonName;
    
    @ManyToMany(mappedBy = "categoriesOfQuestion")
    private List<Question> questions;

    @ManyToMany(mappedBy = "categoriesOfResult")
    private List<Result> results;
    
    public Category() {}
    
    public Category(String name) {
	this.name = name;
    }

    /**
     * @return the questions categorized by this Category
     */
    public List<Question> getQuestions() {
        return questions;
    }

    /**
     * @param questions the questions to be categorized by this Category
     */
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    /**
     * @return the name of this Category for JSON serialzation purposes
     */
    public String getJsonName() {
        return name;
    }
    
}
