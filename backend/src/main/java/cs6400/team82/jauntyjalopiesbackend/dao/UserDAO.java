package cs6400.team82.jauntyjalopiesbackend.dao;

import cs6400.team82.jauntyjalopiesbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserDAO {
    RowMapper<User> userRowMapper = (rs, rowNumber) -> {
        User user = new User();
        user.setUsername(rs.getString("username"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setRole(rs.getString("role"));
        return user;
    };
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> allUsers() {
        String sql = "SELECT username,password,first_name,last_name,role FROM User";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    public User getByUsername(String username) {
        String sql = "SELECT username,first_name,last_name,role FROM User WHERE username=?";
        return jdbcTemplate.queryForObject(sql, userRowMapper, username);
    }

    public User loginUserWithUsernameAndPassword(String username, String password) {
        String sql = "SELECT username,first_name,last_name,role FROM User WHERE username=? AND password=?";
        return jdbcTemplate.queryForObject(sql, userRowMapper, username, password);
    }
}
