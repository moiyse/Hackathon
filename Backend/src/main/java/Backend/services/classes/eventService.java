package Backend.services.classes;

import java.util.List;
import javax.transaction.Transactional;
import Backend.DAO.entities.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Backend.DAO.Repositories.eventRepository;
import Backend.services.interfaces.IEventService;


@Service
@Transactional
public class eventService implements IEventService{

	@Autowired
	eventRepository eventRep;

	@Override
	public List<Event> getAll() {
		return eventRep.findAll();
	}

	@Override
	public Event getEventById(Integer id) {
		return eventRep.findById(id).get();
	}

	@Override
	public Event addEvent(Event e) {
		return eventRep.save(e);
	}

	@Override
	public Event updateEvent(Event e) {
		return eventRep.save(e);
	}

	@Override
	public void deleteEvent(Integer id) {
		eventRep.deleteById(id);
	}

}



