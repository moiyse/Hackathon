package Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.services.interfaces.IWorkshopService;

@RestController
@RequestMapping("/workshops")
public class workshopsController {

	@Autowired(required=false)
	IWorkshopService IWorkshop;
	
	
	
}
