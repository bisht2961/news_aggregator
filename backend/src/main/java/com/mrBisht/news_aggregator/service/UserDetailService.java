package com.mrBisht.news_aggregator.service;

import com.mrBisht.news_aggregator.model.UserPrincipal;
import com.mrBisht.news_aggregator.model.Users;
import com.mrBisht.news_aggregator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = repository.findByEmail(username);
        if( user == null ){
            throw new UsernameNotFoundException(username+"not found");
        }
        return new UserPrincipal(user);
    }
}
