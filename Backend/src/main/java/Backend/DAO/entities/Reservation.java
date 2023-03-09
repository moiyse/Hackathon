package Backend.DAO.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
public class Reservation implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="idReservation")
	private int idReservation;
	@Temporal (TemporalType.DATE)
	private Date dateReservation;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	User user;

	@JsonIgnore
	@ManyToOne
	Workshop workshop;
	
}
