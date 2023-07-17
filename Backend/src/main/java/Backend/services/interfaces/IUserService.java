package Backend.services.interfaces;

import Backend.DAO.entities.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface IUserService {

    public User getUserByEmail(String Email);

	public User getReceiverOfInvitation(int idInvitation);

    public void affectUserToTeamOnInvivationAcceptation(User user, int id_equipe);

	public List<User> getMembersOfEquipe(int idEquipe);

	public User getLeaderOfEquipe(int idEquipe);

	public Boolean leaveTeam(User user);

	public Integer checkSateOfUser(User user,Integer idEquipe);

	public void sendVerificationEmail(User user,String domain) throws MessagingException, UnsupportedEncodingException;

	public String verify(String verificationCode);

    User updateProfile(User u);

	void updateResetPasswordToken(String token, String email) throws Exception;

	Optional<User> getByResetPasswordToken(String token);

	void updatePassword(User user, String newPassword);

    public List<User> getAll();
	public User getUserById(int id);
	public User addUser(User e);
	public User updateUser(User e);
	public void deleteUser(int id);
}
