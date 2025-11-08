import { initFederation } from '@angular-architects/native-federation';
import { environment } from './environments/environment';

console.log(environment);

initFederation(environment.federationRemotes)
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
