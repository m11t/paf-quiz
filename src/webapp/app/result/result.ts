import { Answer } from './../answer/answer';
import { Question } from './../question/question';
import { User } from './../user/user';
import { ResultLinks } from './resultlinks.interface';

/**
 * Class containing result specific members and methods
 * 
 * @export
 * @class Result
 */
export class Result {

    public   id               : number;
    public   isCorrect        : boolean;
    public   resultOfUser     : User | string;
    public   resultForQuestion: Question | string;
    readonly givenAnswers     : Array<Answer | string> = [];
    readonly _links           : ResultLinks;

    constructor(result: any = {}) {
        this.id        = result.id || null;
        this.isCorrect = result.isCorrect || true;
        this._links    = result._links || null;
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
            this.isCorrect = false;
        }
        this.givenAnswers.push(answer);
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
        return this.givenAnswers.splice(index,1);
    }

    /**
     * Set the answers of this Result
     * 
     * @param {Array<Answer>} answers to be set
     * 
     * @memberOf Result
     */
    public setAnswers(answers: Array<Answer>) {
        this.givenAnswers.splice(0);
        answers.forEach((answer, index) => {
            this.addAnswer(answer);
        });
    }    
}