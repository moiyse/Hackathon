package Backend.services.classes;

import java.util.List;


import javax.transaction.Transactional;
import Backend.DAO.Repositories.userRepository;
import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.DAO.Repositories.workshopRepository;
import Backend.DAO.entities.Workshop;
import Backend.services.interfaces.IWorkshopService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class workshopService implements IWorkshopService{

	@Autowired
	workshopRepository workshopRep;
	@Autowired
	userRepository userRepo;

	public List<Workshop> listReservedWorkshops(int idUser){
		List<Workshop> workshops= new ArrayList<>();
		Optional<User> user = userRepo.findById(idUser);
		if(user != null){
			user.get().getReservations().forEach(reservation -> workshops.add(reservation.getWorkshop()));
			return workshops;
		}
		else
			return null;
	}

	public List<Workshop> listWorkshops(){

		return workshopRep.findAll();
	}

	@Override
	public List<Workshop> getAll() {
		return workshopRep.findAll();
	}

	@Override
	public Workshop getWorkshopById(int id) {
		return workshopRep.findById(id).get();
	}

	@Override
	public Workshop addWorkshop(Workshop w) {
		return workshopRep.save(w);
	}

	@Override
	public Workshop updateWorkshop(Workshop w) {
		return workshopRep.save(w);
	}

	@Override
	public void deleteWorkshop(int id) {
		workshopRep.deleteById(id);
	}
	
}
