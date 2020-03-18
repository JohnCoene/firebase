// Convert persistence option to firebase
function persistenceOpts(p){
  var opt;

  if(p == "session") opt = firebase.auth.Auth.Persistence.SESSION;
  if(p == "none") opt = firebase.auth.Auth.Persistence.NONE;
  if(p == "local") opt = firebase.auth.Auth.Persistence.LOCAL;

  return(opt)

}