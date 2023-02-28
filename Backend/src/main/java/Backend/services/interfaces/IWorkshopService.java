package Backend.services.interfaces;

import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;

import java.util.List;

public interface IWorkshopService {


    public List<Workshop> listReservedWorkshops(int idUser);

    public List<Workshop> listWorkshops();

}
