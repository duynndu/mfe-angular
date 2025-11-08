import { initFederation } from '@angular-architects/native-federation';
import { environment } from './environments/environment';

console.log('Environment:', environment.buildConfig);


initFederation('federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
