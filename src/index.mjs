// @ts-nocheck
import * as Stier from "./s_tier.mjs";
import { List } from "melange-ffi";

const atom = Stier.atom;
const list = Stier.list;

function of(value) {
  function _of(value, idx) {
    if (List.isList(value)) {
      return list(List.map(_of, value));
    }

    return atom(value);
  }
  return _of(value);
}

const deserialize = Stier.of_string;
const serialize = Stier.to_string;

const Canonical = {
  deserialize: Stier.Canonical.of_string,
  serialize: Stier.Canonical.to_string,
};

export { of, atom, list, deserialize, serialize, Canonical };
