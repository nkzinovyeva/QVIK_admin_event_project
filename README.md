# Admin panel for the Event platform by QVIK
"Event platform - cost efficient way to create event apps"

## Description
A Front-end part of the project aiming to create an event management panel. This project was bootstrapped with Create React App.\
**The project is under development and not yet completed. Please come back to see the final result.

## Authors
* Natalia Zinovyeva [GitHub](https://github.com/nkzinovyeva), [LinkedIn](https://www.linkedin.com/in/nkzinovyeva/)
* Coline Fardel [GitHub](https://github.com/ColineFardel), [LinkedIn](https://linkedin.com/in/coline-fardel-b31990172)
* Piranavan Thambirajah [GitHub](https://github.com/pthambirajah),
[LinkedIn](https://www.linkedin.com/in/piranavan-thambirajah/)

## References
* Design: @JaakkoJunttila
* Back-end: @Raphael77777 @taeheelee90
* Mobile-app: @nkzinovyeva @ColineFardel
* [Prototype](https://github.com/JaakkoJunttila/Event_project_UI)
* [API Definition](https://qvik.herokuapp.com/swagger-ui.html)
* [API Documentation](https://qvik.herokuapp.com/api-docs)
* [Mobile app](https://github.com/nkzinovyeva/event_project)

## Folder structure
`src`: This folder is the main container of all the code inside the application
* `components`: Folder that contains screens and components used in the application
  * `events`: Folder that contains necessary components for the manipulations with the event
  * `presenters`: Folder that contains necessary components for the manipulations with the presenters
  * `restaurants`: Folder that contains necessary components for the manipulations with the restaurants
  * `stages`: Folder that contains necessary components for the manipulations with the stages
* `config`: Folder that contains application’s configurations.
    * index.js: File that contains application URLs.
* `menu`: Folder that contains files for the drawer navigation within the application.
* `redux`: Folder that contains redux related files such as reducers, actions and store.
    * `actions`: Folder that contains all actions that can be dispatched to redux.
    * `reducers`: Folder that has all reducers, and expose the combined result.
    * store.js: The file contains all redux middlewares and the store.
* `App.js`: File that contains navigation logic and SPA-architecture.
* `index.js`: The main component that starts the whole app.

### Used Dependencies
* [axios](https://github.com/axios/axios) for networking
* [redux](https://redux.js.org/) for state management.
* [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.

## Getting Started

## Requirements
* [Node.js](https://nodejs.org/)

## Installing & Executing program

* Clone the repo
```
git clone https://github.com/nkzinovyeva/admin_event_project.git
```
* Navigate to the cloned folder
```
cd admin_event_project
```

* In the project directory, you can run:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
