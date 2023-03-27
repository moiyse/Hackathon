package Backend.DAO.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Reservation;
import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;

@Repository
public interface reservationRepository extends JpaRepository<Reservation, Integer>{

    Reservation findByUserAndWorkshop(User user, Workshop workshop);
    List<Reservation> findByUser(User user);
    List<Reservation> findByWorkshop(Workshop workshop);
}
