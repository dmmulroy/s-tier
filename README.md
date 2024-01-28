<div align="center">
  <img alt="the most s-tier logo of all time" width=600 src="https://github.com/dmmulroy/s-tier/assets/2755722/17ff28bf-4611-41d4-9e0d-fd00a35efaba" />
</div>
<h2 align="center">
The s-tier npm library for s-expression serialization and deserialization.
</h2>
<p align="center">
  Start using S-Tier today with <code>npm install s-tier</code>
</p>

<h2 id="about">About S-Tier</h2>
S-Tier is a  library in the npm ecosystem for efficient and extensive serialization and deserialization of s-expressions. It's unique in offering both standard and canonical s-expression (de)serialization, making it an indispensable tool for developers working with these formats.
<br/>
<br/>

At its heart, S-Tier leverages the power of [sexplib](https://github.com/janestreet/sexplib) and [csexp](https://github.com/ocaml-dune/csexp), two renowned libraries from the OCaml ecosystem, compiled into JavaScript using [Melange](https://melange.re). This synergy brings unparalleled speed and reliability to JavaScript and TypeScript developers.

<h2 id="features">Features</h2>
S-Tier offers:

- Extensive s-expression serialization/deserialization: Handle complex s-expressions with ease.
- Canonical s-expression support: The only npm library offering this feature.
- High performance: Thanks to its OCaml roots and efficient Melange compilation.
- Ease of use: Designed with a straightforward API for quick integration into your projects.

<h2 id="usage-examples">Usage Examples</h2>

```typescript
const STier = require("s-tier");

// Example deserialization
let deserialized = STier.Canonical.deserialize(
  "(10:methodName9:initalize(11:duneVersion4:3.13)(15:protocolVersion5:0.0.1))",
);

// Example serialization
let serialized = STier.serialize(deserialized);
/**
 * (methodName initalize
 *   (duneVersion 3.13)
 *   (protocolVersion 0.0.1))
 */
```
