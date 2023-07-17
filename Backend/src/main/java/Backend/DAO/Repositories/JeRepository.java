package Backend.DAO.Repositories;

import Backend.DAO.entities.Je;
import Backend.DAO.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JeRepository extends JpaRepository<Je, Integer> {


    @Query("select u.je from User u where u=:user")
    Optional<Je> findByUser(@Param("user") User user);
}
