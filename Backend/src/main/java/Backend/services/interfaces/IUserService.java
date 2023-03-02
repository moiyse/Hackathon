package Backend.services.interfaces;

import Backend.DAO.entities.User;

public interface IUserService {

    public User getUserByEmail(String Email);

}
