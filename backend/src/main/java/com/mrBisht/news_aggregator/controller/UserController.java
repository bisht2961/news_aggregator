package com.mrBisht.news_aggregator.controller;

import com.mrBisht.news_aggregator.model.AuthException;
import com.mrBisht.news_aggregator.model.TokenResponse;
import com.mrBisht.news_aggregator.model.Users;
import com.mrBisht.news_aggregator.model.UsersException;
import com.mrBisht.news_aggregator.service.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    private static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60 * 1000;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) throws UsersException {
        return new ResponseEntity<>(service.addUser(user), HttpStatusCode.valueOf(200));
    }

    @PostMapping("/login")
    public ResponseEntity<?>  login(@RequestBody Users user) {
        Date issuedDate = new Date();
        Date refreshExpiration = new Date(issuedDate.getTime()+REFRESH_TOKEN_VALIDITY);
        String pattern = "MM/dd/yyyy HH:mm:ss";
        DateFormat df = new SimpleDateFormat(pattern);
        String refreshToken = service.verify(user,issuedDate,refreshExpiration);
        TokenResponse tokenResponse = new TokenResponse( refreshToken,df.format(refreshExpiration));
        return new ResponseEntity<> (tokenResponse,HttpStatusCode.valueOf(200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>  getUser(@PathVariable String id)throws UsersException{
        return new ResponseEntity<> (service.getUser(id),HttpStatusCode.valueOf(200));
    }

    @GetMapping("/email")
    public ResponseEntity<?>  getUserByEmail(@RequestParam(value = "email") String email){
        return new ResponseEntity<> (service.getUserByEmail(email),HttpStatusCode.valueOf(200));
    }

    @GetMapping("/users")
    public ResponseEntity<?>  getUsers() {
        return new ResponseEntity<> (service.getAllUsers(),HttpStatusCode.valueOf(200));
    }
}
