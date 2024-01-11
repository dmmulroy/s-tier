(lang dune 3.11)
; The above stanza specifies the Dune language version being used.

; Declares the use of the Melange compiler with a specific version.
(using melange 0.1)

; Declares the use of the directory-targets extension, useful for managing 
; directory-level build targets.
(using directory-targets 0.1)

; Sets the name of the project.
(name s_tier)

; Indicates whether OPAM files should be automatically generated.
(generate_opam_files true)

; Provides the source location of the project, typically a GitHub repository.
(source
 (github dmmulroy/create-melange-app))

; Lists the authors of the project.
(authors 
  ("Dillon Mulroy <dillon.mulroy@gmail.com>")
  ("Leandro Ostera <leandro@abstractmachines.dev>"))

; Specifies the maintainers of the project, which can be different from authors.
(maintainers 
  ("Dillon Mulroy <dillon.mulroy@gmail.com>")
  ("Leandro Ostera <leandro@abstractmachines.dev>"))

; Declares the license type under which the project is distributed.
(license MIT)

; Provides a link to the project's documentation.
(documentation https://github.com/dmmulroy/create-melange-app)

; The package stanza defines the configuration for an OPAM package.
(package
 (name s_tier)
 (synopsis "S tier S Expression parsing and serialization")
 (description "S tier S Expression parsing and serialization")
 ; Allows the package to be empty, which can be useful during development.
 (allow_empty)
 ; Lists the dependencies of the package along with version constraints.
 (depends
  dune
  (melange
   (>= 2.2.0))
  (ocaml
   (>= 5.1.0))
  compiler-libs
  opam-check-npm-deps)
 ; Tags to categorize or label the package, useful for searches and indexing.
 (tags
  (reasonml, ocaml, melange)))
