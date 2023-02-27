package Backend.DAO.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
public class Reservation implements Serializable {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="idReservation")
	private int idReservation;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at", nullable = false)
	private Date updatedAt;

	
	@JsonIgnore
	@ManyToOne
	User user;
	
	@JsonIgnore
	@ManyToOne
	Workshop workshop;
	
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
