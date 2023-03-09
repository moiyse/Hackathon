package Backend.services.interfaces;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;

public interface IUserService {

    public User getUserByEmail(String Email);


    public void affectUserToTeamOnInvivationAcceptation(User user, int id_equipe);

}
