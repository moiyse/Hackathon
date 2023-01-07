package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Equipe;


@Repository
public interface equipeRepository extends JpaRepository<Equipe, Integer>{

}
