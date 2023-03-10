package Backend.services.interfaces;

import Backend.DAO.entities.Reservation;

public interface IReservationService {


    public Reservation addReservation(int idWorkshop, int idUser);

    public Boolean deleteReservationById(int id);



}
