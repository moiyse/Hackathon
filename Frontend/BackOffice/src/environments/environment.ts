
const teams="http://localhost:8081/Teams"
const workshops= "http://localhost:8081/Workshops"

export const environment = {
  production: false,
  endpoints:{
    teams:{
      get: teams
    }
  }
};
