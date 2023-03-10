package Backend.services.classes;

import Backend.DAO.Repositories.JeRepository;
import Backend.DAO.entities.Je;
import Backend.services.interfaces.IJeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class jeService implements IJeService {

    @Autowired
    JeRepository jeRepository;

    @Override
    public List<Je> getAllJe(){
        return jeRepository.findAll();
    }
}
