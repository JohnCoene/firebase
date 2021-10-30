import 'shiny';
import {
  TwitterAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  PhoneAuthProvider,
  browserSessionPersistence,
  browserLocalPersistence,
  inMemoryPersistence
} from 'firebase/auth';
import { globalNs } from "./core";

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
    ns = globalNs;

  Shiny.setInputValue(
    `${ns}${prefix}_${type}`,
    data
  );
}

// Convert sign in boolean from R to firebase strings
const signinOpts = (opts) => {
  var signin = [];

  if(opts.microsoft)
    signin.push("microsoft.com");

  if(opts.yahoo)
    signin.push("yahoo.com");

  if(opts.apple)
    signin.push("apple.com");

  if(opts.google)
    signin.push(GoogleAuthProvider.PROVIDER_ID);

  if(opts.facebook)
    signin.push(FacebookAuthProvider.PROVIDER_ID);

  if(opts.twitter)
    signin.push(TwitterAuthProvider.PROVIDER_ID);

  if(opts.github)
    signin.push(GithubAuthProvider.PROVIDER_ID);

  if(opts.email)
    signin.push(EmailAuthProvider.PROVIDER_ID);

  if(opts.email_link)
    signin.push({
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    });

  if(opts.phone)
    signin.push(PhoneAuthProvider.PROVIDER_ID);

  return signin;
}

// Convert sign in boolean from R to firebase strings
const accountHelper = (auth, x) => {
  if(x == false)
    return auth.CredentialHelper.NONE;
  
  return auth.CredentialHelper.ACCOUNT_CHOOSER_COM;
}

const setLanguageCode = (auth, code) => {
  if(!code)
    return;

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
  signinOpts,
  accountHelper,
  setLanguageCode,
}