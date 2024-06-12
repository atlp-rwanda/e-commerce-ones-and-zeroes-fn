
declare module 'react-dom' {
    export function createRoot(container: Element | DocumentFragment | null, options?: { hydrate?: boolean }): {
      render(children: React.ReactNode): void;
    };
  }
  