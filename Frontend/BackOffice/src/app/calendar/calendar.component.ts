import { Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EventsService } from "../Core/Services/events.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { format } from 'date-fns';

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  eventForm: FormGroup;
  action: String = "Add";

  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "title",
      center: "dayGridMonth,timelineWeek,timeGridWeek,timeGridDay,listWeek",
      end: "today prev,next",
    },
    plugins: [dayGridPlugin, listPlugin,timeGridPlugin, interactionPlugin],
    
    events: [],
    eventClick: (info) => {
      // Get the event object
      const event = info.event;
      // Populate the form fields with the event details
      this.eventForm.patchValue({
        idEvent: event.id,
        nom: event.title,
        dateDebut: format(event.start, 'yyyy-MM-dd\'T\'HH:mm'),
        dateFin: format(event.end, 'yyyy-MM-dd\'T\'HH:mm')
      });
    
      // Change the action to "update" instead of "new"
      this.action = "update";
    },
    eventDrop: (info) => {
      const event = info.event;

      this.eventForm.patchValue({
        idEvent: event.id,
        nom: event.title,
        dateDebut: format(event.start, 'yyyy-MM-dd\'T\'HH:mm'),
        dateFin: format(event.end, 'yyyy-MM-dd\'T\'HH:mm')
      });
      this.updateEvent();
    }
    
    
  };

  constructor(
    private eventsApi: EventsService
  ) {}

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      idEvent: new FormControl(""),
      nom: new FormControl("", Validators.required),
      dateDebut: new FormControl("", Validators.required),
      dateFin: new FormControl("", Validators.required),
    });
    this.getAllEvents();
  }

  initForm(){
    this.eventForm.patchValue({
      idEvent: "",
      nom: "",
      dateDebut: "",
      dateFin: ""
    });
    this.action="Add";
  }

  deleteEvent(){
    Swal.fire({
      title: 'Are you sure want to remove this Event?',
      text: 'You will not be able to recover this Event!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor:'red',
    }).then(async (result) => {
      if (result.value) {
        //delete Event confirmation
        await this.deleteFunction();
        Swal.fire(
          'Deleted!',
          'Your Event has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Event is safe :)',
          'error'
        )
      }
    })

  }

  onSubmit() {
    if (this.action == "new") {
      this.addNewEvent();
    } else if (this.action == "update") {
      this.updateEvent();
    }
  }

  async alertAddWithSuccess() {
    const msg = await Swal.fire(
      "DONE",
      "Your Event added successfully!",
      "success"
    );
  }

  async alertUpdatetWithSuccess() {
    const msg = await Swal.fire(
      "DONE",
      "Your Event updated successfully!",
      "success"
    );
  }

  addNewEvent(){
    this.eventsApi.addEvent(this.eventForm.value).subscribe(
      (res) => {
        //get all events from database and assign them to calender events list
        this.getAllEvents();
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await this.alertAddWithSuccess();
      }
    );
  }

  updateEvent(){
    this.eventsApi.updateEvent(this.eventForm.value).subscribe(
      (res) => {
        this.getAllEvents();
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await this.alertUpdatetWithSuccess();
      }
    );
  }

  async deleteFunction(){
    this.eventsApi.deleteEvent(this.eventForm.value.idEvent).subscribe(
      res=>{
      this.getAllEvents();
    },error=>{
      console.log(error);
    },()=>{
      this.initForm();
    }
    )
  }

  getAllEvents() {
    this.eventsApi.getAllEvents().subscribe(
      (res) => {
        this.calendarOptions.events = res.map((event) => {
          return {
            id: event.idEvent.toString(),
            title: event.nom,
            start: new Date(event.dateDebut),
            end: new Date(event.dateFin),
            editable: true,
            droppable: true,
            isEndResizable: true,
            isStartResizable: true,
          };
        });
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
}


