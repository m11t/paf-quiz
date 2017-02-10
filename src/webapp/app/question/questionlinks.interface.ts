import { Link } from './../misc/link.interface';

/**
 * Interface describing the HAL link structure of a question resource
 * 
 * @export
 * @interface QuestionLinks
 */
export interface QuestionLinks {
    self      : Link;
    question  : Link;
    questioner: Link;
    answers   : Link;
    results   : Link;
    image     : Link;
}