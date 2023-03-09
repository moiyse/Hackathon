package Backend.services.interfaces;

import java.util.List;

import Backend.DAO.entities.Hackathon;

public interface IHackathonService {

	public List<Hackathon> getAll();
	public Hackathon getHackathonById(Integer id);
	public Hackathon addHackathon(Hackathon e);
	public Hackathon updateHackathon(Hackathon e);
	public void deleteHackathon(Integer id);
}
