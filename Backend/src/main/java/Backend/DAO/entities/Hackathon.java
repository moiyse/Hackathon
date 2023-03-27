package Backend.DAO.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class Hackathon implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="idHackathon")
	private int idHackathon;
	private String nom;
	@Lob
	private String description;
	private int nbrMaxEquipe;
	//@Temporal (TemporalType.DATE)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime dateDebut;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime dateFin;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime deadline;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at" , updatable = false)
	private Date createdAt;
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
//	private LocalDateTime dateCreation;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Date updatedAt;

	
	@JsonIgnore
	@OneToMany(mappedBy = "hackathon")
	private List<Equipe> equipes;

	@JsonIgnore
	@OneToMany(mappedBy = "hackathon")
	private List<Event> events;
	
	@ManyToOne
	private hackathonThematic thematic;
	

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
