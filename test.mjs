import { Sexp } from "./src/index.mjs";

let x = Sexp.deserialize("(some atom)");

let y = Sexp.serialize(x);

let z = Sexp.Canonical.serialize(x);
