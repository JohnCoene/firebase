import 'shiny'
import { getStorage, ref, uploadString } from "firebase/storage";

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
				console.log('Uploaded a base64url string!');
			})
			.catch(error => {
				console.error(error);
			});
	});
}
