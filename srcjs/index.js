import 'shiny';
import { handleCore } from './core.js';
import { handleEmailLink } from './components/email-link.js';
import { handleEmailPassword } from './components/email-password.js'
import { handlePhone } from './components/phone.js';
import { handleSocial } from './components/social.js';
import { handleAnalytics } from './components/analytics.js';
import { handleUI } from './ui.js';

handleUI();
handleCore();
handlePhone();
handleSocial();
handleAnalytics();
handleEmailLink();
handleEmailPassword();
