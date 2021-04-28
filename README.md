# angular-ivy-pz9wca

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-pz9wca)

Weather Report 

A weather report app, helps user to track last 30 days weather report on selecting date.

Question (2)

First Alternative approach when Angular Routing is restricted we can use Loading Components Dynamically in Angular will help to overcome this constraint

As part of it before we will consider following keywords

Dynamic component loading,ComponentFactoryResolver,ViewContainerRef


To implement dynamic component loading in our Angular App, we’ll need:

--> Components that need to be loaded dynamically.
--> Service to load and resolve the Component dynamically.
--> Directive to handle viewContainerRef.

As part of it 

1) Create Component

This component consists basic view.


2) Implementing Service to Load and Resolve Component

While in Service file we will do following activities like 

-> In order to get a reference to our template element in the app component we will use ViewContainerRef.
-> Before we proceed to the createComponent() method from ViewContainerRef, we need to add one more service.
-> The ComponentFactoryResolver service exposes one primary method, resolveComponentFactory.
-> The resolveComponentFactory() method takes a component and returns a ComponentFactory.
-> We can think of ComponentFactory as an object that knows how to create a component.
-> And finally, we will put everything together inside loadComponent method.

loadComponent method takes a ViewContainerRef

3) Updating App component and App module

 We have implemented our services and components and will update the AppComponent and AppModule.
 
 ________________________________---------
 
 
 Second Approach
 ---------------
 
 I have observed like third party module @wishtack/reactive-component-loader through that we can overcome Angular routing restriction.


 
https://angular-weather-report.stackblitz.io/Temperature

https://stackblitz.com/edit/angular-weather-report?file=src%2Fapp%2Fapp.module.ts

