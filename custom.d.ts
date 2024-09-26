// custom.d.ts
declare module '@heroicons/react/outline' {
    import { ComponentType, SVGProps } from 'react';
    const content: { [key: string]: ComponentType<SVGProps<SVGSVGElement>> };
    export = content;
  }
  
  declare module '@heroicons/react/solid' {
    import { ComponentType, SVGProps } from 'react';
    const content: { [key: string]: ComponentType<SVGProps<SVGSVGElement>> };
    export = content;
  }
  