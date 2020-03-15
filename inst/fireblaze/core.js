Shiny.addCustomMessageHandler('fireblaze-initialize', function(config) {
  firebase.initializeApp(config);
  console.log("fireblaze initialised");
});
