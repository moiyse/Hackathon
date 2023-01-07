package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.User;

@Repository
public interface userRepository extends JpaRepository<User, Integer>{

}
