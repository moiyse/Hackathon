package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<User, Integer>{

    Optional<User> findByEmail(String email);

    Optional<User> getByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("select count(u) = 1 from User u where u.email=:email and u.password=:password")
    Boolean checkCredentials(@Param("email")String email,@Param("password")String password);

}
