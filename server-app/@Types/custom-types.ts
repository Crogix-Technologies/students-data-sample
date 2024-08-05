

export type Extract<S extends string> = S extends `/${infer R}` ? R : S;

export type TypeOfKeys<T> = keyof T;