package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Workshop;

@Repository
public interface workshopRepository extends JpaRepository<Workshop, Integer>{




}
