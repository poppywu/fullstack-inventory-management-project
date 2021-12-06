package cs6400.team82.jauntyjalopiesbackend.service;

import cs6400.team82.jauntyjalopiesbackend.dao.UserDAO;
import cs6400.team82.jauntyjalopiesbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public User getUserByUsername(String username) {
        return userDAO.getByUsername(username);
    }

    public User loginUser(String username, String password) {
        return userDAO.loginUserWithUsernameAndPassword(username, password);
    }
}
