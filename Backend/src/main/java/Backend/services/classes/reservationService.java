package Backend.services.classes;

import Backend.DAO.Repositories.userRepository;
import Backend.DAO.entities.Reservation;
import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;
import org.springframework.beans.factory.annotation.Autowired;

import Backend.DAO.Repositories.reservationRepository;
import Backend.DAO.Repositories.workshopRepository;
import Backend.services.interfaces.IReservationService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class reservationService implements IReservationService{

	@Autowired
	reservationRepository reservationRep;
	@Autowired
	workshopRepository  workshopRep;
	@Autowired
	userRepository userRep;



	public Reservation addReservation(int idWorkshop, int idUser){
		Optional<Workshop> workshop = workshopRep.findById(idWorkshop);
		Optional<User>	user = userRep.findById(idUser);

		if(workshop != null && user != null){
			Reservation res = new Reservation();
			Date nowDate = new Date();
			res.setDateReservation(nowDate);
			res.setWorkshop(workshop.get());
			res.setUser(user.get());
			return reservationRep.save(res);
		}
		else
		{
			return null;
		}
	}

	public Boolean deleteReservationById(int id){
		Optional<Reservation> res = reservationRep.findById(id);
		if(res !=null)
		{
			reservationRep.delete(res.get());
			return true;
		}
		else
			return false;
	}


	
	
}
