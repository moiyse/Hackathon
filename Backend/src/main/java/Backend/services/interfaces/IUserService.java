package Backend.services.interfaces;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;

import java.util.List;

public interface IUserService {

    public User getUserByEmail(String Email);


    public void affectUserToTeamOnInvivationAcceptation(User user, int id_equipe);
	public List<User> getAll();
	public User getUserById(int id);
	public User addUser(User e);
	public User updateUser(User e);
	public void deleteUser(int id);
}
