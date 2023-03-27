package Backend.controllers;

import Backend.DAO.entities.Invitation;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IInvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class invitationController {

    @Autowired
    IInvitationService invitationService;

    @PostMapping("/invitation/getInvitationsSentByUser")
    public List<Invitation> getAllInvitationSentByUser(@RequestBody User user){

        return invitationService.getAllInvitationSentByUser(user);
    }

    @PostMapping("/invitation/getInvitationsReceivedByUser")
    public List<Invitation> getAllInvitationReceivedByUser(@RequestBody User user){
        //System.out.println("invitations received : " + invitationService.getAllInvitationReceivedByUser(user));
        return invitationService.getAllInvitationReceivedByUser(user);
    }

    @DeleteMapping("/invitation/deleteInvitationOnRefuse/{idInvitation}")
    public void deleteInvitationOnRefuse(@PathVariable("idInvitation") int idInvitation){
        invitationService.deleteInvitationOnRefuse(idInvitation);
    }

}
