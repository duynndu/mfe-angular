import { 
  initFederation as initFederationLib, 
  loadRemoteModule as loadRemoteModuleLib, 
  LoadRemoteModuleOptions
} from '@angular-architects/native-federation';


interface FederationContainer {
  init?: (shareScope: any) => Promise<void>;
  get: (module: string) => Promise<() => any>;
}

let remotesCache: { [remoteName: string]: string } = {};

// Overload signatures
export function loadRemoteModule<T = any>(config: LoadRemoteModuleOptions): Promise<T>;
export function loadRemoteModule<T = any>(remoteName: string, exposedModule: string): Promise<T>;
export function loadRemoteModule<T = any>(
  remoteNameOrConfig: string | LoadRemoteModuleOptions,
  exposedModule?: string
): Promise<T> {
  // Xử lý cả hai cách gọi
  let config: LoadRemoteModuleOptions;
  
  if (typeof remoteNameOrConfig === 'string') {
    // Cách gọi mới: loadRemoteModule(remoteName, exposedModule)
    if (!exposedModule) {
      throw new Error('exposedModule is required when using string parameters');
    }
    config = {
      remoteName: remoteNameOrConfig,
      exposedModule
    };
  } else {
    // Cách gọi cũ: loadRemoteModule({ remoteName, remoteEntry, exposedModule })
    config = remoteNameOrConfig;
  }

  return loadRemoteModuleImpl<T>(config);
}

// Implementation chính
async function loadRemoteModuleImpl<T = any>({
  remoteName,
  remoteEntry,
  exposedModule,
}: LoadRemoteModuleOptions): Promise<T> {
  // Validate input
  if (!remoteEntry && !remoteName) {
    throw new Error(
      'You must provide either remoteEntry or remoteName to load the remote module.'
    );
  }

  // Resolve URL entry
  const urlEntry = remoteEntry ?? remotesCache[remoteName!];
  
  if (!urlEntry) {
    throw new Error(
      `Unable to resolve remote module. remoteName: ${remoteName}, remoteEntry: ${remoteEntry}. Did you call initFederation first?`
    );
  }

  // Handle esbuild/webpack remotes (JSON-based)
  if (urlEntry.endsWith('remoteEntry.json')) {
    return loadRemoteModuleLib({ 
      remoteName, 
      remoteEntry: urlEntry, 
      exposedModule 
    });
  }

  // Handle Vite remotes (JS-based)
  if (urlEntry.endsWith('remoteEntry.js')) {
    try {
      const container: FederationContainer = await import(/* @vite-ignore */ urlEntry);
      
      // Initialize container if needed
      await container.init?.({});
      
      // Get exposed module factory
      const factory = await container.get(exposedModule);
      
      if (!factory) {
        throw new Error(`Exposed module '${exposedModule}' not found in remote`);
      }
      
      // Return the actual module
      return factory() as T;
    } catch (error: any) {
      throw new Error(
        `Failed to load remote module '${exposedModule}' from ${urlEntry}: ${error.message}`
      );
    }
  }

  throw new Error(`Unsupported remote entry format: ${urlEntry}`);
}
export async function initFederation(manifestUrl: string): Promise<void>;
export async function initFederation(remotes: { [remoteName: string]: string }): Promise<void>;
export async function initFederation(manifestUrlOrRemotes: string | { [remoteName: string]: string }): Promise<void> {
  if (typeof manifestUrlOrRemotes === 'string') {
    // Xử lý khi là federation.manifest.json
    await initFederationFromManifest(manifestUrlOrRemotes);
  } else {
    // Xử lý khi là object remotes (cách cũ)
    await initFederationFromRemotes(manifestUrlOrRemotes);
  }
}

async function initFederationFromManifest(manifestUrl: string): Promise<void> {
  try {
    // Tải manifest file
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const remotes = await response.json();
    
    // Validate manifest structure
    if (!remotes || typeof remotes !== 'object') {
      throw new Error('Invalid manifest structure: missing "remotes" object');
    }
    
    // Khởi tạo với các remotes từ manifest
    await initFederationFromRemotes(remotes);
    
  } catch (error) {
    console.error(`Failed to load federation manifest from ${manifestUrl}:`, error);
    throw error;
  }
}

async function initFederationFromRemotes(remotes: { [remoteName: string]: string }): Promise<void> {
  remotesCache = { ...remotes };
  
  const viteRemotes = Object.fromEntries(
    Object.entries(remotes).filter(([_, url]) => url.endsWith('remoteEntry.js'))
  );
  
  const esBuildRemotes = Object.fromEntries(
    Object.entries(remotes).filter(([_, url]) => url.endsWith('remoteEntry.json'))
  );

  await initFederationLib(esBuildRemotes);
}