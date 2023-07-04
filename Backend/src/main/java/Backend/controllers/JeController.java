package Backend.controllers;


import Backend.DAO.entities.Je;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IJeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/je/getJeByUser/{userEmail}")
    public Je getJeByUser(@PathVariable String userEmail) { return jeService.getJeByUser(userEmail); }
}
