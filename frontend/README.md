This is a React app project for simple implementation of a post publishing website.
It offers following features
* Creating Posts
* Commenting on the posts
* UpVote/ DownVote the Posts and Comments
* Sort based on Title, Time and Votes

## Folder Structure

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions/
      index.js - actions with middleware
    components/
      all app's component
    reducers/
      reducers
    store/
      store with middleware logger
    utils/
      Service API calls
    index.css
    index.js
    registerServiceWorker.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
