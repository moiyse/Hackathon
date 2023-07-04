package Backend.services.interfaces;

import Backend.DAO.entities.Je;
import Backend.DAO.entities.User;

import java.util.List;

public interface IJeService {

    public List<Je> getAllJe();


    Je getJeByUser(String userEmail);
}
