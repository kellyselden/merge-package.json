'use strict';

const { describe } = require('../helpers/mocha');
const { expect } = require('../helpers/chai');
const path = require('path');
const fixturify = require('fixturify');
const fixtureSkipper = require('fixture-skipper');
const mergePackageJson = require('../../src');

const fixturesPath = 'test/fixtures';

const forEachDir = fixtureSkipper(fixturesPath);

describe(function() {
  // eslint-disable-next-line mocha/no-setup-in-describe
  forEachDir((it, fixturesDir) => {
    it(fixturesDir, function() {
      let fixtures = fixturify.readSync(path.join(fixturesPath, fixturesDir));
      let from = fixtures.from['package.json'];
      let my = fixtures.my['package.json'];
      let result = fixtures.result['package.json'];
      let to = fixtures.to['package.json'];

      let actual = mergePackageJson(my, from, to);

      expect(actual).to.equal(result);
    });
  });
});
