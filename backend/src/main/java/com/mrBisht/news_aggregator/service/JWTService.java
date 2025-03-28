package com.mrBisht.news_aggregator.service;


import com.mrBisht.news_aggregator.model.Users;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private String SECRET_KEY = "KcFYX28kE1ucrgbz1KetICn3kl6x24rrADMyvIhGQDk=";

    public String generateToken(Users user,Date issueAt,Date expiration) {
            Map<String, Object> claims = new HashMap<>();
            return Jwts.builder()
                    .claims()
                    .add(claims)
                    .subject(user.getEmail())
                    .issuedAt(issueAt)
                    .expiration(expiration)
                    .and()
                    .signWith(getKey())
                    .compact();
    }
    private SecretKey getKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException e) {
            System.err.println("JWT Parsing Error: " + e.getMessage());
            throw e;
        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);

        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String validateRefreshToken(String token) {
        try {
            return extractUserName(token);
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }


    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
