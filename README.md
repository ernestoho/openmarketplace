# The Open Source Marketplace Platform

[![Build Status](https://travis-ci.org/openmarketplace/openmarketplace.svg?branch=develop)](https://travis-ci.org/openmarketplace/openmarketplace)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b019e36b2e47432a842f3ad8de522b1a)](https://www.codacy.com/app/OpenMarketplace/OpenMarketplace?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=openmarketplace/openmarketplace&amp;utm_campaign=Badge_Grade)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Web app built with amazing [Meteor](https://www.meteor.com) as application platform Javascript Framework and [Vue 2](https://vuejs.org) as frontend Javascript Framework.

## Getting Started for Developers
Meteor.js need be installed on your machine.

### Installing Meteor on Linux or Mac OSX
```shellscript
curl https://install.meteor.com/ | sh
```

### Installing Meteor on Windows
```shellscript
choco install meteor
```

### Getting and Running the OpenMarketplace
```shellscript
git clone https://github.com/openmarketplace/openmarketplace.git
cd openmarketplace
meteor npm start
```

## Roadmap
This is the current OpenMarketplace Web App features on the road:

- [ ] OpenMarketplace Initial Architecture ([#1](https://github.com/openmarketplace/openmarketplace/issues/1), [#34](https://github.com/openmarketplace/openmarketplace/issues/34), [#35](https://github.com/openmarketplace/openmarketplace/issues/35))
- [ ] Users Registrations
- [ ] Products, Services and Places Registrations ([#10](https://github.com/openmarketplace/openmarketplace/issues/10))
- [ ] Chat Peer-to-Peer ([#20](https://github.com/openmarketplace/openmarketplace/issues/20))
- [ ] Review and Ratings ([#15](https://github.com/openmarketplace/openmarketplace/issues/15))
- [ ] Basis of Payments Gateway and Split Flow ([#6](https://github.com/openmarketplace/openmarketplace/issues/6))
- [ ] PayPal as Default Gateway of Payments ([#33](https://github.com/openmarketplace/openmarketplace/issues/33))
- [ ] Public Profiles and Custom Storepages ([#9](https://github.com/openmarketplace/openmarketplace/issues/9))
- [ ] Access Control ([#13](https://github.com/openmarketplace/openmarketplace/issues/13))
- [ ] Multiples Marketplace Types Support ([#4](https://github.com/openmarketplace/openmarketplace/issues/4))
- [ ] Multiples Languages Support ([#12](https://github.com/openmarketplace/openmarketplace/issues/12))
- [ ] Multiples Currency Support ([#12](https://github.com/openmarketplace/openmarketplace/issues/12))
- [ ] Push Notifications

## Stack
- Web platform with [Meteor](https://meteor.com) + [Vue 2](https://vuejs.org) + [Bulma](http://bulma.io). A fuller reactive [Progressive Web App](https://developers.google.com/web/progressive-web-apps).

- Mobile reactive apps for iOS and Android with [React Native](https://facebook.github.io/react-native).

- Modern realtime API with [Apollo GraphQL](https://github.com/apollographql) using [MongoDB](https://www.mongodb.com/) on data layer.

## Code Style
We love pretty code for human beings! Our source follows basis of the [Meteor Code Style](https://guide.meteor.com/code-style.html), besides [Javascript Standard Style](https://standardjs.com/). Keep it simple!

```shellscript
npm install -g eslint babel-eslint eslint-plugin-babel eslint-plugin-meteor eslint-plugin-standard eslint-plugin-graphql eslint-plugin-import eslint-plugin-node eslint-plugin-promise
```

## Credits
Thanks for:
- @Akrym for top contribution with [Vue-Meteor integration](https://github.com/meteor-vue/vue-meteor).
- Continue...
