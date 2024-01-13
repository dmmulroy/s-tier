import type { Brand, Result } from "melange-ffi";

declare module "s-tier" {
  export type Sexp = Brand<void, "Sexp">;
  export type CanonicalSexp = Brand<void, "CanonicalSexp">;

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
