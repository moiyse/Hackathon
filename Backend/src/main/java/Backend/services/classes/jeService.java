package Backend.services.classes;

import Backend.DAO.Repositories.JeRepository;
import Backend.DAO.Repositories.userRepository;
import Backend.DAO.entities.Je;
import Backend.DAO.entities.User;
import Backend.services.interfaces.IJeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class jeService implements IJeService {

    @Autowired
    JeRepository jeRepository;

    @Autowired
    userRepository userRep;

    @Override
    public List<Je> getAllJe(){
        return jeRepository.findAll();
    }

    @Override
    public Je getJeByUser(String userEmail) {
        Optional<User> userObject = userRep.getByEmail(userEmail);
        if(userObject.isPresent()){
            System.out.println("user : "+userObject.get());
            Optional<Je> jeObject = jeRepository.findByUser(userObject.get());
            if(jeObject.isPresent()){
                return jeObject.get();
            }
            return null;
        }
        return null;
    }
}
