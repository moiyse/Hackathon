package Backend.services.interfaces;

import java.util.List;

import Backend.DAO.entities.Reservation;

public interface IReservationService {


    public String addReservation(int idWorkshop, int idUser);

    public Boolean deleteReservationById(int id);



}
