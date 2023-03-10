
const teams="http://localhost:8081/teams/"
const workshops= "http://localhost:8081/workshops/"
const Hackathons= "http://localhost:8081/hackathons/"
const Users= "http://localhost:8081/users/"
const WorkshopThematics= "http://localhost:8081/workshopThematics/"
const HackathonThematics= "http://localhost:8081/hackathonThematics/"

export const environment = {
  production: false,
  endpoints:{
    teams:{
      GetAll: teams+"Get",
      post:teams+"Post",
      delete: teams+"Delete/",
      get: teams+"Get/",
      update: teams+"Update",
    },
    Workshops:{
      GetAll: workshops+"Get",
      post:workshops+"Post",
      delete: workshops+"Delete/",
      get: workshops+"Get/",
      update: workshops+"Update",
    },
    Hackathons:{
      GetAll: Hackathons+"Get",
      post:Hackathons+"Post",
      delete: Hackathons+"Delete/",
      get: Hackathons+"Get/",
      update: Hackathons+"Update",
    },
    Users:{
      GetAll: Users+"Get",
      post:Users+"Post",
      delete: Users+"Delete/",
      get: Users+"Get/",
      update: Users+"Update",
      login: Users+"Get",
    },
    WorkshopThematics:{
      GetAll: WorkshopThematics+"Get",
      post:WorkshopThematics+"Post",
      delete: WorkshopThematics+"Delete/",
      get: WorkshopThematics+"Get/",
      update: WorkshopThematics+"Update",
      login: WorkshopThematics+"Get",
    },
    HackathonThematics:{
      GetAll: HackathonThematics+"Get",
      post:HackathonThematics+"Post",
      delete: HackathonThematics+"Delete/",
      get: HackathonThematics+"Get/",
      update: HackathonThematics+"Update",
      login: HackathonThematics+"Get",
    }
  }
};
