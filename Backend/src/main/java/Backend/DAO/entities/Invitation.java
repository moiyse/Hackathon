package Backend.DAO.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Invitation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idInvitation")
    private int idInvitation;
    @Enumerated(EnumType.STRING)
    private InvitationStatus status = InvitationStatus.PENDING;
    @Temporal (TemporalType.DATE)
    private Date dateEnvoi;


    @ManyToOne
    private User sender;

    @JsonIgnore
    @ManyToOne
    private User receiver;



    @ManyToOne
    private Equipe equipe;
}
