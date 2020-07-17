# The Peanut Gallery

A film review website build during the hack days at &lt;/salt&gt;

This website uses [OMDb API](https://www.omdbapi.com/) to find and fetch data about films and allows users to log in using their Google account and add reviews to any film they want to.

## Set up instructions

### Clone the project

Clone the project and install dependencies:

```bash
git clone git@github.com:arturjzapater/peanut-gallery.git
cd peanut-gallery
npm i
```

### Set up the configuration

You will need to create [Google credentials](https://developers.google.com/identity/protocols/oauth2/openid-connect) for the application and update [auth.js](src/conf.example/auth.js) accordingly.

You will also need to request an [API key for OMDb](https://www.omdbapi.com/apikey.aspx) and update [api.js](src/conf.example/api.js).

Lastly, you might want to choose one or more cookie keys and add them to [cookie.js](src/conf.example/cookie.js).

### Start the app

Then run the docker container:

```bash
docker-compose up
```

Finally start the server in development mode:

```bash
npm run dev
```