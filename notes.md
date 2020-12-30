Based on https://flask.palletsprojects.com/en/1.1.x/tutorial/

UC - if I sign into one I should be able to access any of them.
- Could migrate 3 Cognito Pools to 1 IP. 
- TEST - Redirect to each app via query string. 

UC - want to allow partner system credentials access to our system. “Custom token login" as described by Len.
- TEST - migrate from UN/PWD provider from Cognito TO using Lasso identity. Need some type of "hook" to connect the two identities. 

UC - partner to access GCP console - “not urgent” per MIchael. 
- IP is an OIDC provider. GCP console supports OIDC.


Goal
- How will these 3 UC's work.
- Prove out the solution. 
- Jim 
  - would like to use "configuration" more than "custom", which is what AWS does (because it's simpler). 
  - Would like to tell Michael these are the federation standards. Use existing providers rather than custom. 


Questions
- Where does the JWT token come into play. 
- Assign default role to new registrant. 


Steps
1. Create Flask app w/username & password auth to Db (SQLite)
  - Sign-in
  - Register
  - Forgot password
2. Change to IP for 
  - Sign-in
  - Register
  - Forgot password
  - UC - import users from Db above into IP. Authenticate (recover password as needed)
  - UC - register new user
3. Change redirect based on app being authenticatd
  - demonstrate
4. Add federation 
  - Register new user
  - Demonstrate merging IDs with existing user