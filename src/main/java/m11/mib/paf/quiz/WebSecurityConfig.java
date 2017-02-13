package m11.mib.paf.quiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AndRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

import m11.mib.paf.quiz.auth.JWTEntryPoint;
import m11.mib.paf.quiz.auth.JWTAuthenticationFilter;
import m11.mib.paf.quiz.auth.JWTAuthenticationProvider;

/**
 * WebSecurityConfig
 * Enhances the automatic configuration of Spring by:
 *   - providing an Authentication Filter
 *   - configuring spring-security
 *
 * @author M11
 * @version 1.0
 */
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    public static String JWT_TOKEN_HEADER = "Authorization";
    public static String JWT_TOKEN_PREFIX = "Bearer ";
    public static String API_LOGIN_POINT  = "/api/auth/login";
    public static String API_SIGNUP_POINT = "/api/auth/signup";
    public static String API_ENTRY_POINT  = "/api/**";
    
    @Autowired private JWTEntryPoint jwtAuthenticationEntryPoint;
    @Autowired private JWTAuthenticationProvider jwtAuthenticationProvider;
    @Autowired private AuthenticationFailureHandler authenticationFailureHandler;
    
    /**
     * Configure and return a custom AuthenticationFilter
     * 
     * @return the authentication filer for /api/** without /api/auth/login
     * @throws Exception 
     */
    protected JWTAuthenticationFilter buildJWTAuthenticationFilter() throws Exception {
	AntPathRequestMatcher apiMatcher   = new AntPathRequestMatcher(WebSecurityConfig.API_ENTRY_POINT);
	OrRequestMatcher      authMatcher  = new OrRequestMatcher(new AntPathRequestMatcher(WebSecurityConfig.API_LOGIN_POINT), new AntPathRequestMatcher(WebSecurityConfig.API_SIGNUP_POINT));
	NegatedRequestMatcher freeMatcher  = new NegatedRequestMatcher(authMatcher);
	AndRequestMatcher     comboMatcher = new AndRequestMatcher(apiMatcher, freeMatcher); 
	JWTAuthenticationFilter filter     = new JWTAuthenticationFilter(authenticationFailureHandler, comboMatcher);
	
	filter.setAuthenticationManager(this.authenticationManager());
	return filter;
    }

    /**
     * Configure Spring-Security
     * 
     * @see org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter#configure(org.springframework.security.config.annotation.web.builders.HttpSecurity)
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
	http.csrf().disable(); // ~~~ Cross-Site-Request-Forgery unnecessary
	
	// ~~~ Define public Entry-Points
	http.authorizeRequests() 
		.antMatchers(WebSecurityConfig.API_LOGIN_POINT, WebSecurityConfig.API_SIGNUP_POINT).permitAll();

	// ~~~ Define protected Entry-Points
	http.authorizeRequests() 
		.antMatchers("/api/**").authenticated();

	// ~~~ Define the authentication filter
	http.addFilterBefore(buildJWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	// ~~~ Define the Entry-Point for authentication failures
	http.exceptionHandling()
		.authenticationEntryPoint(jwtAuthenticationEntryPoint);
    }
    
    /**
     * Set a custom AuthenticationProvider
     * 
     * @see org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter#configure(org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder)
     * @throws Exception
     */
    @Override
    public void configure(AuthenticationManagerBuilder auth)  throws Exception {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }
    
}