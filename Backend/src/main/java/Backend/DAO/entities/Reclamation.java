package Backend.DAO.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Reclamation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idReclamation")
    private int idReclamtion;
    private String name;
    private String adresseSender;
    private String message;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date sentdAt;

    @PrePersist
    protected void onCreate() {
        sentdAt = new Date();
    }


}
