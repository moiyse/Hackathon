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

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="idUser")
	private int idUser;
	private String nom;
	private String prenom;
	private String num_phone;
	private String email;
	private String password;
	private String etablissement;
	private String imagePath;
	private int CIN;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", updatable = false)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Date updatedAt;

	
	@JsonIgnore
	@ManyToOne
	Equipe equipe;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Reservation> reservations;

	@JsonIgnore
	@ManyToOne
	private Je je;


	@OneToMany(cascade = CascadeType.ALL,mappedBy = "receiver")
	@JsonIgnore
	private List<Invitation> invitationsReceived;

	@OneToMany(cascade = CascadeType.ALL,mappedBy = "sender")
	@JsonIgnore
	private List<Invitation> invitationsSent;





	public User(String nom, String prenom, String email, String password, String etablissement, String imagePath, int CIN, Role role, Date createdAt, Je je) {
		this.nom = nom;
		this.prenom = prenom;
		this.email = email;
		this.password = password;
		this.etablissement = etablissement;
		this.imagePath = imagePath;
		this.CIN = CIN;
		this.role = role;
		this.createdAt = createdAt;
		this.je = je;
	}

	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
		updatedAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = new Date();
	}
}
