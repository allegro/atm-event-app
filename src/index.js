// @flow
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import makeMainRoutes from './routes';
import './index.css';

ReactDOM.render(makeMainRoutes(), document.getElementById('root'));
registerServiceWorker();
