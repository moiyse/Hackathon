package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Partner;



@Repository
public interface partnerRepository extends JpaRepository<Partner, Integer>{

}
