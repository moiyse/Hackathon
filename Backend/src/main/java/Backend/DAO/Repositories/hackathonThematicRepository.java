package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.hackathonThematic;

@Repository
public interface hackathonThematicRepository extends JpaRepository<hackathonThematic, Integer> {

}
