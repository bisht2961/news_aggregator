package com.mrBisht.news_aggregator.model;

public class AuthException extends Exception{
    private String message;
    public AuthException(String message){
        this.message = message;
    }
}
