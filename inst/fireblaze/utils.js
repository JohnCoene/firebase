function signinOpts(opts){
  var signin = [];

  if(opts.google)
    signin.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);

  if(opts.facebook)
    signin.push(firebase.auth.FacebookAuthProvider.PROVIDER_ID);

  if(opts.twitter)
    signin.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);

  if(opts.github)
    signin.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);

  if(opts.email)
    signin.push(firebase.auth.EmailAuthProvider.PROVIDER_ID);

  if(opts.phone)
    signin.push(firebase.auth.PhoneAuthProvider.PROVIDER_ID);

  if(opts.anonymous)
    signin.push(firebase.auth.AnonymousAuthProvider.PROVIDER_ID);

  return(signin)

}

function accountHelper(x){
  if(x == false)
    return(firebaseui.auth.CredentialHelper.NONE)
  else
    return(firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM) 
}