// src/jest-dom.d.ts
import '@testing-library/jest-dom/extend-expect';

// If using TypeScript < 4.5
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

// If using TypeScript >= 4.5
declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
  }
}
