package Backend.services.interfaces;

import java.util.List;

import Backend.DAO.entities.hackathonThematic;

public interface IHackathonThematicService {
	public List<hackathonThematic> getAll();
	public hackathonThematic getHackathonThematicById(int id);
	public hackathonThematic addHackathonThematic(hackathonThematic e);
	public hackathonThematic updateHackathonThematic(hackathonThematic e);
	public void deleteHackathonThematic(int id);
}
