package Backend.services.classes;

import Backend.DAO.Repositories.InvitationRepository;
import Backend.DAO.Repositories.userRepository;
import Backend.DAO.entities.Invitation;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IInvitationService;
import Backend.services.interfaces.IJeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class invitationService implements IInvitationService {


    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    userRepository userRep;

    @Override
    public List<Invitation> getAllInvitationSentByUser(User user) {
        return invitationRepository.getInvitationsSentByUser(user);
    }

    @Override
    public List<Invitation> getAllInvitationReceivedByUser(User user) {
        User userObject = userRep.getByEmail(user.getEmail()).get();
        List<Invitation> invitationsReceived = new ArrayList<Invitation>();
        List<Invitation> invitations = invitationRepository.findAll();
        invitations.forEach(invitation -> {
            userObject.getInvitationsReceived().forEach(invitationReceivedIteration -> {
                if(invitation.getIdInvitation() == invitationReceivedIteration.getIdInvitation())
                    invitationsReceived.add(invitation);
            });
        });
        System.out.println("result of inviations received in the getAllReceivedByUser is : "+invitationsReceived);
        return invitationsReceived;
    }


    public void deleteInvitationOnRefuse(int id_invitation){
        Optional<Invitation> invitationObject = invitationRepository.findById(id_invitation);
        if(invitationObject != null){
            invitationRepository.deleteById(invitationObject.get().getIdInvitation());
        }
        else
            System.out.println("null pointer exception in deleteInvitationOnRefuse methode");
    }




}
