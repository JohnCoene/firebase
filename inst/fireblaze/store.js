let db;

Shiny.addCustomMessageHandler('firestore-init', function(msg) {
	if(x != undefined)
		db = firebase.firestore();
});
