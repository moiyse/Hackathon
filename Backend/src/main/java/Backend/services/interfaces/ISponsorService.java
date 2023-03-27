package Backend.services.interfaces;

import Backend.DAO.entities.Sponsor;

import java.util.List;

public interface ISponsorService {
	public List<Sponsor> getAll();
	public Sponsor getSponsorById(Integer id);
	public Sponsor addSponsor(Sponsor e);
	public Sponsor updateSponsor(Sponsor e);
	public void deleteSponsor(Integer id);
}
