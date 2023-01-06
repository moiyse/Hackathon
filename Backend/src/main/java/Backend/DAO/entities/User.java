package Backend.DAO.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
public class User implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="idUser")
	private int idUser;
	private String nom;
	private String prenom;
	private String email;
	private String password;
	private String etablissement;
	private String imagePath;
	private int CIN;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Temporal (TemporalType.DATE)
	private Date dateInscription;
	
	@ManyToOne
	Equipe equipe;
	
	@OneToMany(mappedBy = "user")
	private List<Reservation> reservations;
}
