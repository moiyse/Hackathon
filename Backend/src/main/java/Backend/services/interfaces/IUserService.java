package Backend.services.interfaces;

import java.util.List;

import Backend.DAO.entities.User;

public interface IUserService {
	public List<User> getAll();
	public User getUserById(int id);
	public User addUser(User e);
	public User updateUser(User e);
	public void deleteUser(int id);
}
