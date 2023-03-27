package Backend.services.interfaces;

import Backend.DAO.entities.Partner;

import java.util.List;

public interface IPartnerService {
	public List<Partner> getAll();
	public Partner getPartnerById(Integer id);
	public Partner addPartner(Partner e);
	public Partner updatePartner(Partner e);
	public void deletePartner(Integer id);
}
