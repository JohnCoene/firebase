# firebase 1.0.0.9000

- Add support for phone sign in.
- Remove deprecated `create_config` function, use
`firebase_config`.
- Fix issue with persistence 
[#14](https://github.com/JohnCoene/firebase/issues/14)
- Upgrade firebase.js to modular, tree-shakable version 9 (latest)
- Use [packer](https://packer.john-coene.com/) to bundle with
webpack for better performances and load time.
- Clean up core class, deprecating several (genuinely) useless
methods.
- Deprecate `useFirebaseUI` in favour of `firebaseUIContainer`.
- In `useFirebase` deprecate `analytics` and `firestore` arguments.
- **Breaking** `FirebaseEmailLink` the method called `send` has been
renamed to `send_email`: this method was overwriting an internal 
private method, actually breaking many things.

# firebase 0.2.1

- Allow firebase to work in modules.
- Added `email_link` to `FirebaseUI`.
- Added `request_token_id` and `get_id_token` methods
to retrieve the user's id token.
- Update firebase and friends to v8.1

# firebase 0.2.0

- Fix potential security issue [#11](https://github.com/JohnCoene/firebase/issues/11)
- Add logging in many places to make it easier to debug

# firebase 0.1.1

- Deprecate the function `create_config` in favour of
`firebase_config`

# firebase 0.1.0

First CRAN submission. All `get_` methods return a list of length 2 containing `success` a boolean indicating whether to operation was successful and `response` containing the result of the response if there is one, otherwise the string `successful`, or the `error` if there is one.

# firebase 0.0.1.9000

Initial version
