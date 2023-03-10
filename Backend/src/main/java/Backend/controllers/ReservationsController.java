package Backend.controllers;

import Backend.DAO.entities.Reservation;
import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Backend.services.interfaces.IReservationService;


import javax.websocket.server.PathParam;



@RestController
@RequestMapping("/Reservations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationsController {

	@Autowired(required=false)
	IReservationService IReservation;

	@PostMapping("/addReservation/{idWorkshop}/{idUser}")
	public Reservation addReservation(@PathVariable("idWorkshop") int idWorkshop, @PathVariable("idUser") int idUserser){
		return IReservation.addReservation(idWorkshop,idUserser);
	}

	@DeleteMapping("/deleteReservation/{id}")
	public Boolean deleteReservationById(@PathVariable("id") int id){
		return IReservation.deleteReservationById(id);
	}


	
	
}
