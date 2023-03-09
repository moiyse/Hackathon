package Backend.services.interfaces;

import java.util.List;

import Backend.DAO.entities.workshopThematic;

public interface IWorkshopThematicService {
	public List<workshopThematic> getAll();
	public workshopThematic getWorkshopThematicById(int id);
	public workshopThematic addWorkshopThematic(workshopThematic w);
	public workshopThematic updateWorkshopThematic(workshopThematic w);
	public void deleteWorkshopThematic(int id);
}
