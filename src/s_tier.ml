type t = Sexp.t = Atom of string | List of t list

let of_string = Sexp.from_string
let to_string t = Format.asprintf "%a" Sexp.pp t

module Canonical = struct
  type nonrec t = t

  let of_string = Csexp.parse_string
  let to_string = Csexp.to_string
end
