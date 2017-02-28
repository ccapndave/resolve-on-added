# resolve-on-added

This is a simple function that returns a Promise that resolves when the given id is found
within the given parent.

```
const requireOnAdded = require("require-on-added");

requireOnAdded(document, "myElement").then(() => console.log("#myElement has been added to the DOM"));
```
