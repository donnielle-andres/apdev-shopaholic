# CCAPDEV MP -- Shopaholic
Machine Project Phase 2 for CCAPDEV2021T2

## Local Set Up
- Make sure MongoDB is installed and running.
- Run command prompt and copy -> `npm install mongoose express express-fileUpload body-parser  cookie-parser crypto-js passport crypto-js express-session connect-flash multer formidable handlebars hbs jwtoken morgan nodemon passport-local` after [downloading the contents of the repository]
- To run the application, execute `node server.js`

## Content
- [`controllers`](controllers) - This folder contains files which defines callback functions for client requests.
- [`images`](images) - This folder contains images to be uploaded by the user.
- [`model`](model) - This folder contains files for the database schemas used.
- [`public`](public) - This folder contains static assets such as css, fonts, html, and image files.
- [`routes`](routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [`views`](views) - This folder contains all hbs files including partials to be rendered when requested from the server.
- [`server.js`](server.js) - The main entry point of the web application.

## Description
Shopaholic is a buying and selling site which aims to help sellers get exposure for their listings and to help buyers find the items that they are looking for.

The Home page displays different products that are currently listed in the site. The navigation bar has four links, leading to Home, Shop, Profile, Create Listing, Log Out, and a Search Bar.

The Shop leads the buyer to find more listings found on the site, with bigger space for these listings than in the home page. This page also enables the buyer to filter the listings to their preference.

When Profile  is clicked, the user will be redirected to a Log-In/Sign-Up page, where they must input the necessary information before being redirected to their own account page. This account page includes all the user's listings and reviews (if applicable), this is where updating your information can be done. 

Create Listing leads you to a form where you can post your own listing by giving the necessary listing details asked by the form. After submitting, you will be redirected to your own page.

The Search Bar helps buyers find a certain item that might be posted on the site. 

## How to Start
-


## References
* 
