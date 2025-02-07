# [Entreprise7pro Bootstrap 3](https://bootstrap.7pro.ca/)

## Why Entreprise7pro Bootstrap 3? 

- Entreprise7pro Bootstrap 3 is compatible with jQuery 4, jQuery 3, jQuery 2 and jQuery 1.8+
- Entreprise7pro Bootstrap 3 has CVE fix for [CVE-2024-6485](https://nvd.nist.gov/vuln/detail/CVE-2024-6485)
- What to expect going forward?
1. CVE coverage
2. Bugfixes
3. The possibility of backporting one or more important features from bs4/bs5 into a new branch called 3.5.x.

[![npm version](https://img.shields.io/npm/v/entreprise7pro-bootstrap.svg)](https://www.npmjs.com/package/entreprise7pro-bootstrap)
<!--[![Build Status](https://img.shields.io/travis/entreprise7pro/bootstrap/v3-dev.svg)](https://travis-ci.org/entreprise7pro/bootstrap) TBD!-->

### Bower recognizes all github projects.

- `bower install entreprise7pro/bootstrap --save`

### Composer instructions

- `composer require entreprise7pro/bootstrap`
- https://packagist.org/packages/entreprise7pro/bootstrap
- https://packagist.org/packages/entreprise7pro/bootstrap-sass (optional)

### NPM installation

- `npm install entreprise7pro-bootstrap`

Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and easier web development.

## ACTIVELY SUPPORTED

### SPONSORED BY

- [Cinder Systems Corp](https://cinders.io)
- Entreprise 7pro.ca Inc.

### Maintainers

- [Joseph Olstad](https://drupal.org/u/josepholstad)
- [Stephen Mulvihill](https://www.drupal.org/u/smulvih2)


Originally created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thornton](https://twitter.com/fat), and previously maintained by the [core team](https://github.com/orgs/entreprise7pro/people) with the massive support and involvement of the community.

To get started, check out <https://bootstrap.7pro.ca/>!


## Table of contents

* [Quick start](#quick-start)
* [Bugs and feature requests](#bugs-and-feature-requests)
* [Documentation](#documentation)
* [Contributing](#contributing)
* [Community](#community)
* [Versioning](#versioning)
* [Creators](#creators)
* [Thanks](#thanks)
* [Copyright and license](#copyright-and-license)


## Quick start

Several quick start options are available:

* [Download the latest release](https://github.com/entreprise7pro/bootstrap/archive/refs/tags/v3.4.3.zip).
* Clone the repo: `git clone https://github.com/entreprise7pro/bootstrap.git`.
* Consume the CDNs https://bootstrap.7pro.ca
* Install with [Composer](https://getcomposer.org/): `composer require entreprise7pro/bootstrap`.


Read the [Getting started page](https://getbootstrap.com/docs/3.4/getting-started/) for information on the framework contents, templates and examples, and more.

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   └── bootstrap-theme.min.css.map
├── js/
│   ├── bootstrap.js
│   └── bootstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    ├── glyphicons-halflings-regular.woff
    └── glyphicons-halflings-regular.woff2
```

We provide compiled CSS and JS (`bootstrap.*`), as well as compiled and minified CSS and JS (`bootstrap.min.*`). CSS [source maps](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps) (`bootstrap.*.map`) are available for use with certain browsers' developer tools. Fonts from Glyphicons are included, as is the optional Bootstrap theme.


## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/entreprise7pro/bootstrap/blob/v3-dev/CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/entreprise7pro/bootstrap/issues/new).

Note that **feature requests must target [Bootstrap v3](https://github.com/entreprise7pro/bootstrap/tree/v3-dev),**. We are focused on maintenance and compatibility of bootstrap 3 with modern dependencies like jQuery v4 and most browsers.


## Documentation

Bootstrap's documentation, included in this repo in the root directory, is built with [Jekyll](https://jekyllrb.com/) and publicly hosted at <https://bootstrap.7pro.ca/>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](https://jekyllrb.com/docs/installation/) and other Ruby dependencies with `bundle install`.
   **Note for Windows users:** Read [this guide](https://jekyllrb.com/docs/installation/windows/) to get Jekyll up and running without problems.
2. From the root `/bootstrap` directory, run `bundle exec jekyll serve` in the command line.
4. Open `http://localhost:9001` in your browser, and voilà.

Learn more about using Jekyll by reading its [documentation](https://jekyllrb.com/docs/).

### Documentation for previous releases

[Previous releases](https://github.com/entreprise7pro/bootstrap/releases) and their documentation are also available for download.


## Contributing

Please read through our [contributing guidelines](https://github.com/entreprise7pro/bootstrap/blob/v3-dev/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, if your pull request contains JavaScript patches or features, you must include [relevant unit tests](https://github.com/entreprise7pro/bootstrap/tree/v3-dev/js/tests). All HTML and CSS should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [Mark Otto](https://github.com/mdo).

**compatible with jQuery 4.** We are focusing our efforts on [Bootstrap v3](https://github.com/entreprise7pro/bootstrap/tree/v3-dev), the future of the entreprise7pro bootstrap release of the framework is here.

Pull requests which add new features (rather than fix bugs) should target [Bootstrap v3 (the `v3-dev` git branch)](https://github.com/entreprise7pro/bootstrap/tree/v3-dev).

Editor preferences are available in the [editor config](https://github.com/entreprise7pro/bootstrap/blob/v3-dev/.editorconfig) for easy use in common text editors. Read more and download plugins at <https://editorconfig.org/>.


## Community

Get updates on Bootstrap's development and chat with the project maintainers and community members.

ootstrap` channel.
* Implementation help may be found at Stack Overflow (tagged [`entreprise7pro-bootstrap`](https://stackoverflow.com/questions/tagged/entreprise7pro-bootstrap)).
* Developers should use the keyword `bootstrap` and or `entreprise7pro` on packages which modify or add to the functionality of Bootstrap when distributing through [npm](https://www.npmjs.com/search?q=keywords:entreprise7pro-bootstrap) or similar delivery mechanisms for maximum discoverability.


## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Bootstrap is maintained under [the Semantic Versioning guidelines](https://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

See [the Releases section of our GitHub project](https://github.com/entreprise7pro/bootstrap/releases) for changelogs for each release version of Bootstrap.

## Compiling

* `sudo apt install nodejs npm`
* `sudo apt install node-grunt-cli`
* `bundle exec grunt --force`
* `npm run release`
* npm run release-zip

## Publishing a new release to npm

 * Compile first
 * npm publish --access public

## Thanks

<img src="https://live.browserstack.com/images/opensource/browserstack-logo.svg" alt="BrowserStack Logo" width="490" height="106">

Thanks to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers!

## Current Maintainers

**Stephen Mulvihill**

* <https://drupal.org/u/smulvih2>
* <https://github.com/smulvih2>

**Joseph Olstad**

* <https://drupal.org/u/joseph.olstad>
* <https://github.com/joejoseph00>


## Website for entreprise7pro-bootstrap

* <https://bootstrap.7pro.ca>

## Creators

**Mark Otto**

* <https://x.com/mdo>
* <https://github.com/mdo>

**Jacob Thornton**

* <https://x.com/fat>
* <https://github.com/fat>


## Copyright and license

Entreprise 7pro.ca Inc. copyright 2024.
Currently released under [the MIT license](https://github.com/entreprise7pro/bootstrap/blob/v3-dev/LICENSE).
Docs released under [Creative Commons](https://github.com/entreprise7pro/bootstrap/blob/v3-dev/docs/LICENSE).
Code and documentation copyright 2011-2019 Twitter, Inc.
Twitter Code previously released under [the MIT license](https://github.com/twbs/bootstrap/blob/v3-dev/LICENSE).
