package com.mrBisht.news_aggregator.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Article {
    private String author;
    private String title;
    private String description;
    private String content;
    private String url;
    private Source source;
    private Date publishedAt;
    private String urlToImage;

}