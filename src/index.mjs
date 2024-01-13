// @ts-ignore
import * as Stier from "./s_tier.mjs";

/**
 * Deserialize a string into an s-expression.
 * @param {string} value The string to deserialize.
 * @returns {Result<Types.Sexp, string>} A Result containing either the s-expression or an error message.
 */
const deserialize = Stier.of_string;

/**
 * Serialize an s-expression into a string.
 * @param {import("./index.mjs").Sexp} value The s-expression to serialize.
 * @returns {string} The serialized s-expression.
 */
const serialize = Stier.to_string;

const Canonical = {
  /**
   * Deserialize a string into a canonical s-expression.
   * @param {string} value The string to deserialize.
   * @returns {Result<{import("./index.mjs").Sexp}, string>} A Result containing either the canonical s-expression or an error message.
   */
  deserialize: Stier.Canonical.of_string,

  /**
   * Serialize an s-expression into a string.
   * @param {Types.Sexp} value The s-expression to serialize.
   * @returns {string} The serialized s-expression.
   */
  serialize: Stier.Canonical.to_string,
};

export { deserialize, serialize, Canonical };
