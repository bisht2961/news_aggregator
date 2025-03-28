package com.mrBisht.news_aggregator.service;

import com.mrBisht.news_aggregator.model.AuthException;
import com.mrBisht.news_aggregator.model.TokenResponse;
import com.mrBisht.news_aggregator.model.Users;
import com.mrBisht.news_aggregator.model.UsersException;
import com.mrBisht.news_aggregator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JWTService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users getUser(String id) throws UsersException{
        Optional<Users>optionalUsers =  repository.findById(id);
        if(optionalUsers.isEmpty())
            throw new UsersException("User Not Found");
        return optionalUsers.get();
    }

    public Users getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Users addUser(Users user) throws UsersException {
        Users check = getUserByEmail(user.getEmail());
        if( check != null ){
            throw new UsersException("Email Already Present");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);
        user.setPassword("");
        return user;
    }

    public List<Users> getAllUsers() {
        return repository.findAll();
    }

    public String verify(Users user, Date issuedAt, Date expiration)  {
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        if( authentication.isAuthenticated()){
            return jwtService.generateToken(user,issuedAt,expiration);
        }
        return null;
    }

}
