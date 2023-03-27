package Backend.services.interfaces;

import Backend.DAO.entities.Event;

import java.util.List;

public interface IEventService {
	public List<Event> getAll();
	public Event getEventById(Integer id);
	public Event addEvent(Event e);
	public Event updateEvent(Event e);
	public void deleteEvent(Integer id);
}
