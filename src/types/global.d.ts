// Global type declarations for the project

declare module 'react' {
  export * from 'react';
}

declare module 'next/image' {
  import { ImageProps } from 'next/image';
  export default function Image(props: ImageProps): JSX.Element;
}

declare module 'next/font/google' {
  export function Geist(options: any): any;
  export function Geist_Mono(options: any): any;
}
