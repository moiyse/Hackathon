package Backend.services.classes;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;


import Backend.DAO.Repositories.InvitationRepository;
import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.Invitation;
import Backend.DAO.entities.InvitationStatus;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IEquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.userRepository;
import Backend.DAO.Repositories.equipeRepository;
import Backend.services.interfaces.IUserService;

import java.util.Optional;


@Service
@Transactional
public class userService implements IUserService{

	@Autowired
	userRepository userRep;

	@Autowired
	equipeRepository equipeRep;

	@Autowired
	InvitationRepository invitationRep;

	@Autowired
	IEquipeService IEquipe;

	public User getUserByEmail(String email){
		Optional<User> user = userRep.getByEmail(email);
		System.out.println("user before the consdition : "+user);
		if(user.isPresent())
		{
			System.out.println("user by email : "+user.get());
			return user.get();
		}
		else
		return null;
	}

	@Override
	public User getReceiverOfInvitation(int idInvitation) {
		Optional<Invitation> invitation = invitationRep.findById(idInvitation);
		if(invitation != null && invitation.get().getReceiver() != null){
			Optional<User> receiver = userRep.findById(invitation.get().getReceiver().getIdUser());
			if(receiver!=null){
				return receiver.get();
			}
			return null;
		}
		return null;
	}


	@Override
	public void affectUserToTeamOnInvivationAcceptation(User user, int id_equipe) {
		Optional<Equipe> equipe = equipeRep.findById(id_equipe);
		Optional<User> userObject = userRep.findById(user.getIdUser());
		if (equipe != null && userObject != null) {
			userObject.get().setEquipe(equipe.get());
			userRep.save(userObject.get());
		}else
			System.out.println("Error of null pointer excepetion in affectUserToTeamOnInvivationAcceptation methode");
	}

	@Override
	public List<User> getMembersOfEquipe(int idEquipe) {
		Optional<Equipe> equipeObject = equipeRep.findById(idEquipe);
		if(equipeObject != null){
			System.out.println("members of equipe : "+userRep.getByEquipe(equipeObject.get()));
			return userRep.getByEquipe(equipeObject.get());
		}else
			return null;
	}

	@Override
	public User getLeaderOfEquipe(int idEquipe) {
		Optional<Equipe> equipeObject = equipeRep.findById(idEquipe);
		if(equipeObject != null){
			return equipeObject.get().getLeader();
		}
		return null;
	}

	@Override
	public Boolean leaveTeam(User user) {
		Optional<User> userObject = userRep.findById(user.getIdUser());
		if(userObject != null)
		{
			// Setting invitations that are accepted to LEFTTEAM
			List<Invitation> invitationsReceived = new ArrayList<Invitation>();
			List<Invitation> invitations = invitationRep.findAll();
			invitations.forEach(invitation -> {
				if(invitation.getStatus().equals(InvitationStatus.ACCEPTED))
				{
					userObject.get().getInvitationsReceived().forEach(invitationReceivedIteration -> {
						if(invitation.getIdInvitation() == invitationReceivedIteration.getIdInvitation() && invitation.getStatus().equals(InvitationStatus.ACCEPTED))
						{
							invitation.setStatus(InvitationStatus.LEFTTEAM);
							invitationRep.save(invitation);
						}
					});
				}
			});
			////////////////////////////////////////////////////////////
			userObject.get().setEquipe(null);
			userRep.save(userObject.get());
			return true;
		}
		return false;
	}

	@Override
	public Integer checkSateOfUser(User user,Integer idEquipe) {
		System.out.println("user id received is : "+user+" equipe id received is : "+idEquipe);
		Optional<User> userObject = userRep.findById(user.getIdUser());
		Optional<Equipe> equipeObject = equipeRep.findById(idEquipe);
		if(userObject.isPresent() && equipeObject.isPresent())
		{
			Boolean equipeByLeader = IEquipe.getEquipeByLeader(userObject.get());
			if(equipeObject.get() != null && equipeByLeader == true)
				return 0;
			else if (equipeObject.get() != null && equipeByLeader == false)
				return 1;
			else if (equipeObject.get() == null && equipeByLeader == false)
				return 2;
			else
				return 3;
		}
		System.out.println("not in the condition !!!!!! ");
		return null;
	}


	@Override
	public List<User> getAll() {
		return userRep.findAll();
	}

	@Override
	public User getUserById(int id) {
		return userRep.findById(id).get();
	}

	@Override
	public User addUser(User e) {
		return userRep.save(e);
	}

	@Override
	public User updateUser(User e) {
		return userRep.save(e);
	}

	@Override
	public void deleteUser(int id) {
		userRep.deleteById(id);
		
	}
}
