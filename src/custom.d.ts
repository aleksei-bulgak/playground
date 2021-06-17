declare module '*.svg' {
    const content: any;
    export default content;
}

export type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };