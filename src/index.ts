import { ArrayOf, List, NestableArrayOf } from "melange-ffi";
// @ts-ignore
import * as Stier from "./s_tier.mjs";

declare const BRAND: unique symbol;
type Brand<T, B> = T & { [BRAND]: B };

export type Sexp = Brand<void, "Sexp">;
export type CanonicalSexp = Brand<void, "CanonicalSexp">;

const atom: (value: string) => Sexp = Stier.atom;
const list: (...values: Sexp[]) => Sexp = Stier.list;

function of(value: NestableArrayOf<string> | string): Sexp {
  if (Array.isArray(value)) {
    const mappedValues = value.map((value, _idx) => of(value));
    const listValues = List.ofArray(mappedValues);
    return list(listValues);
  }
  return atom(value);
}

const deserialize = Stier.of_string;
const serialize = Stier.to_string;

const Canonical = {
  deserialize: Stier.Canonical.of_string,
  serialize: Stier.Canonical.to_string,
};

export { of, atom, list, deserialize, serialize, Canonical };
