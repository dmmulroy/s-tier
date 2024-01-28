import { describe, expect, it } from "bun:test";
import fc from "fast-check";
import { Canonical, atom, deserialize, equal, list, of, serialize } from ".";
import { List, Result } from "melange-ffi";

describe("s-tier", () => {
  describe("sexp", () => {
    describe("serialize and deserialize", () => {
      it("should correctly serialize and deserialize valid atoms", () => {
        fc.assert(
          fc.property(fc.lorem({ maxCount: 1 }), (stringValue) => {
            const atomSexp = atom(stringValue);
            const serialized = serialize(atomSexp);
            const deserializedResult = deserialize(serialized);

            expect(Result.isOk(deserializedResult)).toBeTrue();
            const deserializedSexp = Result.unwrap(deserializedResult);
            expect(equal(deserializedSexp, atomSexp)).toBeTrue();
          }),
        );
      });

      it("should correctly serialize and deserialize lists", () => {
        fc.assert(
          fc.property(fc.array(fc.lorem({ maxCount: 1 })), (stringArray) => {
            const listSexp = list(List.ofArray(stringArray.map(atom)));
            const serialized = serialize(listSexp);
            const deserializedResult = deserialize(serialized);

            expect(Result.isOk(deserializedResult)).toBeTrue();
            const deserializedSexp = Result.unwrap(deserializedResult);
            expect(equal(deserializedSexp, listSexp)).toBeTrue();
          }),
        );
      });

      it("should return an error for strings with unbalanced parentheses", () => {
        fc.assert(
          fc.property(
            fc
              .string()
              .filter((str) => !str.includes(")") && str.trim() !== ""),
            fc
              .string()
              .filter((str) => !str.includes(")") && str.trim() !== ""),
            (part1, part2) => {
              const invalidString = "(" + part1 + part2; // Unbalanced '('
              const result = deserialize(invalidString);
              expect(Result.isError(result)).toBeTrue();
            },
          ),
        );
      });

      it("should return an error for incorrectly formatted s-expressions", () => {
        fc.assert(
          fc.property(fc.string(), (str) => {
            const invalidString = ")" + str;
            const result = deserialize(invalidString);
            expect(Result.isError(result)).toBeTrue();
          }),
        );
      });

      it("should return an error for empty strings", () => {
        const result = deserialize("");
        expect(Result.isError(result)).toBeTrue();
      });

      it("should return an error for strings with only spaces", () => {
        const result = deserialize(" ");
        expect(Result.isError(result)).toBeTrue();
      });
    });
  });

  describe("canonical sexp", () => {
    describe("serialize and deserialize", () => {
      it("should correctly deserialize valid canonical s-expressions", () => {
        const canonicalSexp = `(10:methodName9:initalize(11:duneVersion4:3.13)(15:protocolVersion5:0.0.1))`;
        const csexp = Canonical.deserialize(canonicalSexp);
        expect(Result.isOk(csexp)).toBeTrue();
      });

      it("should correctly serialize valid canonical s-expressions", () => {
        const canonicalSexp = `(10:methodName9:initalize(11:duneVersion4:3.13)(15:protocolVersion5:0.0.1))`;
        const csexp = Canonical.deserialize(canonicalSexp);
        const serialized = Canonical.serialize(Result.unwrap(csexp));
        expect(serialized).toEqual(canonicalSexp);
      });

      it("should correctly serialize and deserialize lists", () => {
        fc.assert(
          fc.property(fc.array(fc.lorem({ maxCount: 1 })), (stringArray) => {
            const listSexp = list(List.ofArray(stringArray.map(atom)));
            const serialized = Canonical.serialize(listSexp);
            const deserializedResult = Canonical.deserialize(serialized);

            expect(Result.isOk(deserializedResult)).toBeTrue();
            const deserializedSexp = Result.unwrap(deserializedResult);
            expect(equal(deserializedSexp, listSexp)).toBeTrue();
          }),
        );
      });

      it("should return an error for strings with unbalanced parentheses", () => {
        fc.assert(
          fc.property(
            fc
              .string()
              .filter((str) => !str.includes(")") && str.trim() !== ""),
            fc
              .string()
              .filter((str) => !str.includes(")") && str.trim() !== ""),
            (part1, part2) => {
              const invalidString = "(" + part1 + part2; // Unbalanced '('
              const result = Canonical.deserialize(invalidString);
              expect(Result.isError(result)).toBeTrue();
            },
          ),
        );
      });

      it("should return an error for incorrectly formatted s-expressions", () => {
        fc.assert(
          fc.property(fc.string(), (str) => {
            const invalidString = ")" + str;
            const result = Canonical.deserialize(invalidString);
            expect(Result.isError(result)).toBeTrue();
          }),
        );
      });

      it("should return an error for empty strings", () => {
        const result = Canonical.deserialize("");
        expect(Result.isError(result)).toBeTrue();
      });

      it("should return an error for strings with only spaces", () => {
        const result = Canonical.deserialize(" ");
        expect(Result.isError(result)).toBeTrue();
      });
    });
  });

  describe("atom and list", () => {
    it("should create a valid s-expression atom", () => {
      const sexp = atom("foo");
      const serialized = serialize(sexp);
      expect(serialized).toEqual("foo");
    });

    it("should create a valid s-expression list", () => {
      const sexp = list(List.map(atom, List.ofArray(["foo", "bar"])));
      const serialized = serialize(sexp);
      expect(serialized).toEqual("(foo bar)");
    });
  });

  describe("of", () => {
    it("should create an atom from a single string value", () => {
      fc.assert(
        fc.property(
          fc
            .string()
            .filter(
              (str) =>
                str.trim() !== "" && !str.includes(")") && !str.includes("("),
            ),
          (stringValue) => {
            const sexp = of(stringValue);
            expect(serialize(sexp)).toEqual(stringValue);
          },
        ),
      );
    });

    it("should create a list from an array of strings", () => {
      fc.assert(
        fc.property(fc.array(fc.string()), (stringArray) => {
          const sexp = of(stringArray);
          const expectedList = list(List.ofArray(stringArray.map(atom)));
          expect(equal(sexp, expectedList)).toBeTrue();
        }),
      );
    });

    it("should handle nested arrays correctly", () => {
      fc.assert(
        fc.property(fc.array(fc.array(fc.string())), (nestedArray) => {
          const sexp = of(nestedArray);
          const expectedList = list(
            List.ofArray(nestedArray.map((subArray) => of(subArray))),
          );
          expect(equal(sexp, expectedList)).toBeTrue();
        }),
      );
    });
  });

  describe("equal", () => {
    it("should return true for identical s-expressions", () => {
      fc.assert(
        fc.property(fc.string(), (stringValue) => {
          const sexp1 = atom(stringValue);
          const sexp2 = atom(stringValue);
          expect(equal(sexp1, sexp2)).toBeTrue();
        }),
      );
    });

    it("should return false for different s-expressions", () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (str1, str2) => {
          fc.pre(str1 !== str2);
          const sexp1 = atom(str1);
          const sexp2 = atom(str2);
          expect(equal(sexp1, sexp2)).toBeFalse();
        }),
      );
    });
  });
});
