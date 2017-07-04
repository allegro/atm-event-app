// @flow
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'moment/locale/pl';
import router from './router';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
