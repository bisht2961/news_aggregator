package com.mrBisht.news_aggregator.model;

import lombok.Getter;

@Getter

public class UsersException extends Exception{
    private String message;
    public UsersException(String message){
        this.message = message;
    }
}
