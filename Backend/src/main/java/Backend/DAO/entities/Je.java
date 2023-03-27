package Backend.DAO.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

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

    @OneToMany(mappedBy="je")
    private List<User> users;
}
