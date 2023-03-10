package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Reservation;

@Repository
public interface reservationRepository extends JpaRepository<Reservation, Integer>{

}
