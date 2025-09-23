// Global type declarations for the project

declare module 'react' {
  export * from 'react';
}

declare module 'next/image' {
  import { ImageProps } from 'next/image';
  export default function Image(props: ImageProps): JSX.Element;
}

declare module 'next/font/google' {
  interface FontOptions {
    variable?: string;
    subsets?: string[];
    display?: string;
    weight?: string | string[];
    style?: string | string[];
  }
  
  interface FontReturn {
    variable: string;
    className: string;
    style: {
      fontFamily: string;
    };
  }
  
  export function Geist(options: FontOptions): FontReturn;
  export function Geist_Mono(options: FontOptions): FontReturn;
}
