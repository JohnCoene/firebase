import 'shiny';
import { handleCore } from './core.js';
import { handleEmailLink } from './components/email-link.js';
import { handleEmailPassword } from './components/email-password.js'
import { handlePhone } from './components/phone.js';
import { handleSocial } from './components/social.js';

let auth = handleCore();
handlePhone(auth);
handleSocial(auth);
handleEmailLink(auth);
handleEmailPassword(auth);
