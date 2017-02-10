import { CategoryLinks } from './categorylinks.interface';

/**
 * Class containing category specific members and methods
 * 
 * @export
 * @class Category
 */
export class Category {

    public   name  : string;
    readonly _links: CategoryLinks; 

    constructor(category: any = {}) {
        this.name   = category.name   || "";
        this._links = category._links || null;        
    }
}