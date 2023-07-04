package Backend.services.classes;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;


import Backend.DAO.Repositories.InvitationRepository;
import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.Invitation;
import Backend.DAO.entities.InvitationStatus;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IEquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	PasswordEncoder encoder;

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
			if(!invitations.isEmpty())
			{
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
			}

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

	//mail verfication
	@Override
	public void sendVerificationEmail(User user,String domain) throws MessagingException, UnsupportedEncodingException {
		String toAddress = user.getEmail();
		String fromAddress = "moezmahmoud82@gmail.com";
		String senderName = "INCEPTECH";
		String subject = "Please verify your registration";
		String content = "Dear [[name]],<br>"
				+ "Please click the link below to verify your registration:<br>"
				+ "<h3><a href=\"[[URL]]\" target=\"_self\">Click this link to verify you account</a></h3>"
				+ "Thank you,<br>"
				+ "INCEPTECH.";

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setFrom(fromAddress, senderName);
		helper.setTo(toAddress);
		helper.setSubject(subject);

		content = content.replace("[[name]]", user.getPrenom()+" "+user.getNom());
		String verifyURL = domain + "/auth/emailValidation/" + user.getVerificationCode();

		content = content.replace("[[URL]]", verifyURL);

		helper.setText(content, true);

		mailSender.send(message);
	}

	@Override
	public String verify(String verificationCode) {
		Optional<User> user = userRep.findByVerificationCode(verificationCode);
		if(user.isPresent())
		{
			List<User> userValid = userRep.getUsersByEmailValid(user.get().getEmail());
			if(user.get().isEnabled())
			{
				return "account already valid";
			}
			else if(!userValid.isEmpty())
			{
				return "email is already valid";
			}
			else {
				user.get().setVerificationCode(null);
				user.get().setEnabled(true);
				userRep.save(user.get());
				List<User> usersNotValid = userRep.getUsersByEmailNotValid(user.get().getEmail());
				if(!usersNotValid.isEmpty())
				{
					usersNotValid.forEach(userNotValid-> {
						userRep.delete(userNotValid);
					});
				}
				return "account validated successfully";
			}
		}
		else {
			return "user not found";
		}


	}


	@Override
	public User updateProfile(User u) {
		Optional<User> userObject = userRep.findById(u.getIdUser());
		if(userObject.isPresent()){
			userObject.get().setNom(u.getNom());
			userObject.get().setPrenom(u.getPrenom());
			userObject.get().setCIN(u.getCIN());
			userObject.get().setEtablissement(u.getEtablissement());
			userObject.get().setJe(u.getJe());
			return userRep.save(userObject.get());
		}
		return null;
	}

	@Override
	public void updateResetPasswordToken(String token, String email) throws Exception {
		Optional<User> user = userRep.findByEmail(email);
		if (user.isPresent()) {
			user.get().setResetPasswordToken(token);
			userRep.save(user.get());
		} else {
			throw new Exception("Could not find any customer with the email " + email);
		}
	}

	@Override
	public Optional<User> getByResetPasswordToken(String token) {
		return userRep.findByResetPasswordToken(token);
	}

	@Override
	public void updatePassword(User user, String newPassword) {
		String encodedPassword = encoder.encode(newPassword);
		user.setPassword(encodedPassword);

		user.setResetPasswordToken(null);
		userRep.save(user);
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
