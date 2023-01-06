package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.DAO.entities.Hackathon;

public interface hackathonRepository extends JpaRepository<Hackathon, Integer>{

}
