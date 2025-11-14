import { initFederation } from 'shared/helpers';
import { environment } from './environments/environment';

console.log(environment);

initFederation('federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
