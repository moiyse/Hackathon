package Backend.controllers;

import Backend.DAO.Repositories.JeRepository;
import Backend.DAO.entities.Je;
import Backend.DAO.entities.User;
import Backend.payload.request.LoginRequest;
import Backend.payload.request.SignupRequest;
import Backend.payload.response.JwtResponse;
import Backend.payload.response.MessageResponse;
import Backend.security.jwt.JwtUtils;
import Backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import Backend.DAO.Repositories.userRepository;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    userRepository userRep;


    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JeRepository jeRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/oauth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        System.out.println("Credentials : "+loginRequest.getEmail()+loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        System.out.println("athenticate "+authentication.getPrincipal().toString());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        System.out.println("inside the user details"+userDetails);


        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getEmail()));
    }

    @PostMapping("/oauth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        System.out.println("the result signuup"+signUpRequest);
        if (userRep.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Date dateInscrit = new Date();
        Optional<Je> je = jeRepository.findById(signUpRequest.getIdJe());
        if(je != null){
            // Create new user's account
            User user = new User(signUpRequest.getNom(),
                    signUpRequest.getPrenom(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()),
                    signUpRequest.getEtablissement(),
                    signUpRequest.getImagePath(),
                    signUpRequest.getCIN(),
                    signUpRequest.getRole(),
                    dateInscrit,
                    je.get());


            userRep.save(user);

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

        }else
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: JE est introuvable!"));
        }

    @GetMapping("/checkToken")
    public String checkCredentials(){
        System.out.println("token check !!!!");
        return "Token is valid !";
    }


}
