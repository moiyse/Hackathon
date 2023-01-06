package Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.services.interfaces.IHackathonService;

@RestController
@RequestMapping("/hackathons")
public class hackathonsController {

	@Autowired(required=false)
	IHackathonService IHackathon;
	
}
