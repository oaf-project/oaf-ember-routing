[![Build Status](https://travis-ci.org/oaf-project/oaf-ember-routing.svg?branch=master)](https://travis-ci.org/oaf-project/oaf-ember-routing)
[![Known Vulnerabilities](https://snyk.io/test/github/oaf-project/oaf-ember-routing/badge.svg?targetFile=package.json)](https://snyk.io/test/github/oaf-project/oaf-ember-routing?targetFile=package.json)
[![Greenkeeper badge](https://badges.greenkeeper.io/oaf-project/oaf-ember-routing.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/oaf-ember-routing.svg)](https://www.npmjs.com/package/oaf-ember-routing)

[![dependencies Status](https://david-dm.org/oaf-project/oaf-ember-routing/status.svg)](https://david-dm.org/oaf-project/oaf-ember-routing)
[![devDependencies Status](https://david-dm.org/oaf-project/oaf-ember-routing/dev-status.svg)](https://david-dm.org/oaf-project/oaf-ember-routing?type=dev)
[![peerDependencies Status](https://david-dm.org/oaf-project/oaf-ember-routing/peer-status.svg)](https://david-dm.org/oaf-project/oaf-ember-routing?type=peer)


# Oaf Ember Routing
An accessible wrapper for [Ember routing](https://guides.emberjs.com/release/routing/), built with [Oaf Routing](https://github.com/oaf-project/oaf-routing).

Documentation at https://oaf-project.github.io/oaf-ember-routing/

## Features

* Reset scroll and focus after page navigation
* Set the page title after navigation
* Announce navigation to users of screen readers
* Hash fragment support

In lieu of more details, see [Oaf React Router](https://github.com/oaf-project/oaf-react-router/blob/master/README.md#features) for now. The features are basically the same, with the caveat that Oaf Ember Routing doesn't currently support focus and scroll restoration after POP navigation.

## Installation

```sh
# yarn
yarn add oaf-ember-routing

# npm
npm install oaf-ember-routing
```

## Basic Usage

```diff
import EmberRouter from '@ember/routing/router';
+ import { createOafEmberRouter } from 'oaf-ember-routing';

+ const oafRouter = createOafEmberRouter();

const Router = EmberRouter.extend({
  ... 
  init() {
    this._super(...arguments);
    ...
+    this.on('routeDidChange', oafRouter.routeDidChange);
  }
});
```

## Advanced Usage

```typescript
const settings = {
  announcementsDivId: "announcements",
  primaryFocusTarget: "main h1, [role=main] h1",
  // This assumes you're setting the document title via some other means.
  // If you're not, you should return a unique and descriptive page title for each page
  // from this function and set `setPageTitle` to true.
  documentTitle: (location: Navigation) => document.title,
  // BYO localization
  navigationMessage: (title: string, location: Navigation): string => `Navigated to ${title}.`,
  shouldHandleAction: (previousLocation: Navigation, nextLocation: Navigation) => true,
  announcePageNavigation: true,
  setPageTitle: false,
  // Set this to true for smooth scrolling.
  // For browser compatibility you might want iamdustan's smoothscroll polyfill https://github.com/iamdustan/smoothscroll
  smoothScroll: false,
};

const oafRouter = createOafEmberRouter(settings);
```

### A note on focus outlines
You may see focus outlines around your `h1` elements (or elsewhere, per `primaryFocusTarget`) when using Oaf Ember Routing.

You might be tempted to remove these focus outlines with something like the following:
```css
[tabindex="-1"]:focus {
  outline: 0 !important;
}
```

Don't do this! Focus outlines are important for accessibility. See for example:

* https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html
* https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/F78
* http://www.outlinenone.com/

Note that [Bootstrap 4 unfortunately removes these focus outlines](https://github.com/twbs/bootstrap/issues/28425). If you use Bootstrap, you can restore them with [Oaf Bootstrap 4](https://github.com/oaf-project/oaf-bootstrap-4).

All that said, if you absolutely _must_ remove focus outlines (stubborn client, stubborn boss, stubborn designer, whatever), consider using the [`:focus-visible` polyfill](https://github.com/WICG/focus-visible) so focus outlines are only hidden from mouse users, _not_ keyboard users.

## See also
* [Oaf Routing](https://github.com/oaf-project/oaf-routing)
* [Oaf Side Effects](https://github.com/oaf-project/oaf-side-effects)
* [Ember Accessible Routing RFC](https://github.com/emberjs/rfcs/pull/433)
* [ember-self-focused](https://github.com/linkedin/self-focused/tree/master/packages/ember-self-focused)
* [ember-a11y](https://github.com/ember-a11y/ember-a11y)
