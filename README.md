## Photo Weave

This is a personal side project of mine. It is a photo search (unsplash replica) application. I utilize Unsplash API to generate all of the photo searches. I did not submit the application to unsplash as a production app so I did create a limit on the amount of pages that a user can retrieve per search. The pagination was built with react-infinite-scroller.

## Stack Info

This application was built with React/TS, Sass modules and has a lightweight express backend that makes the API calls in order to hide my unsplash API keys.

## Production

I utilized amazon s3 to deploy the front end of this application, the backend is hosted on Heroku's free tier so you may experience a slight delay when you first load the application's landing page. Afterwards if you hit refresh the landing page loads at an appropriate time.
The application can be found at http://photo-weave.s3-website.us-east-2.amazonaws.com/
