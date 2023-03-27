package Backend.controllers;


import Backend.DAO.entities.Je;
import Backend.services.interfaces.IJeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class JeController {

    @Autowired
    IJeService jeService;

    @GetMapping("/oauth/je/getAllJe")
    public List<Je> getAllJe(){
        return jeService.getAllJe();
    }
}
