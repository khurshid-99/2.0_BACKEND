# Google Authentication Backend

This project contains a basic setup for Google OAuth 2.0 authentication using Express, Passport.js, and the `passport-google-oauth20` strategy.

## File Structure

- `server.js` - The entry point for the application, starts the web server.
- `src/app.js` - The main application file containing Express setup, middleware, and route configurations.

## Setup & Configuration

This project requires environment variables to be set up. Create a `.env` file in the root of the project with the following:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Dependencies
- `express` - Web framework.
- `dotenv` - Environment variable management.
- `morgan` - HTTP request logger payload for development.
- `passport` and `passport-google-oauth20` - Authentication middleware for Node.js.

## `server.js`

This file is responsible for booting up the Express application created in `app.js`. It imports `dotenv/config` to load environment variables immediately upon startup and lists for incoming connections.

```javascript
import "dotenv/config";
import app from "./src/app.js";

app.listen(3000, () => {
  console.log(`Server is running on PORT 3000. `);
});
```

- Starts the server on port **3000**.

## `src/app.js`

This file initializes the express application and handles all routing and middleware configuration.

### Middleware
- **Morgan**: Used in `"dev"` mode for logging API requests.
- **Passport**: Initialized with `app.use(passport.initialize())`.

### Google Strategy Configuration

The Google strategy acts as the middleware determining how authentication should be processed via Google credentials.

```javascript
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (_, __, profile, done) => {
      // Typically you would save the user to a database here
      return done(null, profile);
    },
  ),
);
```

### Endpoints (Routes)

- **GET `/auth/google`**: 
  - Initiates the Google OAuth flow. 
  - Prompts the user to login with Google and authorizes the application with the scopes: `["profile", "email"]`.

- **GET `/auth/google/callback`**: 
  - This is the endpoint Google redirects to after successful login.
  - Configuration: `{ session: false, failureRedirect: "/" }` outlines it uses stateless sessions.
  - Once successful, the user's profile is logged to the server console from `req.user` and it sends a success message to the browser.
