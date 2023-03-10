package Backend.DAO.Repositories;

import Backend.DAO.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Equipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


@Repository
public interface equipeRepository extends JpaRepository<Equipe, Integer>{


    @Query("select e from Equipe e where e.leader=:user")
    public Optional<Equipe> getEquipeByLeader(@Param("user") User user);
}
