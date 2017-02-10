import { AnswerLinks } from './answerlinks.interface';
import { Question } from './../question/question';

/**
 * Class containing specific members and methods for the answer of a question
 * 
 * @export
 * @class Answer
 */
export class Answer {

    public text             : string;
    public correct          : boolean;
    public questionOfAnswer : string;
    public _links           : AnswerLinks;

    constructor() { }
}