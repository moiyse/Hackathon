package Backend.services.interfaces;


public interface IReservationService {


    public String addReservation(int idWorkshop, int idUser);

    public Boolean deleteReservationById(int id);



}
