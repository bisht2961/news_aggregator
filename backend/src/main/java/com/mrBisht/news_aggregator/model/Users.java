package com.mrBisht.news_aggregator.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
@TypeAlias("user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Users {
    @Id
    private String id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String[]newsPreferences;
}
