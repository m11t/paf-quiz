import { Answer } from './../answer/answer';
import { Category } from './../category/category';
import { User } from './../user/user';
import { ResultLinks } from './resultlinks.interface';

/**
 * Class containing result specific members and methods
 * 
 * @export
 * @class Result
 */
export class Result {

    public   id           : number;
    public   correct      : boolean;
    public   userOfResult : User | string;
    public   categories   : Array<Category | string> = [];
    readonly answers      : Array<Answer | string> = [];
    readonly _links       : ResultLinks;

    constructor(result: any = {}) {
        this.id        = result.id || null;
        this.correct = result.isCorrect || true;
        this._links    = result._links || null;
    }

    /**
     * Prepare the Result for saving it in the server, by converting the user and categories associations
     * 
     * @returns {Result} with converted associations to user and categories
     * 
     * @memberOf Result
     */
    public preparedForSave(): Result {
        if ( this.answers.length === 0 ) {
            this.correct = false;
        }
        if ( this.userOfResult instanceof User ) {
            this.userOfResult = this.userOfResult._links.self.href;
        }
        this.categories = this.categories.map((category) => {
            if ( category instanceof Category ) {
                return category._links.self.href;
            }
            return category;
        });
        return this;
    }

    /**
     * Add an answer to this Result
     * 
     * @param {Answer} answer to add to the list of Answers
     * 
     * @memberOf Result
     */
    public addAnswer(answer: Answer) {
        if ( !answer.correct ) {
            this.correct = false;
        }
        this.answers.push(answer);
    }

    /**
     * Remove an answer from this Result
     * 
     * @param {number} index to be removed
     * @returns {(Array<Answer | string>)} removed Answer
     * 
     * @memberOf Result
     */
    public removeAnswer(index: number): Array<Answer | string> {
        return this.answers.splice(index,1);
    }

    /**
     * Set the answers of this Result
     * 
     * @param {Array<Answer>} answers to be set
     * 
     * @memberOf Result
     */
    public setAnswers(answers: Array<Answer>) {
        this.answers.splice(0);
        answers.forEach((answer, index) => {
            this.addAnswer(answer);
        });
    }

    /**
     * Add a category to this result
     * 
     * @param {Category} category
     * 
     * @memberOf Result
     */
    public addCategory(category: Category) {
        this.categories.push(category);
    }

    /**
     * Set the categories of this result
     * 
     * @param {Array<Category>} categories to be set
     * 
     * @memberOf Result
     */
    public setCategories(categories: Array<Category>) {
        this.categories.splice(0);
        categories.forEach(category => {
            this.addCategory(category);
        });
    }
}