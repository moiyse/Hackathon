package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.DAO.entities.User;

public interface userRepository extends JpaRepository<User, Integer>{

}
