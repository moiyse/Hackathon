package Backend.payload.request;


import Backend.DAO.entities.Je;
import Backend.DAO.entities.Role;
import lombok.ToString;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@ToString
public class SignupRequest {
    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    private String etablissement;

    
    private String imagePath;

    @Size(min = 8,max = 8)
    @NotNull
    private int CIN;


    @NotBlank
    @Size(min = 4, max = 40)
    private String password;

    @NotNull
    private Role role;

    @NotNull
    private Date dateInscription;


    private int idJe;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEtablissement() {
        return etablissement;
    }

    public String getImagePath() {
        return imagePath;
    }

    public int getCIN() {
        return CIN;
    }

    public void setEtablissement(String etablissement) {
        this.etablissement = etablissement;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setCIN(int CIN) {
        this.CIN = CIN;
    }

    public Date getDateInscription() {
        return dateInscription;
    }

    public void setDateInscription(Date dateInscription) {
        this.dateInscription = dateInscription;
    }

    public int getIdJe() {
        return idJe;
    }

    public void setIdJe(int idJe) {
        this.idJe = idJe;
    }
}
