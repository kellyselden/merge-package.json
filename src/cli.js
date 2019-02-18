#!/usr/bin/env node

'use strict';

const fs = require('fs');
const { execSync } = require('child_process');
const mergePackageJson = require('./index');

const local = execSync('git show HEAD:package.json').toString('utf8');
const baseCommit = execSync('git merge-base HEAD MERGE_HEAD').toString('utf8').trim();
const base = execSync(`git show ${baseCommit}:package.json`).toString('utf8');
const remote = execSync('git show MERGE_HEAD:package.json').toString('utf8');

fs.writeFileSync('package.json', mergePackageJson(local, base, remote), 'utf8');
