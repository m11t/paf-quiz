import { User } from './../user/user';
import { Answer } from './../answer/answer';
import { Category } from './../category/category';
import { QuestionLinks } from './questionlinks.interface';

/**
 * Class containing question specific members and methods
 * 
 * @export
 * @class Question
 */
export class Question {

    public   id             : number;
    public   label          : string;
    public   text           : string;
    public   questioner     : string;
    readonly answers        : Array<string> = [];
    readonly answersList    : Array<Answer> = [];
    //public results        : Array;
    readonly isCategorizedBy: Array<string>   = [];
    public   categorisation : Array<Category> = [];
    readonly _links         : QuestionLinks;

    constructor() { }

    /**
     * Is a category already part of the categorisation list?
     * 
     * @private
     * @param {Category} category to check
     * @returns {boolean} whether the question is categorised by the category
     * 
     * @memberOf Question
     */
    private containsCategory(category: Category): boolean {
        let c = this.categorisation.find(value => {
            return value.name === category.name;
        });
        if ( typeof(c) === 'undefined' ) return false;
        return true;
    }

    /**
     * Add an answer to this question
     * 
     * @param {Answer} answer to add to the list of Answers
     * 
     * @memberOf Question
     */
    public addAnswer(answer: Answer) {
        this.answersList.push(answer);
    }

    /**
     * Update the answer of a question
     * This method updates the question with the HAL links of the answer resources, so that the JPA can link them correctly when the question is saved
     * 
     * @param {number} index in the list of Answers
     * @param {Answer} answer to replace the current one
     * @returns {Array<Answer>} the list of removed items
     * 
     * @memberOf Question
     */
    public updateAnswer(index: number, answer: any) {
        this.answers[index] = answer._links.self.href;
        return this.answersList.splice(index,1, answer);
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
        return this.answersList.splice(index,1);
    }

    /**
     * Add a categorisation for this question
     * 
     * @param {Category} category to categorize this question by
     * 
     * @memberOf Question
     */
    public addCategory(category: Category) {
        if ( this.containsCategory(category) ) {
            return;
        }
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