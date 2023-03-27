import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/user-profile', title: 'Admin Profile',  icon:'users_single-02', class: '' },
    { path: '/users', title: 'users',  icon:'design_bullet-list-67', class: '' },
    { path: '/hackathons', title: 'Hackathons',  icon:'location_map-big', class: '' },
    { path: '/teams', title: 'Teams',  icon:'text_caps-small', class: '' },
    { path: '/workshops', title: 'Workshops',  icon:'objects_spaceship', class: '' },
    { path: '/thematics', title: 'Thematics',  icon:'text_caps-small', class: '' },    
    { path: '/calendar', title: 'Calendar',  icon:'text_caps-small', class: '' },    
    { path: '/sponsors', title: 'Sponsors',  icon:'text_caps-small', class: '' },    
    { path: '/partners', title: 'Partners',  icon:'text_caps-small', class: '' }    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
