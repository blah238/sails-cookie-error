# Sails.js 1.x passport error (fixed)

This is a Sails.js 1.x application with a (relatively) minimal test harness that fixes an issue where a second `lift` of Sails fails with an error in the 3rd-party `passport` module.

To run tests:

1. Clone this repository to a local directory and cd into it
2. `npm install`
3. `npm test`

Note that this still requires that the cached `config/http` module to be cleared e.g. with `decache` otherwise the `cookie-parser` error mentioned in [balderdashy/sails#4842](https://github.com/balderdashy/sails/issues/4842) occurs during the 2nd lift. To reproduce the error with `cookie-parser`:

1. Comment out line 50 in `test/helpers/appHelper.js`
2. `npm test` again
