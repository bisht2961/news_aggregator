package com.mrBisht.news_aggregator.controller;

import com.mrBisht.news_aggregator.model.Article;
import com.mrBisht.news_aggregator.model.NewsApiResponse;
import com.mrBisht.news_aggregator.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/everything")
    public ResponseEntity<?> getEveryNews(
            @RequestParam int page,
            @RequestParam(name = "page_size") int pageSize,
            @RequestParam(name = "news_preference") String newsPreferences
    ){
        NewsApiResponse newsApiResponse = newsService.getEverythingNews(page,pageSize,newsPreferences);
        if( newsApiResponse != null )return new ResponseEntity<>(newsApiResponse, HttpStatus.OK);
        return new ResponseEntity<>("No News found",HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category")
    public ResponseEntity<?> getNewsByCategory(
            @RequestParam int page,
            @RequestParam(name = "page_size") int pageSize,
            @RequestParam(name = "news_preference") String newsPreferences
    ){
        NewsApiResponse newsApiResponse = newsService.getCategoriesNews(page,pageSize,new String[]{newsPreferences});
        if( newsApiResponse != null )return new ResponseEntity<>(newsApiResponse, HttpStatus.OK);
        return new ResponseEntity<>("No News found",HttpStatus.NO_CONTENT);
    }

    @PostMapping("/scrap")
    public ResponseEntity<?> getNewsContent(
            @RequestBody Article article
            ){
        String content = newsService.scrapNewsContent(article.getUrl());
        article.setContent(content);
        if( content.trim().isEmpty())article.setContent("Not Able to Fetch");
        return new ResponseEntity<>(article,HttpStatus.OK);
    }

}
