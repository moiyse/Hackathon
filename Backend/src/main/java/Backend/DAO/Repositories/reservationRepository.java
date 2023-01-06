package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import Backend.DAO.entities.Reservation;

public interface reservationRepository extends JpaRepository<Reservation, Integer>{

}
