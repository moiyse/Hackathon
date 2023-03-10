package Backend.DAO.Repositories;

import Backend.DAO.entities.Hackathon;
import Backend.DAO.entities.Invitation;
import Backend.DAO.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Integer> {

    @Query("Select i from Invitation i where i.sender=:user")
    public List<Invitation> getInvitationsSentByUser(@Param("user") User user);


}