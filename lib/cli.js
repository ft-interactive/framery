#!/usr/bin/env node

/**
 * Framery CLI
 */

require('ts-node/register');

const meow = require('meow');

const cli = meow(`
  Usage
    $ framery [options]

  Options
    --d3-version <version>, -d3 <version>  Use a specific version of D3 from CDN
`, {
  alias: {
    d3: 'd3-version'
  }
});

const app = require('./');

app(cli.flags);
