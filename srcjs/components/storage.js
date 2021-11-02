import 'shiny'
import { 
	getStorage, 
	ref, 
	uploadString, 
	getDownloadURL,
	deleteObject,
	getMetadata
} from "firebase/storage";
import { setInputValue } from '../utils.js';

let storage;

export const handleStorage = (firebaseApp) => {
  storage = getStorage(firebaseApp);
	let storageRef = ref(storage);

  Shiny.addCustomMessageHandler('fireblaze-storage-ref', function(msg) {
		if(!msg.path){
			storageRef = ref(storage);
			return ;
		}

		storageRef = ref(storage, msg.path);
	});

  Shiny.addCustomMessageHandler('fireblaze-upload-file', function(msg) {
		uploadString(storageRef, msg.encoded, 'data_url')
			.then((snapshot) => {
				if(!msg.response)
					return;

				let data = {
					response: snapshot.metadata,
					success: true
				}

				setInputValue(msg.response, data, msg.ns);
			})
			.catch(error => {
				if(!msg.response)
					return;
				
				setInputValue(msg.response, {success: false, response: error}, msg.ns);
			});
	});

  Shiny.addCustomMessageHandler('fireblaze-download-file', function(msg) {
		getDownloadURL(storageRef)
			.then((url) => {
				if(!msg.response)
					return;

				let data = {
					response: url,
					success: true
				}

				setInputValue(msg.response, data, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				setInputValue(msg.response, {success: false, response: error}, msg.ns);
			});
	});

  Shiny.addCustomMessageHandler('fireblaze-delete-file', function(msg) {
		deleteObject(storageRef)
			.then(() => {
				if(!msg.response)
					return;

				setInputValue(msg.response, {success: true, response: null}, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				setInputValue(msg.response, {success: false, response: error}, msg.ns);
			});
	});
  
	Shiny.addCustomMessageHandler('fireblaze-get-metadata', function(msg) {
		getMetadata(storageRef)
			.then((metadata) => {
				if(!msg.response)
					return;

				setInputValue(msg.response, {success: true, response: metadata}, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				setInputValue(msg.response, {success: false, response: error}, msg.ns);
			});
	});
}
