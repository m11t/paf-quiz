package m11.mib.paf.quiz.auth;

import java.io.UnsupportedEncodingException;

import org.springframework.hateoas.ResourceSupport;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * MT \ 22.01.2017 \ JWTAuthenticationToken
 * 
 *
 * @author M11
 * @version 1.0
 */
public class JWTAuthenticationToken extends ResourceSupport {
    public static final String SECRET = "8b8e2e611c07";

    private final String token;
    
    /**
     * Creates a JSON-Web-Token with a deserializer
     * 
     * @param token
     */
    @JsonCreator
    public JWTAuthenticationToken(@JsonProperty("token") String token) {
	this.token = token;
    }
    
    /**
     * Creates a JSON-Web-Token from a subject string and a secret string 
     * 
     * @param subject
     * @param secret
     * @throws IllegalArgumentException
     * @throws JWTCreationException
     * @throws UnsupportedEncodingException
     */
    public JWTAuthenticationToken(String subject, String secret) throws IllegalArgumentException, JWTCreationException, UnsupportedEncodingException {
	this.token = JWT.create()
		.withIssuer("paf-quiz")
		.withSubject(subject)
		.sign(Algorithm.HMAC256(secret));
    }
    
    /**
     * @return The JSON-Web-Token token
     */
    public String getToken() {
	return this.token;
    }
}
