import { Link } from './../misc/link.interface';

/**
 * Interface describing the HAL link structure of a category resource
 * 
 * @export
 * @interface CategoryLinks
 */
export interface CategoryLinks {
    self     : Link;
    category : Link;
    questions: Link;
    results  : Link; 
}