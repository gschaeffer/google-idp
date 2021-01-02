# google_idp
Project contains example(s) for Google Identity Platform (IdP) usage.

The example uses a Flask app API accessing data managed in a database (sqlite). This is under the `main`' branch.

Subsequent branches show changes to the basic app (`main`). Changes are listed below along with the branch that they may be found in. 

Load it usaing Google Cloud Run:
[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

### Branches

#### main

- Python Fask app with SQLite access, un-authenticated. The Flask API may be accessed via web/js, curl, or other means.

#### gcp-idp-auth

- Google Identity Platform example. FirebaseUI (html) is used to demonstrate user sign-in. Authentication is added to the Flask app. IdP uses the email & password provider.
- Changes from main branch.
  - If the user is not signed-in (token is not present), the webpage displays to Firebase UI. On login (token value set) the webpage displays the data content instead of the Firebase UI.
  - REST calls now include the user token in the header.
  - The Flask endpoints use authentication to validate the user token. Authentication is in the form of a decorator that is applied to any endpoint as needed. 
- Google Identity Platform is configured to use the username & password, Google, and Github authentication providers.

### Usage

To view and run any of the branches use the following.

`git clone <branch>`

Then execute the `run.sh` helper file.

`./run.sh`

### References

- Verify OpenID Connect tokens https://google-auth.readthedocs.io/en/latest/reference/google.oauth2.id_token.html
- JWT auth w/Flask https://codeburst.io/jwt-authorization-in-flask-c63c1acf4eeb
- FirebaseUI https://github.com/firebase/firebaseui-web/blob/master/README.md#installation
- Auth'ing users on App Engine w/Firebase, 
  - https://cloud.google.com/appengine/docs/python/authenticating-users-firebase-appengine
  - https://github.com/GoogleCloudPlatform/python-docs-samples/tree/master/appengine/standard/firebase/firenotes


- https://google-auth.readthedocs.io/en/latest/reference/google.oauth2.id_token.html
- https://realpython.com/flask-google-login/
- https://developers.google.com/identity/protocols/oauth2/web-server#python