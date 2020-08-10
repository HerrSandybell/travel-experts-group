# CPRG-207 Group Project - By Team Important Bits

This repo contains the work done as part of the CPRG-207 project taken at SAIT in the summer/fall 2020 semester of the Software Development course.

## Important Bits: Team Members

[Tarek Alatrach](https://github.com/HerrSandybell)
[Aslam](https://github.com/aslamoh)
[Muna](https://github.com/munachi93)

## Project Deliverables

### Phase 1

Phase 1 of the project is focused on creating the front-end.

The basic requirements were:

1. A Main page that will welcome the customer to the site and provide links and menus to the other pages.
2. A “Contact Us” page that has information about how to phone, email, or goto the agency.
3. A “Vacation Package” page listing all vacation packages available.  This will be a static page at this time and will be enhanced later to be dynamically generated from a database. This could be located on the Main page if your team decides that it would be a better design.
4. A “Customer Registration” page that will allow a customer to set up an account with Travel Experts by entering their name, address (including city, province, country, and postal code), email address, home phone number, business phone number, user ID, and password, which will be used, after verification, to establish an account for future orders.  The data will be submitted to a test page (use bouncer.php) at this point, but this page will be enhanced later to become an order page with server-side scripting and database access.

The product as is accomplishes these objectives, and goes a little beyond by adding some field verification with the already-existing entries, returning an appropriate and useful message.

#### Design

The website has a simplistic aesthetic, using only three colors declared via vars (for ease of theme switching). These are Dark blue, teal, and red. The hero section is the star of the show, as well as a responsive, animated nav menu.

One of the big points that needs improvement is the gallery section and overall vacation package presentation. As it is, they are serviceable, but amateur-looking.

#### Scripts

There are a few scripts that fetch collections from the database and construct a variety of galleries and HTML content. They are, more or less, straight-forward and simplistic.

#### Node

Node was used as a server environment. Several modules were used to do some key functions:

- Express: used to run the server and routing and other modules.
- path: used for routing and directing requests
- ejs: used for templating
- mongoose: used for CRUD operations with our MongoDB.

The other currently used modules are not imperative to the operation of the website, but add some minor functions here and there.

#### MongoDB

For the scale of our operation, it would not have mattered much if a SQL or noSQL database was used. We decided to go with MongoDB (a noSQL database) because our database is comparatively small, and we do not anticipate a great need for frequent complex querying by our "client". Another big advantage is that it is easier to physically read MongoDB documents, and it is more straight-forward to deal with them, being json objects by default.

#### Challenges

One of the biggest challenges was learning to deal with async operations, and how to make the data they return available in rendering pages. Some crude solutions were operated (Such as "nested" .then methods. See registration form posting function).

There are a few modules that can aid with such tasks. However, at this point, adding more modules to app.js will make the script too bloated. It will be necessary to divide these functions among several backend script files for easier maintenance and editing.

Another minor challenge that can be overcome by some more time is CSS layout styling for responsive squares. Some slapdash solutions were implemented using padding size. However, learning css grid and implementing it would make life much easier and make a better product. That would be the next major step in the design-aspect of this project.