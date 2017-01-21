/**
 * User
 */
export class User {

    public isLoggedIn : boolean;

    constructor() {
        
    }

    /**
     * login
     */
    public login() {
        this.isLoggedIn = true;
    }

    /**
     * logout
     */
    public logout() {
        this.isLoggedIn = false;
    }
}