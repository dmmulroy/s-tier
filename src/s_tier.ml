type t = Sexp.t = Atom of string | List of t list

let of_string str =
  str |> Sexp.from_string
  |> Result.map_error (fun _ ->
         Format.sprintf "There was an error parsing '%s' to an s-expression" str)
;;

let to_string t = Format.asprintf "%a" Sexp.pp t

module Canonical = struct
  let of_string str =
    str |> Csexp.parse_string
    |> Result.map_error (fun _ ->
           Format.sprintf "There was an error parsing '%s' to an s-expression"
             str)
  ;;

  let to_string = Csexp.to_string
end
