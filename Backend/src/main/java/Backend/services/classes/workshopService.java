package Backend.services.classes;

import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.workshopRepository;
import Backend.services.interfaces.IWorkshopService;

public class workshopService implements IWorkshopService{

	@Autowired
	workshopRepository workshopRep;
	
}
