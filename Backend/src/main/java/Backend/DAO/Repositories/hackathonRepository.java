package Backend.DAO.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Backend.DAO.entities.Hackathon;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface hackathonRepository extends JpaRepository<Hackathon, Integer>{

    @Query("SELECT h FROM Hackathon h WHERE h.dateDebut <= :currentDate AND h.dateFin >= :currentDate")
    List<Hackathon> findActiveHackathons(@Param("currentDate") LocalDateTime currentDate);

}
