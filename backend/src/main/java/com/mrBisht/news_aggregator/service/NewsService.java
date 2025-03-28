package com.mrBisht.news_aggregator.service;

import com.mrBisht.news_aggregator.model.Article;
import com.mrBisht.news_aggregator.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import java.util.ArrayList;

@Service
public class NewsService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${news.api.key}")
    private String api_key;

    @Value("${news.api.everything.url}")
    private String EVERYTHING_URL;

    @Value("${news.api.headlines.url}")
    private String HEADLINES_URL;

    public NewsApiResponse getEverythingNews(int page,int pageSize,String query){
        String url = EVERYTHING_URL+"q="+query+"&pageSize="+pageSize+"&page="+page+"&apiKey="+api_key;
        ResponseEntity<NewsApiResponse> res =
                restTemplate.exchange(url, HttpMethod.GET,null,NewsApiResponse.class);
        NewsApiResponse response = res.getBody();

        NewsApiResponse result = new NewsApiResponse(response.getTotalResults(),new ArrayList<>());
        for(Article article: response.getArticles()){
            if(article.getTitle().equals("[Removed]"))continue;
            result.getArticles().add(article);
        }
        return result;
    }

    public NewsApiResponse getCategoriesNews(int page,int pageSize,String[]newsPreference){
        String url = HEADLINES_URL+"q="+newsPreference[0]+"&pageSize="+pageSize+"&page="+page+"&apiKey="+api_key;
        ResponseEntity<NewsApiResponse> res =
                restTemplate.exchange(url, HttpMethod.GET,null,NewsApiResponse.class);
        NewsApiResponse response = res.getBody();
        NewsApiResponse result = new NewsApiResponse(response.getTotalResults(),new ArrayList<>());
        for(Article article: response.getArticles()){
            if(article.getTitle().equals("[Removed]"))continue;
            result.getArticles().add(article);
        }
        return response;
    }

    public String scrapNewsContent(String url) {
        try{
            Document document = Jsoup.connect(url).get();
            String headline = document.select("h1").text();
            Elements content = document.select("article p");

            StringBuilder fullContent = new StringBuilder();
            content.forEach(paragraph -> fullContent.append(paragraph.text()).append("\n"));

            return headline + "\n\n" + fullContent;
        }catch (Exception e) {
            return "Error fetching news content.";
        }
    }
}
