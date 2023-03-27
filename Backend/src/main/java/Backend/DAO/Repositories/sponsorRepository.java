package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Sponsor;



@Repository
public interface sponsorRepository extends JpaRepository<Sponsor, Integer>{

}
