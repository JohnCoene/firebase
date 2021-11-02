import 'shiny'
import { getAnalytics, logEvent } from 'firebase/analytics.js';

let analytics;

const handleAnalytics = () => {
	Shiny.addCustomMessageHandler('fireblaze-initialize-analytics', (msg) => {
		if(!analytics)	
			analytics = getAnalytics();
	});
	
	Shiny.addCustomMessageHandler('fireblaze-log-event', (msg) => {
		logEvent(analytics, msg.event);
	});
}

export {
	handleAnalytics
}
