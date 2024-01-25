import type { Result } from "melange-ffi";
import { NestableArrayOf } from "melange-ffi";

declare module "s-tier" {
  const BRAND: unique symbol;
  type Brand<T, B> = T & { [BRAND]: B };

  export type Sexp = Brand<void, "Sexp">;
  export type CanonicalSexp = Brand<void, "CanonicalSexp">;

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
  export function of<T>(value: NestableArrayOf<T>): Sexp;

  /**
   * Constructs an atom.
   * @param {string} value The value of the atom.
   * @returns {Sexp} The atom.
   */
  export function atom(value: string): Sexp;

  /**
   * Constructs a list.
   * @param {Sexp[]} values The elements of the list.
   * @returns {Sexp} The list.
   */
  export function list(...values: Sexp[]): Sexp;

  /**
   * Deserialize a string into an s-expression.
   * @param {string} value The string to deserialize.
   * @returns {Result<Sexp, string>} A Result containing either the s-expression or an error message.
   */
  export function deserialize(value: string): Result<Sexp, string>;

  /**
   * Serialize an s-expression into a string.
   * @param {Sexp} sexp The s-expression to serialize.
   * @returns {string} The serialized s-expression.
   */
  export function serialize(sexp: Sexp): string;

  export namespace Canonical {
    /**
     * Deserialize a string into an s-expression.
     * @param {string} value The string to deserialize.
     * @returns {Result<CanonicalSexp, string>} A Result containing either the s-expression or an error message.
     */
    export function deserialize(value: string): Result<CanonicalSexp, string>;
    /**
     * Serialize an s-expression into a string.
     * @param {CanonicalSexp | Sexp} sexp The canonical s-expression to serialize.
     * @returns {string} The serialized canonical s-expression.
     */
    export function serialize(sexp: CanonicalSexp | Sexp): string;
  }
}
