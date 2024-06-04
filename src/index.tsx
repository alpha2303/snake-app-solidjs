/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Contact Site Administrator.',
  );
}

render(() => <App />, root!);
