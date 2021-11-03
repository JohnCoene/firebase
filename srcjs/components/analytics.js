import 'shiny'
import { getAnalytics, logEvent, setUserProperties} from 'firebase/analytics';

let analytics;

const handleAnalytics = () => {
	Shiny.addCustomMessageHandler('fireblaze-initialize-analytics', (msg) => {
		if(!analytics)	
			analytics = getAnalytics();
	});
	
	Shiny.addCustomMessageHandler('fireblaze-log-event', (msg) => {
		if(!msg.params){
			logEvent(analytics, msg.event);
			return;
		}

		logEvent(analytics, msg.event, msg.params);
	});
	
	Shiny.addCustomMessageHandler('fireblaze-set-user-properties', (msg) => {
		setUserProperties(analytics, msg.props);
	});
}

export {
	handleAnalytics
}
