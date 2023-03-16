package Backend.controllers;

import Backend.DAO.entities.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import Backend.services.interfaces.IReservationService;





@RestController
@RequestMapping("oauth/Reservations")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class ReservationsController {

	@Autowired(required=false)
	IReservationService IReservation;

	@PostMapping("/addReservation/{idWorkshop}/{idUser}")
	public ResponseEntity<String> addReservation(@PathVariable("idWorkshop") int idWorkshop, @PathVariable("idUser") int idUserser){
		String response= IReservation.addReservation(idWorkshop,idUserser);
	    ObjectMapper objectMapper = new ObjectMapper();
		try {
			String json = objectMapper.writeValueAsString(response);
			return ResponseEntity.ok(json);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@DeleteMapping("/deleteReservation/{id}")
	public Boolean deleteReservationById(@PathVariable("id") int id){
		return IReservation.deleteReservationById(id);
	}


	
	
}
