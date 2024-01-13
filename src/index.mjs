// @ts-nocheck
import * as Stier from "./s_tier.mjs";

const atom = Stier.atom;
const list = Stier.list;

function of(value) {
  if (Array.isArray(value)) {
    return list(value.map(of));
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
