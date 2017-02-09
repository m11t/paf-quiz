import { Link } from './../misc/link.interface';

/**
 * Interface describing the HAL link structure of a answer resource
 * 
 * @export
 * @interface AnswerLinks
 */
export interface AnswerLinks {
    self    : Link;
    answer  : Link;
    results : Link; 
}