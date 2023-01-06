package Backend.services.classes;

import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.reservationRepository;
import Backend.services.interfaces.IReservationService;

public class reservationService implements IReservationService{

	@Autowired
	reservationRepository reservationRep;
	
	
}
