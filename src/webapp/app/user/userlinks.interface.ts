import { Link } from './../misc/link.interface';

/**
 * Interface describing the HAL link structure of a user resource
 * 
 * @export
 * @interface UserLinks
 */
export interface UserLinks {
    self     : Link;
    user     : Link;
    results  : Link;
    questions: Link; 
}