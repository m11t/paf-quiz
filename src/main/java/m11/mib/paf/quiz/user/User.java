package m11.mib.paf.quiz.user;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Random;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.springframework.hateoas.ResourceSupport;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.fasterxml.jackson.annotation.JsonProperty;

import m11.mib.paf.quiz.auth.FailedJWTCreationException;
import m11.mib.paf.quiz.question.Question;
import m11.mib.paf.quiz.result.Result;

/**
 * Benutzer der Quiz-Applikation
 * 
 *
 * @author M11
 * @version 1.0
 */
@Entity
public class User extends ResourceSupport {

    @Id
    private String id;
    private String password;
    private byte[] salt;
    
    @Lob
    private byte[] portrait;
    
    @OneToMany(mappedBy = "resultOfUser", cascade = CascadeType.REMOVE)
    private List<Result> results;
    
    @OneToMany(mappedBy = "questioner", cascade = CascadeType.REMOVE)
    private List<Question> questions;
    
    @Transient
    @JsonProperty("id")
    private String jsonId;
    
    @Transient
    public String token;
    
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
	
	return sb.toString();
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
     * @return the results
     */
    public List<Result> getResults() {
        return results;
    }

    /**
     * @param results the results to set
     */
    public void setResults(List<Result> results) {
        this.results = results;
    }

    /**
     * @return the questions
     */
    public List<Question> getQuestions() {
        return questions;
    }

    /**
     * @param questions the questions to set
     */
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
    
    /**
     * @return the jsonId
     */
    public String getJsonId() {
	return id;
    }

    /**
     * @return Whether the User is currently logged into the system
     */
    public Boolean isLoggedIn() {
	return this.token != "";
    }
    /**
     * Validates the provided password and afterwards generates the JSON-Web-Token with the legitimate claim of the user
     * 
     * @param password The password with which a User tries to login
     * @return whether the user successfully logged in
     */
    public Boolean logIn(String password) {
	if ( !this.password.equals(encryptPassword(password)) ) {
	    return false;
	}

	try {
	    this.token = JWT.create()
		    .withIssuer("paf-quiz")
		    .withSubject(this.id)
		    .sign(Algorithm.HMAC256(this.password));
	} catch (IllegalArgumentException | JWTCreationException | UnsupportedEncodingException e) {
	    e.printStackTrace();
	    throw new FailedJWTCreationException();
	}
	
	return true;
    }
    /**
     * @param token to be verified
     * @return whether the token is valid
     */
    public boolean verify(String token) {
	JWTVerifier verifier;
	try {
	    verifier = JWT.require(Algorithm.HMAC256(this.password)).build();
	    verifier.verify(token);
	} catch (Exception e) {
	    e.printStackTrace();
	    return false;
	}
	return true;
    }
    /**
     * Resets the loggedIn flag of the user
     */
    public void logOut() {
	this.token = "";
    }
    
}
