package Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Backend.services.interfaces.IEquipeService;

@RestController
@RequestMapping("/equipes")
public class equipesController {

	@Autowired(required=false)
	IEquipeService IEquipe;
	
	
}
