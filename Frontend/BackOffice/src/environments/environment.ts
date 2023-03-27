
const teams="http://localhost:8081/oauth/teams/"
const workshops= "http://localhost:8081/oauth/workshops/"
const Hackathons= "http://localhost:8081/oauth/hackathons/"
const Users= "http://localhost:8081/oauth/users/"
const WorkshopThematics= "http://localhost:8081/oauth/workshopThematics/"
const HackathonThematics= "http://localhost:8081/oauth/hackathonThematics/"
const Events= "http://localhost:8081/oauth/events/"
const Sponsors= "http://localhost:8081/oauth/sponsors/"
const Partners= "http://localhost:8081/oauth/partners/"

export const environment = {
  production: false,
  
  //DROPBOX TOKEN
  DROPBOX_ACCESS_TOKEN:"sl.BbYSuaxtgPEjs7-1l7qb2MXST3laoRNIdBIqVYT2SrMV5Zvcwn14XGmfYEO5HsYZn-Q5Bu8VQyxK2_mbyJQk7hMxwEtSI65tnKkGEBR88uaAu7S2yIFo4paZJ9kRUB0HDun35cI",
  
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
    },
    Events:{
      GetAll: Events+"Get",
      post:Events+"Post",
      delete: Events+"Delete/",
      get: Events+"Get/",
      update: Events+"Update"
    },
    Sponsors:{
      GetAll: Sponsors+"Get",
      post:Sponsors+"Post",
      delete: Sponsors+"Delete/",
      get: Sponsors+"Get/",
      update: Sponsors+"Update"
    },
    Partners:{
      GetAll: Partners+"Get",
      post:Partners+"Post",
      delete: Partners+"Delete/",
      get: Partners+"Get/",
      update: Partners+"Update"
    }
  }
};
