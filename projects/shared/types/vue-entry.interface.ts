
export interface VueModule {
  createPreview: ()=> void; // Function that creates and returns a Vue instance
  createApp: ()=> void;
  [key: string]: any;
}
