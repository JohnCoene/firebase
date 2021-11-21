import 'shiny';
import {
  browserSessionPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  getAuth,
} from 'firebase/auth';

// Convert persistence option to firebase
const persistenceOpts = (p) => {
  if(p == "none") 
    return ;

  if(p == "memory") 
    return inMemoryPersistence;

  if(p == "session") 
    return browserSessionPersistence

  return browserLocalPersistence;
}

// toggle elements 
const showHideOnLogin = (method) => {
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
const showHideOnLogout = (method) => {
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

let prefix = 'fireblaze';
const setInputValue = (type, data, ns) => {
  if(!ns)
    ns = window.globalNs;

  Shiny.setInputValue(
    `${ns}${prefix}_${type}`,
    data
  );
}

const setInputValue2 = (type, data, ns) => {
  if(!ns)
    ns = window.globalNs;

  Shiny.setInputValue(
    `${ns}${type}`,
    data
  );
}

const setLanguageCode = (code) => {
  if(!code)
    return;
  
  const auth = getAuth();

  if(code == 'browser'){
    auth.languageCode = auth.useDeviceLanguage();
    return ;
  }

  auth.languageCode = code;
}

export {
	persistenceOpts,
	showHideOnLogin,
	showHideOnLogout,
  setInputValue,
  setInputValue2,
  setLanguageCode,
}