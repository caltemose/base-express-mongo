# base-express-mongo

This is a simple repo for the API bits of teaching basic CRUD with Node/Mongo to developers.

There are numbered branches which correspond to the basic features implementing a basic CRUD (Create, Read, Update, Delete) API for a simple database of items.

The items data structure is:

```
{
    _id: '5886b9ea94361c2fd8f39f9e', // a MongoDB ObjectID
    name: 'Hello' // a String
}
```

The branches are as follows:

1. **001-basic-server**: setting up a very simple Express server with a single index route. At this point everything lives in a single file.
2. **002-split-routing**: move routing out into its own folder to prepare for more complex routing. Show how to organize routes cleanly. Add `/api` route.
3. **003-nodemon**: add `nodemon` to monitor files so node automatically restarts with code updates to save us time.
4. **004-error-handling**: add basic error handling for unknown routes and server errors.
5. **005-body-parser**: add the `body-parser` package to handle JSON bodies on `POST`, `PUT` and `DELETE` requests.
6. **006-items-route**: add the `/api/items` route to return a hard-coded list of items (to be hooked up to Mongo later).
7. **007-mongo-connect**: add the `mongoose` package to handle connection to database and database commands. On server startup we're now connecting to Mongo.
8. **008-getting-items**: update the `GET` route for `/api/items` to return all documents in the `items` collection in the Mongo database.
9. **009-create-item**: add the `POST` route for `/api/items` to create new items in the database.
10. **010-update-item**: add the `PUT` route for `/api/items` to update an item in the database with the provided `_id` and `name` properties.
11. **011-delete-item**: add the `DELETE` route for `/api/items` to remove an item from the database with the provided `_id`.
12. **012-delete-item-update**: updated the `DELETE` route to pass `_id` through the URL rather than through the request body.
