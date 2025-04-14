
/// <reference types="vite/client" />

declare module 'react-dnd-html5-backend' {
  export const HTML5Backend: any;
}

declare module 'react-dnd-touch-backend' {
  export const TouchBackend: any;
  export interface TouchBackendOptions {
    enableMouseEvents?: boolean;
  }
}
