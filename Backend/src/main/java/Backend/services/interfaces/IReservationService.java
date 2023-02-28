package Backend.services.interfaces;

import Backend.DAO.entities.Reservation;
import Backend.DAO.entities.User;
import Backend.DAO.entities.Workshop;

import java.util.List;

public interface IReservationService {


    public Reservation addReservation(int idWorkshop, int idUser);

    public Boolean deleteReservationById(int id);



}
