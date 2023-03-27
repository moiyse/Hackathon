package Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.DAO.entities.Event;
import Backend.services.interfaces.IEventService;

@RestController
@RequestMapping("oauth/events")
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201", "http://localhost:3000"})
public class eventsController {

	@Autowired(required=false)
	IEventService IEvent;
	
	
	@GetMapping("/Get")
	public List<Event> GetAll() {
		return IEvent.getAll();
	}

	@GetMapping("/Get/{id}")
	public Event Get(@PathVariable Integer id) {
		return IEvent.getEventById(id);
	}

	@PostMapping("/Post")
	public Event Post(@RequestBody Event e) {
		return IEvent.addEvent(e);
	}

	@PutMapping("/Update")
	public Event Update(@RequestBody Event e) {
		return IEvent.updateEvent(e);
	}

	@DeleteMapping("/Delete/{id}")
	public void Delete(@PathVariable Integer id) {
		IEvent.deleteEvent(id);
		
	}
	
}
