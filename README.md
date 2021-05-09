# Pexels Demo
## Purpose
This is a demo application to show how to implement an Angular application to follow the service with a subject pattern.  This pattern promotes the separation of presentational component and functional components.  This also forces components to be immutable and allows us to get performance benefits by using Angular's change detection on push strategy.
## Components

**App Component**
This is a functional component.  We a localized state service that builds the view model of the data that  it and its child components need.  It also listens to outputs from its children and calls the localized service to perform the business logic needed.

We also use the Angular CDK to implement a virtual / infinite scroll mechanism that we fetch pictures from the Pexels API via HTTP only when needed.  The localized service is responsible for making that API call.

**Search Bar:**
This is is a reusable component that is application independent.  It is a presentational component that outputs an event when to the app component when a user types in the search field.

**Photo Viewer Component**
This is a simple component that is the ComponentRef for the Angular Material dialog component.  This has displays the selected photo in a larger format and also displays the photographer of the photo.

## Services
**App State Service**
This is a localized service for the app component.  It orchestrates all the data that the app component and its children need.  It contains a behavior subject that is updated when events are triggered.  We expose a getViewModel method that the app component calls to get updates any time the behavior subject changes.  The app component consumes the data from the view model via async pipe on the HTML template.

**Pexels HTTP Service**
This is the service that makes HTTP calls and returns data back to the App State Service.  We also handle HTTP errors where we throw an error something fails.  Our app component listens for the errors and displays a Material Snack Bar if an HTTP request fails.