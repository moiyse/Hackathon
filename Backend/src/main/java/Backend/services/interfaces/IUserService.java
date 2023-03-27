package Backend.services.interfaces;

import Backend.DAO.entities.User;

import java.util.List;

public interface IUserService {

    public User getUserByEmail(String Email);

	public User getReceiverOfInvitation(int idInvitation);

    public void affectUserToTeamOnInvivationAcceptation(User user, int id_equipe);

	public List<User> getMembersOfEquipe(int idEquipe);

	public User getLeaderOfEquipe(int idEquipe);

	public Boolean leaveTeam(User user);

	public Integer checkSateOfUser(User user,Integer idEquipe);

	public List<User> getAll();
	public User getUserById(int id);
	public User addUser(User e);
	public User updateUser(User e);
	public void deleteUser(int id);
}
