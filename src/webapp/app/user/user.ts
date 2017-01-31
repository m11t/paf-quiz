import { UserLinks } from './links.interface';

/**
 * Class containing user specific members and methods
 * 
 * @export
 * @class User
 */
export class User {

    public   id       : string;
    public   password : string;
    readonly token    : string;
    readonly _links    : UserLinks;

    constructor(user: any = {}) {
        this.id       = user.id     || "";
        this.token    = user.token  || "";
        this._links   = user._links || null;
     }

     /**
      * Create a new user with the provided property values
      * 
      * @static
      * @param {string}    id
      * @param {string}    token
      * @param {UserLinks} links
      * @returns a new user with the provided property values
      * 
      * @memberOf User
      */
     public static createUser(id: string, token: string, links: UserLinks) {
         return new User({
             id    : id,
             token : token,
             _links: links
         })
     }
}