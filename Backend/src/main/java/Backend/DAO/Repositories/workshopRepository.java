package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.DAO.entities.Workshop;
import org.springframework.data.jpa.repository.Query;

public interface workshopRepository extends JpaRepository<Workshop, Integer>{




}
