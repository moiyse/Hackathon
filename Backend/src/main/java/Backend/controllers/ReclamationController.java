package Backend.controllers;

import Backend.DAO.entities.Equipe;
import Backend.DAO.entities.Reclamation;
import Backend.services.interfaces.IReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
public class ReclamationController {

    @Autowired
    IReclamationService IReclamation;

    @GetMapping("/reclamation/Get")
    public List<Reclamation> GetAll() {
        return IReclamation.getAll();
    }

    @GetMapping("/reclamation/Get/{id}")
    public Reclamation Get(@PathVariable Integer id) {
        return IReclamation.getReclamationById(id);
    }

    @PostMapping("/oauth/reclamation/Post")
    public Reclamation Post(@RequestBody Reclamation r) {
        return IReclamation.addReclamation(r);
    }

    @PutMapping("/reclamation/Update")
    public Reclamation Update(@RequestBody Reclamation r) {
        return IReclamation.updateReclamation(r);
    }

    @DeleteMapping("/reclamation/Delete/{id}")
    public void Delete(@PathVariable Integer id) {
        IReclamation.deleteReclamation(id);
    }

}
