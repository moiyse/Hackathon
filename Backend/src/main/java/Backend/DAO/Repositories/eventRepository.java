package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Event;



@Repository
public interface eventRepository extends JpaRepository<Event, Integer>{

}
