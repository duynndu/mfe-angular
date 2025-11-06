export async function loadRemoteModule<T = any>({
  remoteEntry,
  exposedModule,
}: {
  remoteEntry: string;
  exposedModule: string;
}): Promise<T> {
  // 1. Import remoteEntry.js (dynamic import)
  const container: any = await import(/* @vite-ignore */ remoteEntry);

  // 2. Initialize container (quan trọng, Vite runtime cần init)
  await container.init?.({});

  // 3. Lấy factory module exposes
  const factory = await container.get(exposedModule);

  // 4. Trả về module thực
  return factory() as T;
}
