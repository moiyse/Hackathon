package Backend.services.interfaces;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.User;

public interface IEquipeService {



    public Equipe getEquipeByLeader(User user);


}
