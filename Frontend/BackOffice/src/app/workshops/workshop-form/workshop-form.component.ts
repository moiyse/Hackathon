import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopsService } from '../../Core/Services/workshops.service';
import { Workshop } from '../../Core/Models/Workshop';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { WorkshopThematic } from '../../Core/Models/WorkshopThematic';
import { WorkshopThematicsService } from '../../Core/Services/workshopThematic.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-workshop-form',
  templateUrl: './workshop-form.component.html',
  styleUrls: ['./workshop-form.component.scss']
})
export class WorkshopFormComponent implements OnInit {

  id:number;
  workshop: Workshop= new Workshop();
  workshopForm:FormGroup;
  action:string;
  public editor= ClassicEditor;
  workshopThematics : WorkshopThematic[]= [];

  constructor(private workshopsApi:WorkshopsService, private WorkshopThematicApi:WorkshopThematicsService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    
    //initialise Workshop Form
    this.workshopForm=new FormGroup({
      idWorkshop: new FormControl(''),
      nom: new FormControl('',Validators.required),
      description: new FormControl(''),
      dateDebut: new FormControl('',Validators.required),
      dateFin: new FormControl('',Validators.required),
      nbrMaxParticipants:new FormControl('',Validators.required),
      thematic: new FormGroup({
        idWorkshopThematic: new FormControl(''),
        nom: new FormControl('')
      })
    })

    //get all workshop thematics 
    this.WorkshopThematicApi.getAllWorkshopThematics().subscribe(res=>{
      this.workshopThematics=res;
    })
    
    this.route.params.subscribe(
      (params)=>{
        this.id=params['id'];
        if(this.id!=null){
          this.action="update";
          this.workshopsApi.getWorkshop(this.id).subscribe(res=>{
            this.workshop=res;

            this.workshopForm.setValue({
              idWorkshop: this.workshop.idWorkshop,
              nom: this.workshop.nom,
              description: this.workshop.description,
              dateDebut: this.workshop.dateDebut,
              dateFin: this.workshop.dateFin,
              nbrMaxParticipants: this.workshop.nbrMaxParticipants,
              thematic: {
                idWorkshopThematic: this.workshop.thematic.idWorkshopThematic,
                nom: this.workshop.thematic.nom
              }
            });
            
            
          },
          ()=>{console.log('error')},
          ()=>{}
          )
        }else{
          this.action="new";
          this.workshop=new Workshop();
        }
      },
      ()=>{console.log('error')},
      ()=>{}
    )
  }

  onSubmit(){
    console.log(this.workshopForm.value);
    if(this.action=='new'){
        this.workshopsApi.addWorkshop(this.workshopForm.value).subscribe(res=>{
        },
        error=>{console.log(error)},
        async ()=>{
          await this.alertAddWithSuccess();
          this.router.navigate(["workshops"]);
        }
        )
  }else if (this.action=='update') {
    this.workshopsApi.updateWorkshop(this.workshopForm.value).subscribe(res=>{
    },
    error=>{console.log(error)},
    async ()=>{
      await this.alerUpdatetWithSuccess();
      this.router.navigate(["workshops"]);
    }
    )
  } 
}

  async alertAddWithSuccess(){
    const msg=await Swal.fire('DONE', 'Your workshop added successfully!', 'success');
  }

  async alerUpdatetWithSuccess(){
    const msg=await Swal.fire('DONE', 'Your workshop updated successfully!', 'success');
  }

}
