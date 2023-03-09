package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.workshopThematic;

@Repository
public interface workshopThematicRepository extends JpaRepository<workshopThematic, Integer>{

}
