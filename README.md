# Rover Photo Viewer

This project creates a UI to view photos from Mars taken by NASA using the `NASA Open API's`. This is a project to demonstrate infinite scrolling functionality and Redux technology which can be used as a central state management technology for implementing a basic cache context application.

### UI and Photo Viewing

Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000. 

The resulting UI has an `infinite scrolling` feature to view the list of the Mars Rover photos displayed for each Sol(default value of 2000). 

The UI also has the `Sol Lookup` functionality where you can view photos for a particular Sol value.  

Clicking on a single item in the scrollabe list of the API result (collection) sets an "active" photo. This photo is displayed by itself at the bottom of the page. Paging between API results will not change or unset the "active" photo.

Once a photo is downloaded from NASA's server, we no longer make a network request if re-requesting same photo using a basic caching mechanism.


## To Run

1. Clone the repository
1. Run `yarn`
1. Make a copy of the `.env.example` file in the root directory and save it as `.env`
1. Goto `https://api.nasa.gov/` and create an account to get the API Key.
1. Replace the apiKey in `.env` file with the key you just obtained.
1. Run `yarn build` to get an optimizd build version, mainly needed to replace environment variables that are used which happen at build time.
1. Run `yarn start` to start the app at port 3000
1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Technologies Used

1. React
1. React Hooks
1. Redux
1. Caching Mechanism

### Third-party Library Used

1. react-inifinite-scroll-component -> to bring in the infinite scrolling functionality which was simpler than re-writing a similar logic that would achieved the same objective given this short span of time
1. redux -> central state management for getting cache implemented later
1. react-redux -> for integrating react with redux by getting an instance of the provider
1. redux-thunk -> adds middleware to handle asynchronous calls through redux
1. localstorage-ttl -> handles the ttl for response to implement basic caching mechanism
1. dotenv -> for providing an easy way to save environment variable which are sensitive and should not be pushed to public repos on GIT
