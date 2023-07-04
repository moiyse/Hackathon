import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { ReclamationService } from 'src/app/services/reclamation.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  contactForm : FormGroup;

  constructor(private reclamationService:ReclamationService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      message: new FormControl('', [Validators.required,Validators.minLength(10)]),
      
    });
  }


  onSubmit(){

    this.reclamationService.addReclamation(this.contactForm.value).subscribe(data => console.log("added reclamation : ",data));

    
    const emailBody = `Name: moez\nEmail: mahmoud\nMessage: this is a message`;
    const templateParams = {
      to_name: 'Moez',
      from_name: this.contactForm.value.name,
      message_html: emailBody
    };
    emailjs.send('service_gih6sen', 'template_8kzfmle', templateParams, 'JQuTbQqL7202H6DGi')
      .then(response => {
        console.log('SUCCESS!', response.status, response.text);
      }, error => {
        console.log('FAILED...', error);
      });
  }


  



  

}
