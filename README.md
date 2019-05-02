# Sails.js 1.x cookie-parser error

This is a Sails.js 1.x application with a (relatively) minimal test harness reproducing an issue where a second `lift` of Sails fails with an error in the `cookie-parser` module.

To reproduce:

1. Clone this repository to a local directory and cd into it
2. `npm install`
3. `npm test`

To get tests passing:

1. Uncomment line 49 in `test/helpers/appHelper.js`
2. `npm test` again
