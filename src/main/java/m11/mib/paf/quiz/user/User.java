package m11.mib.paf.quiz.user;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import m11.mib.paf.quiz.question.Question;
import m11.mib.paf.quiz.result.Result;

/**
 * MT \ 09.01.2017 \ User
 * 
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class User {

    @Id
    private String id;
    private String password;
    private byte[] salt;
    private Boolean loggedIn;

    @Lob
    private byte[] portrait;
    
    @OneToMany(mappedBy = "resultOfUser")
    private List<Result> results;
    
    @OneToMany(mappedBy = "questioner")
    private List<Question> questions;
    
    /**
     * Creates a hash out of the given password String.
     * Used for Saving the Password to the database and for validating during login procedure.
     * 
     * @param password The password to be encrypted
     * @return The encrypted password hash
     */
    private String encryptPassword(String password) {
	MessageDigest md = null;
	StringBuilder sb = new StringBuilder();
	String encryptedPassword = null;
	byte[] hash;
	
	try {
	    md = MessageDigest.getInstance("SHA-256");
	    md.update(this.salt);
	    hash = md.digest(password.getBytes());
    	
	    for (int i=0; i<hash.length; i++) {
    	    	sb.append(Integer.toString((hash[i]&0xff) + 0x100, 16).substring(1));
	    }
	} catch (NoSuchAlgorithmException e) {
	    e.printStackTrace();
	}
	
	return encryptedPassword;
    }
    
    /**
     * Constructor-Stub for JPA
     */
    public User() {}
    
    /**
     * Create a new user with User-Id and password and generate a random salt.
     * 
     * @param id
     * @param password
     */
    public User(String id, String password) {
	Random randomizer = new Random();
	
	this.id   = id;
	this.salt = id.getBytes();
	randomizer.nextBytes(this.salt);
	this.password = this.encryptPassword(password);
    }
    
    /**
     * @return The portrait of the user
     */
    public byte[] getPortrait() {
	return portrait;
    }

    /**
     * Set the portrait of the user
     * 
     * @param portrait The image to set as portrait
     */
    public void setPortrait(byte[] portrait) {
	this.portrait = portrait;
    }

    /**
     * @return Whether the User is currently logged into the system
     */
    public Boolean isLoggedIn() {
	return loggedIn;
    }
    /**
     * Sets the loggedIn flag of the user
     * 
     * @param password The password with which a User tries to login
     */
    public void logIn(String password) {
	if ( this.password != encryptPassword(password) ) {
	    throw new Error("Wrong Password!");//WrongPasswordException();
	}
	
	this.loggedIn = true;
    }
    /**
     * Resets the loggedIn flag of the user
     */
    public void logOut() {
	this.loggedIn = false;
    }
    
}
