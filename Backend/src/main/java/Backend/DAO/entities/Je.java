package Backend.DAO.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Je {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idJe")
    private int idJe;

    private String nom;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;
}
