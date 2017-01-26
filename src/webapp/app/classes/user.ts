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

    constructor() { }

    get isLoggedIn() {
        return this.token !== "";
    }

}