import { User } from './../user/user';
import { Answer } from './answer';

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
    //public isCategorizedBy: Array;

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

}