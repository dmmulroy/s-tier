import { List, NestableArrayOf, Result } from "melange-ffi";
// @ts-ignore - This file is generated by Melange
import * as Stier from "./s_tier.mjs";

declare const BRAND: unique symbol;
type Brand<T, B> = T & { [BRAND]: B };

/**
 * Represents a symbolic expression (s-expression). This type is used to encapsulate
 * the concept of an s-expression, commonly utilized in Lisp-like languages,
 * representing data in a tree-like structure.
 */
export type Sexp = Brand<void, "Sexp">;

/**
 * Represents a canonical symbolic expression (canonical s-expression). This type is
 * used for a standardized representation of an s-expression, ensuring consistent
 * formatting and ordering of elements.
 */
export type CanonicalSexp = Brand<void, "CanonicalSexp">;

/**
 * Constructs an atom.
 * @param {string} value The value of the atom.
 * @returns {Sexp} The atom.
 */
const atom: (value: string) => Sexp = Stier.atom as unknown as (
  value: string,
) => Sexp;

/**
 * Constructs a list.
 * @param {Sexp[]} values The elements of the list.
 * @returns {Sexp} The list.
 */
const list: (...values: Sexp[]) => Sexp = Stier.list as unknown as (
  ...values: Sexp[]
) => Sexp;

/**
 * Constructs an s-expression from a given value. If the input is an array,
 * it recursively processes each element to create a list s-expression.
 * Otherwise, it creates an atom s-expression.
 *
 * @param {NestableArrayOf<T>} value - The value to be converted into an s-expression.
 * The value can be a nested array of type T or a single value of type T.
 * @returns {Sexp} - The s-expression. If the input is an array, a list s-expression
 * is returned, constructed from the array elements. For a single value, an atom
 * s-expression is returned.
 * @template T - The type of the elements if the input is an array, or the type of the value.
 */
function of(value: NestableArrayOf<string> | string): Sexp {
  if (Array.isArray(value)) {
    return list(List.ofArray(value.map(of)));
  }
  return atom(value);
}

/**
 * Deserialize a string into an s-expression.
 * @param {string} value The string to deserialize.
 * @returns {Result<Sexp, string>} A Result containing either the s-expression or an error message.
 */
const deserialize: (value: string) => Result<Sexp, string> = Stier.of_string;

/**
 * Deserialize a string into an s-expression.
 * @param {string} value The string to deserialize.
 * @returns {Result<CanonicalSexp, string>} A Result containing either the s-expression or an error message.
 */
const deserializeCanonical: (value: string) => Result<CanonicalSexp, string> =
  Stier.Canonical.of_string;

/**
 * Serialize an s-expression into a string.
 * @param {Sexp} sexp The s-expression to serialize.
 * @returns {string} The serialized s-expression.
 */
const serialize: (sexp: Sexp) => string = Stier.to_string;

/**
 * Serialize an s-expression into a string.
 * @param {CanonicalSexp | Sexp} sexp The canonical s-expression to serialize.
 * @returns {string} The serialized canonical s-expression.
 */
const serializeCanonical: (sexp: CanonicalSexp | Sexp) => string =
  Stier.Canonical.to_string;

const Canonical = {
  deserialize: deserializeCanonical,
  serialize: serializeCanonical,
} as const;

export { of, atom, list, deserialize, serialize, Canonical };
