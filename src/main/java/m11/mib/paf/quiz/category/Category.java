package m11.mib.paf.quiz.category;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import m11.mib.paf.quiz.question.Question;

/**
 * MT \ 12.01.2017 \ Category
 * 
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class Category {

    @Id
    private String name;
    
    @ManyToMany(mappedBy = "isCategorizedBy")
    private List<Question> questions;
    
    public Category() {}
    
    public Category(String name) {
	this.name = name;
    }
    
}
