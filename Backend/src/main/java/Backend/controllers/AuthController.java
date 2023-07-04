package Backend.controllers;

import Backend.DAO.Repositories.JeRepository;
import Backend.DAO.entities.Je;
import Backend.DAO.entities.Role;
import Backend.DAO.entities.User;
import Backend.payload.request.LoginRequest;
import Backend.payload.request.SignupRequest;
import Backend.payload.response.JwtResponse;
import Backend.payload.response.MessageResponse;
import Backend.security.jwt.JwtUtils;
import Backend.security.services.UserDetailsImpl;
import Backend.services.classes.Utility.SiteURL;
import Backend.services.interfaces.IUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import Backend.DAO.Repositories.userRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:4200" , "http://localhost:4201"})
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

    @Autowired
    IUserService userService;

    @Autowired
    SiteURL siteURLService;


    @Autowired
    private JavaMailSender mailSender;


    @PostMapping("/oauth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        System.out.println("Credentials : "+loginRequest.getEmail()+loginRequest.getPassword());
        if(userRep.getUsersByEmailNotValid(loginRequest.getEmail()).size() != 0)
        {
            return ResponseEntity.ok(new MessageResponse("User exists but not valid"));
        }
        else if(userRep.getUsersByEmailValid(loginRequest.getEmail()).size() != 0)
        {
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
        else
        {
            return ResponseEntity.ok(new MessageResponse("User does not exist"));
        }

    }


    @PostMapping("/oauth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws MessagingException, UnsupportedEncodingException {
        Je je =null;
        System.out.println("the result signup: "+signUpRequest);
        if (userRep.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .status(440)
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Date dateInscrit = new Date();
        if(signUpRequest.getIdJe() > 0) {
            Optional<Je> jeObject = jeRepository.findById(signUpRequest.getIdJe());
            if(jeObject != null) {
                je = jeObject.get();
            }
        }
        signUpRequest.setRole(Role.ADHERENT);


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
                je);


        //for mail verification
        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);
        ///////////


        userRep.save(user);

        //mail verification
        userService.sendVerificationEmail(user, signUpRequest.getDomain());

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));


    }

    @GetMapping("/oauth/verify/{code}")
    public ResponseEntity<?> verifyUser(@PathVariable("code") String code) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (userService.verify(code).equals("account validated successfully")) {
                System.out.println("code verified : "+code);
                String json = objectMapper.writeValueAsString("verify_success");
                System.out.println("json : "+json);

                return ResponseEntity.ok(json);
            }
            else if(userService.verify(code).equals("account already valid")){
                System.out.println("code verified : "+code);
                String json = objectMapper.writeValueAsString("account_already_valid");
                System.out.println("json : "+json);

                return ResponseEntity.ok(json);
            }
            else if(userService.verify(code).equals("email is already valid")){
                System.out.println("code verified : "+code);
                String json = objectMapper.writeValueAsString("email_is_already_valid");
                System.out.println("json : "+json);

                return ResponseEntity.ok(json);
            }
            else if(userService.verify(code).equals("user not found")){
                System.out.println("code failed : "+code);
                String json = objectMapper.writeValueAsString("user_not_found");
                System.out.println("json : "+json);
                return ResponseEntity.ok(json);
            }
            else {
                System.out.println("code failed : "+code);
                String json = objectMapper.writeValueAsString("something_went_wrong");
                System.out.println("json : "+json);
                return ResponseEntity.ok(json);
            }
        } catch (Exception e) {
            System.out.println("exception : "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/oauth/sendVerificationLink")
    public void sendVerificationLink(@RequestBody Map<String,Object> body) throws MessagingException, UnsupportedEncodingException {
        Map<String, String> userMap = (Map<String, String>) body.get("user");
        String email = userMap.get("email");
        String domain = (String) body.get("domain");

        Optional<User> userObject =userRep.findByEmail(email);
        if(userObject.isPresent())
        {
            userService.sendVerificationEmail(userObject.get(),domain);
        }
    }


    @GetMapping("/checkToken")
    public String checkCredentials(){
        System.out.println("token check !!!!");
        return "Token is valid !";
    }

    @PostMapping("/oauth/forgot_password/{email}")
    public ResponseEntity<?> processForgotPassword(@PathVariable("email") String email, @RequestBody Map<String, Object> body) {
        Object domain = body.get("domain");
        System.out.println("domain : "+domain);
        String token = RandomString.make(30);
        Optional<User> userObject = userRep.findByEmail(email);
        if(userObject.isPresent())
        {
            try {
                userService.updateResetPasswordToken(token, email);
                String resetPasswordLink = domain + "/auth/resetPassword?token=" + token;
                sendEmail(email, resetPasswordLink);

            } catch (UnsupportedEncodingException | MessagingException e) {
                return ResponseEntity.status(501).body("error while sending the email");
            } catch (Exception e) {
                return ResponseEntity.status(400).body(""+e);
            }
            return ResponseEntity.ok(new MessageResponse("email sent succefully"));
        }else
            return ResponseEntity.ok(new MessageResponse("User not found"));

    }

    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("INCEPTECH@support.com", "INCEPTECH Support");
        helper.setTo(recipientEmail);

        String subject = "Here's the link to reset your password";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);

    }

    @PostMapping("/oauth/reset_password")
    public ResponseEntity<?> processResetPassword(@RequestBody Map<String,String> body) {
        System.out.println("reset_password body : "+body);
        String token = body.get("token");
        String password = body.get("password");
        System.out.println("token : "+token);
        System.out.println("password : "+password
        );

        Optional<User> userObject = userService.getByResetPasswordToken(token);
        if (userObject.isEmpty()) {
            return ResponseEntity.ok(new MessageResponse("invalid token !"));
        } else {
            userService.updatePassword(userObject.get(), password);
            return ResponseEntity.ok(new MessageResponse("password changed successfully"));
        }
    }

}
