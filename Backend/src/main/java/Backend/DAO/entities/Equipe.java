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
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at", nullable = false)
	private Date updatedAt;
	
	
	@JsonIgnore
	@ManyToOne
	Hackathon hackathon;
	
	@OneToMany(mappedBy = "equipe")
	private List<User> membres;
	
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
