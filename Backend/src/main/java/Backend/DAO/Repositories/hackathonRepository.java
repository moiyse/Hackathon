package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Hackathon;

@Repository
public interface hackathonRepository extends JpaRepository<Hackathon, Integer>{

}
