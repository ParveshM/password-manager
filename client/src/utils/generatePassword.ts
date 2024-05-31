import { OptionsInterface } from "@/types/propsTypes";

export default function generatePassword(options: OptionsInterface) {
  const { upperCaseLetter, lowerCaseLetter, numbers, symbols, length } =
    options;
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|?";
  let str = "";

  if (upperCaseLetter) str += uppercase;
  if (lowerCaseLetter) str += lowercase;
  if (numbers) str += numberChars;
  if (symbols) str += symbolChars;

  let pass = "";
  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}
