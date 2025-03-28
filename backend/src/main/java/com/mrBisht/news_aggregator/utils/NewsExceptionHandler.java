package com.mrBisht.news_aggregator.utils;

import com.mrBisht.news_aggregator.model.AuthException;
import com.mrBisht.news_aggregator.model.UsersException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class NewsExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public ProblemDetail handleSecurityException(Exception exception){
        ProblemDetail detail = null;
        if( exception instanceof BadCredentialsException ){
            detail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(401),exception.getMessage());
            detail.setProperty("access_denied_reason","Invalid Credentials");
        }
        else if( exception instanceof AccessDeniedException ){
            detail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(403),exception.getMessage());
            detail.setProperty("access_denied_reason","Not Authorized!");
        }
        else if( exception instanceof SignatureException){
            detail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(403),exception.getMessage());
            detail.setProperty("access_denied_reason","Invalid JWT Token ");
        }
        else if( exception instanceof UsersException){
            detail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(403),exception.getMessage());
            detail.setProperty("access_denied_reason",exception.getMessage());
        }
        else if( exception instanceof AuthException){
            detail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(401),exception.getMessage());
            detail.setProperty("access_denied_reason",exception.getMessage());
        }
        else{
            detail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(500),exception.getMessage());
            detail.setProperty("access_denied_reason"," Internal Server Error");
        }
        return detail;
    }

}
