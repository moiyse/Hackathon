package Backend.DAO.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
public class Equipe implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="idEquipe")
	private int idEquipe;
	private String nom;
	@Temporal (TemporalType.DATE)
	private Date dateCreation;

	@JsonIgnore
	@ManyToOne
	Hackathon hackathon;
	
	@OneToMany(mappedBy = "equipe")
	@JsonIgnore
	private List<User> membres;

	@OneToMany(cascade = CascadeType.ALL,mappedBy = "equipe")
	@JsonIgnore
	private List<Invitation> invitations;

	@OneToOne
	@JsonIgnore
	private User leader;
	
}
