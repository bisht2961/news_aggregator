package com.mrBisht.news_aggregator.repository;

import com.mrBisht.news_aggregator.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Users,String> {

    Users findByEmail(String email);
}
