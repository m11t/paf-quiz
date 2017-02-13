package m11.mib.paf.quiz.category;

/**
 * CategoryInitilializer
 * Startup databse filler for categories
 *
 * @author M11
 * @version 1.0
 */
public class CategoryInitializer {

    // ~~~ Names for the standard categories
    public static final String GEOGRAPHY = "Geografie";
    public static final String ENTERTAINMENT = "Unterhaltung";
    public static final String HISTORY = "Geschichte";
    public static final String ART_AND_LITERATURE = "Kunst und Literatur";
    public static final String SCIENCE_AND_NATURE = "Wissenschaft und Technik";
    public static final String SPORT_AND_LEISURE = "Sport und Vergnügen";
    
    private final CategoryRepository categoryRepository; // ~~~ CrudRepository of the categories, injected by Spring
    
    public CategoryInitializer(
	    CategoryRepository categoryRepository
	   ) {
	this.categoryRepository = categoryRepository;
    }

    /**
     * Initialize the Categories in the database
     * Standard categories are based on Trivial Pursuit:
     * 	Geography, Entertainment, History, Arts & Literature, Science & Nature and Sport & Leisure
     */
    public void initialize() {
    	categoryRepository.save(new Category(CategoryInitializer.GEOGRAPHY));
    	categoryRepository.save(new Category(CategoryInitializer.ENTERTAINMENT));
    	categoryRepository.save(new Category(CategoryInitializer.HISTORY));
    	categoryRepository.save(new Category(CategoryInitializer.ART_AND_LITERATURE));
    	categoryRepository.save(new Category(CategoryInitializer.SCIENCE_AND_NATURE));
    	categoryRepository.save(new Category(CategoryInitializer.SPORT_AND_LEISURE));
    }
}
