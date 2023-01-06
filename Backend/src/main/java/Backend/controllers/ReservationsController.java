package Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.services.interfaces.IReservationService;

@RestController
@RequestMapping("/Reservations")
public class ReservationsController {

	@Autowired(required=false)
	IReservationService IReservation;
	
	
}
