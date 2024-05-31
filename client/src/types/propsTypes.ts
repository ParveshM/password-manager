export type IncludeOptions =
  | "upperCaseLetter"
  | "lowerCaseLetter"
  | "numbers"
  | "symbols";

export interface OptionsInterface {
  upperCaseLetter: boolean;
  lowerCaseLetter: boolean;
  numbers: boolean;
  symbols: boolean;
  length: number;
}
