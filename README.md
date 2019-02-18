# merge-package.json

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/merge-package.json.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/merge-package.json.svg)](https://www.npmjs.com/package/merge-package.json)
[![Build Status](https://travis-ci.org/kellyselden/merge-package.json.svg?branch=master)](https://travis-ci.org/kellyselden/merge-package.json)

Merge package.json using local, base, and remote

* Preserves ordering
* Follows SemVer
* Uses best guess to resolve conflicts

### CLI

```
npm install --global merge-package.json
```

Then just run `merge-package.json` in a directory with merge conflicts in
`package.json`.  It will write the merged output back to `package.json`.

### Node API

```
npm install --save merge-package.json
```

```js
const mergePackageJson = require('merge-package.json');

let merged = mergePackageJson(local, base, remote);
```
