package Backend.services.classes;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.reservationRepository;
import Backend.services.interfaces.IReservationService;

@Service
@Transactional
public class reservationService implements IReservationService{

	@Autowired
	reservationRepository reservationRep;
	
	
}
