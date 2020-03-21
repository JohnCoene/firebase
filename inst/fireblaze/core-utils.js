// Convert persistence option to firebase
function persistenceOpts(p){
  var opt;

  if(p == "session") opt = firebase.auth.Auth.Persistence.SESSION;
  if(p == "none") opt = firebase.auth.Auth.Persistence.NONE;
  if(p == "local") opt = firebase.auth.Auth.Persistence.LOCAL;

  return opt;

}

// toggle elements 
function showHideOnLogin(method){
  var els = document.getElementsByClassName('fireblaze__requires__signin');

  for(var i = 0; i < els.length; i++){
    if(method == "hide") {
      els[i].classList.remove('fireblaze__hidden');
      $(els[i]).hide();
    } else if(method == "show") {
      els[i].classList.remove('fireblaze__hidden');
      $(els[i]).show();
    }
  }
}