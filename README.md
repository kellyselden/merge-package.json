# merge-package.json

[![npm version](https://badge.fury.io/js/merge-package.json.svg)](https://www.npmjs.com/package/merge-package.json)

Merge package.json using local, base, and remote

* Preserves ordering
* Follows SemVer
* Uses best guess to resolve conflicts

```js
const mergePackageJson = require('merge-package.json');

let merged = mergePackageJson(local, base, remote);
```
