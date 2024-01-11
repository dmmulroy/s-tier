let from_string str = 
  let lexbuf = Lexing.from_string str in
  Sexp_parser.sexp Sexp_lexer.main lexbuf
