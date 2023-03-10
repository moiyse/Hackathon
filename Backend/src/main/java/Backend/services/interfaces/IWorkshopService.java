package Backend.services.interfaces;

import java.util.List;
import Backend.DAO.entities.Workshop;


public interface IWorkshopService {

	public List<Workshop> getAll();
	public Workshop getWorkshopById(int id);
	public Workshop addWorkshop(Workshop e);
	public Workshop updateWorkshop(Workshop e);
	public void deleteWorkshop(int id);

    public List<Workshop> listReservedWorkshops(int idUser);

    public List<Workshop> listWorkshops();

}
