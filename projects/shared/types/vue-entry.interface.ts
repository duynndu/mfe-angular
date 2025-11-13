
export interface VueModule {
  createPreview: ()=> void; // Function that creates and returns a Vue instance
  createVueApp: ()=> void;
  [key: string]: any;
}
