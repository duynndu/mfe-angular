import { initFederation } from 'shared/helpers/load-remote-module';
import { environment } from './environments/environment';

console.log(environment);

initFederation('federation.manifest.json')
  .catch((err: any) => console.error(err))
  .then((_: any) => import('./bootstrap'))
  .catch((err: any) => console.error(err));
