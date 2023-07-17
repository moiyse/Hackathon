package Backend.services.interfaces;


import Backend.DAO.entities.Reclamation;

import java.util.List;

public interface IReclamationService {

    public List<Reclamation> getAll();
    public Reclamation getReclamationById(Integer id);
    public Reclamation addReclamation(Reclamation e);
    public Reclamation updateReclamation(Reclamation e);
    public void deleteReclamation(Integer id);

}
