import { Link } from './../misc/link.interface';

/**
 * Interface describing the HAL link structure of a result resource
 * 
 * @export
 * @interface ResultLinks
 */
export interface ResultLinks {
    self              : Link;
    result            : Link;
    userOfResult      : Link;
    categoriesOfResult: Link; 
}