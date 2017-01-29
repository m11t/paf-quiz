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
    public   links    : UserLinks;

    constructor(user: any = {}) {
        this.id       = user.id       || "";
        this.token    = user.token    || "";
     }

     /**
      * Set the association links for this user resource so that another service can easily consume those resources
      * 
      * @param {UserLinks} links
      * 
      * @memberOf User
      */
     public setLinks(links: UserLinks) {
         this.links = links;
     }
}