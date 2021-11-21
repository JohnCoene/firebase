import 'shiny';
import { getDatabase, ref, set, update, remove, onValue } from 'firebase/database';
import { setInputValue2 } from '../utils.js';

var db;
var storeRef;

Shiny.addCustomMessageHandler('fireblaze-real-time-init', (msg) => {
	db = getDatabase();
});

Shiny.addCustomMessageHandler('fireblaze-real-time-ref', (msg) => {
	if(!msg.path){
		storeRef = ref(db);
		return;
	}

	storeRef = ref(db, msg.path);
});

Shiny.addCustomMessageHandler('fireblaze-real-time-on-value', (msg) => {
	if(msg.path)
		storeRef = ref(db, msg.path);

	onValue(storeRef, (snapshot) => {
		if(!msg.response)
			return;

		const data = snapshot.val();

		setInputValue2(
			msg.response, 
			{
				success: false, 
				response: data
			}, 
			msg.ns
		);
	});
});

Shiny.addCustomMessageHandler('fireblaze-real-time-set', (msg) => {
	if(msg.path)
		storeRef = ref(db, msg.path);
		
	set(storeRef, msg.data)
		.then(() => {
			if(!msg.response)
				return;

			setInputValue2(
				msg.response, 
				{
					success: true,
					response: []
				}, 
				msg.ns
			);
		})
		.catch(error => {
			if(!msg.response)
				return;

			setInputValue2(
				msg.response, 
				{
					success: false,
					response: error,
				}, 
				msg.ns
			);
		})
});

Shiny.addCustomMessageHandler('fireblaze-real-time-update', (msg) => {
	if(msg.path)
		storeRef = ref(db, msg.path);

	update(storeRef, msg.data)
		.then(() => {
			if(!msg.response)
				return;

			setInputValue2(
				msg.response, 
				{
					success: true,
					response: []
				}, 
				msg.ns
			);
		})
		.catch(error => {
			if(!msg.response)
				return;

			setInputValue2(
				msg.response, 
				{
					success: false,
					response: error,
				}, 
				msg.ns
			);
		})
});

Shiny.addCustomMessageHandler('fireblaze-real-time-delete', (msg) => {
	if(msg.path)
		storeRef = ref(db, msg.path);

	remove(storeRef, msg.data)
		.then(() => {
			if(!msg.response)
				return;

			setInputValue2(
				msg.response, 
				{
					success: true,
					response: []
				}, 
				msg.ns
			);
		})
		.catch(error => {
			if(!msg.response)
				return;

			setInputValue2(
				msg.response, 
				{
					success: false,
					response: error,
				}, 
				msg.ns
			);
		})
});
