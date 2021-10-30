// Convert persistence option to firebase
function persistenceOpts(p){
  if(p == "session") 
    return firebase.auth.Auth.Persistence.SESSION;

  if(p == "none") 
    return firebase.auth.Auth.Persistence.NONE;

  if(p == "local") 
    return firebase.auth.Auth.Persistence.LOCAL;
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


// toggle elements 
function showHideOnLogout(method){
  var els = document.getElementsByClassName('fireblaze__requires__signout');

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