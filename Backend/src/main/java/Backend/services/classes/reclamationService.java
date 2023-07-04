package Backend.services.classes;

import Backend.DAO.Repositories.ReclamationRepository;
import Backend.DAO.entities.Reclamation;
import Backend.services.interfaces.IReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class reclamationService implements IReclamationService {

    @Autowired
    ReclamationRepository reclamationRep;

    @Override
    public List<Reclamation> getAll() {
        return reclamationRep.findAll();
    }

    @Override
    public Reclamation getReclamationById(Integer id) {
        return reclamationRep.findById(id).get();
    }

    @Override
    public Reclamation addReclamation(Reclamation e) {
        return reclamationRep.save(e);
    }

    @Override
    public Reclamation updateReclamation(Reclamation e) {
        return reclamationRep.save(e);
    }

    @Override
    public void deleteReclamation(Integer id) {
        reclamationRep.deleteById(id);
    }
}
