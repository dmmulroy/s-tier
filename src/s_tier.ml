type t = Sexp.t = Atom of string | List of t list

let atom str = Atom str
let list lst = List lst

let of_string str =
  str |> Sexp.from_string
  |> Result.map_error (fun _ ->
         Format.sprintf "There was an error parsing '%s' to an s-expression" str)
;;

let to_string t = Sexp.to_string t

module Canonical = struct
  let of_string str =
    str |> Csexp.parse_string
    |> Result.map_error (fun _ ->
           Format.sprintf "There was an error parsing '%s' to an s-expression"
             str)
  ;;

  let to_string = Csexp.to_string
end
