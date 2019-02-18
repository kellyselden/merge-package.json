'use strict';

const path = require('path');
const fs = require('fs');
const { expect } = require('chai');
const fixturify = require('fixturify');
const fixtureSkipper = require('fixture-skipper');
const { execSync, execFileSync } = require('child_process');

const fixturesPath = path.resolve(__dirname, 'fixtures');

const forEachDir = fixtureSkipper(fixturesPath);

const originDir = path.resolve(__dirname, '__origin__');
const workingDir = path.resolve(__dirname, '__working__');
const originPackageJson = path.resolve(originDir, 'package.json');
const workingPackageJson = path.resolve(workingDir, 'package.json');

function rimraf(dir) {
  try {
    require('rimraf').sync(dir);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

describe('Integration', function() {
  beforeEach(function() {
    rimraf(originDir);
    rimraf(workingDir);

    fs.mkdirSync(originDir);
  });

  afterEach(function() {
    if (this.currentTest.state === 'passed') {
      rimraf(originDir);
      rimraf(workingDir);
    }
  });

  forEachDir((it, fixturesDir) => {
    it(fixturesDir, function() {
      let fixtures = fixturify.readSync(path.join(fixturesPath, fixturesDir));
      let from = fixtures.from['package.json'];
      let my = fixtures.my['package.json'];
      let result = fixtures.result['package.json'];
      let to = fixtures.to['package.json'];

      execSync('git init', { cwd: originDir, stdio: 'ignore' });
      fs.writeFileSync(originPackageJson, from, 'utf8');
      execSync('git add .', { cwd: originDir, stdio: 'ignore' });
      execSync('git commit -m "create origin package.json"', { cwd: originDir, stdio: 'ignore' });

      execSync(`git clone ${originDir} ${workingDir}`, { stdio: 'ignore' });
      fs.writeFileSync(workingPackageJson, my, 'utf8');
      execSync('git add .', { cwd: workingDir, stdio: 'ignore' });
      execSync('git commit -m "update my package.json"', { cwd: workingDir, stdio: 'ignore' });

      fs.writeFileSync(originPackageJson, to, 'utf8');
      execSync('git add .', { cwd: originDir, stdio: 'ignore' });
      execSync('git commit -m "update origin package.json"', { cwd: originDir, stdio: 'ignore' });

      let error;
      try {
        execSync('git pull origin master', { cwd: workingDir, stdio: 'ignore' });
      } catch (err) {
        error = err;
      }
      if (!error) {
        throw new Error('expected pull to fail with merge conflicts');
      }
      execFileSync(require.resolve('../../src/cli'), { cwd: workingDir, stdio: 'ignore' });
      expect(fs.readFileSync(workingPackageJson, 'utf8')).to.equal(result);
    });
  });
});
