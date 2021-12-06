package cs6400.team82.jauntyjalopiesbackend.controller;

import cs6400.team82.jauntyjalopiesbackend.model.User;
import cs6400.team82.jauntyjalopiesbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/login")
    public ResponseEntity<User> loginUser(@RequestBody Map<String, Object> usernameAndPasswordPayload) {
        try {
            String username = (String) usernameAndPasswordPayload.get("username");
            String password = (String) usernameAndPasswordPayload.get("password");
            return new ResponseEntity<>(userService.loginUser(username, password), HttpStatus.OK);
        } catch (IncorrectResultSizeDataAccessException error) { // incorrect login 
            error.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.OK); 
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(path = "/{username}")
    public ResponseEntity<User> getUserDetailByUsername(@PathVariable("username") String username) {
        try {
            return new ResponseEntity<User>(userService.getUserByUsername(username), HttpStatus.OK);
        } catch (Exception error) {
            error.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

