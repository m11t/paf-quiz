import { User } from './../user/user';
import { Answer } from './answer';
import { Category } from './category';

/**
 * Class containing question specific members and methods
 * 
 * @export
 * @class Question
 */
export class Question {

    public id             : number;
    public label          : string;
    public text           : string;
    public questioner     : string;
    public answers        : Array<Answer> = [];
    //public results        : Array;
    readonly isCategorizedBy: Array<string>   = [];
    public   categorisation : Array<Category> = [];

    constructor() { }

    /**
     * Add an answer to this question
     * 
     * @param {Answer} answer to add to the list of Answers
     * 
     * @memberOf Question
     */
    public addAnswer(answer: Answer) {
        this.answers.push(answer);
    }

    /**
     * Remove an answer of this question
     * 
     * @param {number} index in the list of Answers
     * @returns {Array<Answer>} the list of removed items
     * 
     * @memberOf Question
     */
    public removeAnswer(index: number): Array<Answer> {
        return this.answers.splice(index,1);
    }

    /**
     * Add a categorisation for this question
     * 
     * @param {Category} category to categorize this question by
     * 
     * @memberOf Question
     */
    public addCategory(category: Category) {
        this.isCategorizedBy.push(category._links.self.href);
        this.categorisation.push(category);
    }

    /**
     * Remove a categorisation of this question
     * 
     * @param {number} index in the list of Categories
     * @returns {Array<Category>} the list of removed items
     * 
     * @memberOf Question
     */
    public removeCategory(index: number): Array<Category> {
        this.isCategorizedBy.splice(index,1);
        return this.categorisation.splice(index,1);
    }

}