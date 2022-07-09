const express = require('express');
const app = express();
const CryptoJS = require('crypto-js');
//const {image} = req.files;
const passport = require('passport');

const router  = express.Router(); 

//MODELS
const Product = require('../model/Product');
const Review = require('../model/Review');
const User = require('../model/User');


const controller = {

    /** ACCOUNT 
     * - register
     * - log in
     * - update user's information
    */
   
    // REGISTER 
    signup: async (req, res) => {

        // gets user information for sign up 
        const new_user = new User({
            username: req.body.username,
            displayname: req.body.displayname,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, 'Shopaholic').toString(), // Hashes the password
            phonenum: req.body.phonenum,
            location: req.body.location,
            logged: "false",
            displaypic: "../public/img/default.png"
        }); 

        // saves the user information to become an account on the database
        try {
            const account = await new_user.save();
            //res.status(201).json(account)
            console.log("User Created" + account);

            
            req.session.user = account;
            req.session.save();

            // req.flash("Success", "Successfully Signed Up!" + req.body.username);
            res.render('Account',{ 
                title: "Account Profile",  
                userinfo: account,
                //successRedirect: res.redirect('./views/Account.hbs')
            }) 

        } catch (error) {
            res.status(500).json("account existing" + error)
        } 
    },


    // LOGIN
    login: async (req, res, next) => {

        // gets log in information
        try {
            
            const user = await User.findOne({ username: req.body.username });
            !user && res.status(401).json("account username is wrong");  
            
            const origpassword = CryptoJS.AES.decrypt(user.password, 'Shopaholic').toString(CryptoJS.enc.Utf8);
            origpassword !== req.body.password && res.status(401).json("account password is wrong");  

            User.findByIdAndUpdate(user._id, { "logged": "true" } ) // updates logged status
 
            //res.status(200).json(user);

            req.session.user = user;
            req.session.save();
            //res.send("User Logged in" + user);
            console.log("User Logged in" + user)

            // find the products of the seller
            const acc_products = await Product.find({sellername: {$eq: user.username}});
            console.log(acc_products); 

            res.render('Account',{ 
                title: "Account Profile",  
                userinfo: user,
                prodinfo: acc_products,
                successRedirect: './views/Account',
                failureRedirect: '../public/login'
            })

            

            //this.userProfile(); 
            
        } catch (error) {
            res.status(500).json(error);
            failureRedirect: res.redirect('./login.html'); 
            
        }

    }, 




    // USER PROFILE
    userProfile: async (req, res) => {
        let user = req.session.user;
        console.log("User Profile" + user)
        const acc_products = await Product.find({sellername: {$eq: user.username}});
        console.log("User Profile" + acc_products);

        res.render('Account',{ 
            title: "Account Profile",  
            userinfo: user,
            prodinfo: acc_products,
            successRedirect: '../views/Account',
            failureRedirect: '../public/login'
        }) 
        //return res.send(user)
    }, 
 
  
    logout: (req, res) => {
        
        //res.send("User Logged Out")
        res.redirect('./public/index.html') 
        console.log("User Logged Out" + req.session.user)
        req.session.destroy();
 
    }, 


    // UPDATE INFORMATION
    updateinfo: async (req, res) => {

        User.findOne({username: req.body.username}).then((user) => {
                    user.location = req.query.location;
                    user.email = req.query.email;


                user.save().then(() => res.json("Account Updated" + user))
                .catch((error) => 
                res.status(500).json("post review error" + error));
        })

    }, 

 
    //SEARCH
    /*
    search: async(req,res) => {
        const products = await Product.find({
            $text: {$search: req.body.searchbox}
        Product.create(req.body, (error,post) => {
            res.redirect('/');
            console.log("Product created" + post);
    }); */
    

    createprod: async(req,res) => {

        const user = req.session.user;

        const new_prod = new Product({
            sellername: user.username,
            prodname: req.body.prodname,
            prodpric: req.body.prodpric,
            prodcate: req.body.prodcate,
            proddesc: req.body.proddesc,
            prodcond: req.body.prodcond,
            prodvers: req.body.prodvers,
            prodimg: "./public/img/defprod.png", //DEFAULT
            prodpaym: req.body.prodpaym,
            prodship: req.body.prodship
        }); 
 

        try {
            const product = await new_prod.save();
           
            
            console.log("Product Created" + product); 

            res.render('Product',{ 
                title: "Product Profile",  
                prodinfo: product,
                userinfo: user,
                successRedirect: './views/Product',
            })

        } catch (error) {
            console.log("Create Product Error" + error)
        } 

    },



    // retrieve all products of the selected user
    showOwnProducts: async (req, res) => {
        let user = req.session.user;
        const acc_products = await Product.find({sellername: {$eq: user.username}});
        console.log(acc_products); 

        /*
        try {
            
            console.log(acc_products);
            res.render('Account',{  
                prodinfo: acc_products,
                userinfo: user 
            })
            
        } catch (error) {
            res.status(500).json(error);
        }*/
 
    },  


    viewProduct: async (req, res) =>{
        let id = req.params.id;

        let product = await Product.findOne({_id:id}); // looks for one product accrd to id
        console.log(product); 

        if(product){
            res.render('Product',{ 
                title: "Product Profile",  
                prodinfo: product,
                userinfo: req.session.user,
                successRedirect: './views/Product',
            })
        }else{
            console.log("View Product Error " )
        }
  
    }, 
 
    indexProduct: async (req, res) =>{
    
        let products = await Product.find({}); // looks for one product accrd to id
        console.log(products); 

        if(products){
            res.render('index',{ 
                title: "Main Page",  
                prodinfo: products,
                successRedirect: './views/index',
            })
        }else{
            console.log("View Product Error " )
        }
  
    }, 

    /**
     * REVIEWp
     * - post 
     * - retrieve 
     */

    // POST REVIEW TO SELLER PAGE
    postreview: async (req, res) => {

            // gets the information of seller 
            // ** still doesnt work for buyer
        let user = req.session.user;    // current user is posting a review
                                        // must get id of the shop

        // gets review information
        const new_review = new Review({ 
            sellername: seller.username,
            buyerUN: user.username,
            productName: req.body.productName,
            reviewdesc: req.body.reviewdesc, 
            rate: req.body.rate
        })

        // saves new review for the seller by the buyer
        try {
            const review = await new_review.save();
            res.status(201).json(review) 
            
        } catch (error) {
            res.status(500).json("post review error");
            console.log(error); 
        }
    },


 


    // RETRIEVE POSTED
    viewreviews: async (req, res) => {
        // when the review tab is clicked
        // all reviews of the seller will be shown

        // gets the account username

        
        try {
            const acc_reviews = await Review.findOne({sellername: req.body.sellername});
            res.status(200).json(acc_reviews); 

        } catch (error) {
            res.status(500).json(error);
        } 
        
    }

 
};

module.exports = controller; 
