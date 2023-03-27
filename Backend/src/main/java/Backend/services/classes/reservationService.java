package Backend.services.classes;

import javax.transaction.Transactional;

import Backend.DAO.Repositories.userRepository;
import Backend.DAO.entities.Reservation;
import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.reservationRepository;
import Backend.DAO.Repositories.workshopRepository;
import Backend.services.interfaces.IReservationService;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class reservationService implements IReservationService {

	@Autowired
	reservationRepository reservationRep;
	@Autowired
	workshopRepository workshopRep;
	@Autowired
	userRepository userRep;

	public String addReservation(int idWorkshop, int idUser) {
		String msg = "";
		Workshop workshop = workshopRep.findById(idWorkshop).get();
		User user = userRep.findById(idUser).get();
		List<Reservation> userReservations = reservationRep.findByUser(user);
		List<Reservation> workshopReservations= reservationRep.findByWorkshop(workshop);

		Instant instant = new Date().toInstant();
		ZoneId zoneId = ZoneId.systemDefault();
		LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zoneId);

		
		// compare date of reservation to deadline of reservation
		if (workshop.getDeadline().isBefore(localDateTime)) {
			msg = "DEADLINE_EXCEEDED";
			return msg;
		}

		// check if the user has booked the workshop before
		Reservation reservation = reservationRep.findByUserAndWorkshop(user, workshop);
		if (reservation != null) {
			msg = "ALREADY_RESERVED";
			return msg;
		}

		// check if the maximum number of participants is reached
		int workshopReservationsLength = workshopReservations.size();
		if(workshopReservationsLength==workshop.getNbrMaxParticipants()){
			msg= "MAXIMUM_REACHED";
			return msg;
		}

		// check if the workshop is nested with other workshops
//		for (int i = 0; i < userReservations.size(); i++) {
//			Reservation res = userReservations.get(i);
//			if (res.getWorkshop().getDateFin().isAfter(workshop.getDateDebut()) || res.getWorkshop().getDateDebut().isBefore(workshop.getDateFin())) {
//				msg = "NESTED_WORKSHOPS";
//				break;
//			}
//			return msg;
//		}

		// add a new workshop reservation 
		if (msg == "") {
			Reservation res = new Reservation();
			res.setWorkshop(workshop);
			res.setUser(user);
			reservationRep.save(res);
			msg = "RESERVATION_ADDED";
			return msg;
		}

		return msg;
	}

	public Boolean deleteReservationById(int id) {
		Optional<Reservation> res = reservationRep.findById(id);
		if (res != null) {
			reservationRep.delete(res.get());
			return true;
		} else
			return false;
	}

}
