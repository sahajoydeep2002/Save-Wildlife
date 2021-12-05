const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require("multer");
const path = require("path");
const {Animal} = require("../modals/Animal");
const {User} = require("../modals/User");
const {Post} = require("../modals/posts");
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


require('../controller/googleAuth')(passport);

const storageSingle = multer.diskStorage({
    destination : "./public/uploads/photos",
    filename : (req , file , cb)=>{
        cb(null , file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage : storageSingle});
const cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'dp', maxCount: 8 } , {name : 'gallery' , maxCount : 6} , {name:'vimg' , maxCount : 1} , {name : 'galleryPost' , maxCount : 3}]);

router.get("/" , (req , res)=>{
    res.render("landing-page");
});

router.get("/create" , (req , res)=>{
    res.render("create");
})

router.get("/dashboard" , (req , res)=>{
    Animal.find({} , async (err , data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            if(req.user.animalId){
                Animal.findById(req.user.animalId , async (err , animal)=>{
                    if(err){
                        console.log(err);
                    }
                    if(animal){
                        const posts = await Post.find().sort({createdAt : 'desc'});
                        res.render('index' , {user : req.user , data : data , hasAnimal : true , animal : animal , post : posts});
                    }
                });
            }
            else{
                const posts = await Post.find().sort({createdAt : 'desc'});
                res.render("index" , { user : req.user , data : data , hasAnimal : true , animal : {} , post : posts })
            }
            
        }
    })
    
});

router.get("/bio" , (req , res)=>{
    // Animal.findById(req.params)
    res.render("bio");
});

router.get("/bio/:id" , (req , res)=>{
    Animal.findById(req.params.id , (err , data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.render("bio_copy" , {data : data});
        }
    })
})

router.get("/google" , passport.authenticate('google' , { scope : ['profile' , 'email'] }));

router.get("/google/callback" , passport.authenticate('google' , {failureRedirect : "/"}) , (req , res)=>{
    console.log("hello world");
    res.redirect("/dashboard");
});

router.post("/subscribe" , (req , res)=>{
    Animal.findByIdAndUpdate(req.body.id , {$push : {subscribers : req.body.phone}} , (err , data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect(`/bio/${req.body.id}`);
        }
    })
});

router.post("/post" , cpUpload ,async (req , res)=>{
    let date = new Date();
    let currDate = date.toDateString();

    let ps = req.body.post.slice(0 , 350);
    let pl = '';
    if(req.body.post.length > 350){
        pl = req.body.post.slice(351 , req.body.length);
    }

    let hashtags = [];
    let hashArr = req.body.hashtags.split('\r\n');

    hashArr.forEach(element => {
        hashtags.push(element);
    });

    let gall = [];
    req.files.galleryPost.forEach(element => {
        gall.push(element.filename);
    });

    const post = new Post({
        name : req.body.name,
        Date : currDate,
        dp : req.body.dp,
        userId : req.user.id,
        animalId : req.body.animalId,
        postShort : ps,
        postLong : pl,
        hashtags : hashtags,
        gallery : gall
    });

    await post.save((err , data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            Animal.findById(data.animalId , (err , animal)=>{
                if(err){
                    console.log(err);
                }
                if(animal){
                    let phoneNums = animal.subscribers;
                    if(phoneNums.length === 0){
                        res.redirect("/dashboard");
                    }
                    else{
                        phoneNums.forEach(element => {
                            client.messages
                            .create({
                                body: `New Post from ${Rhinocerous}.....`+data.postShort+`... To read More visit https://localhost:3000/posts/${data.id}`,
                                from: '+18482835152',
                                to: element
                            })
                            .then(message =>{
                                console.log(message);
                                res.redirect("/dashboard");
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                        });
                        
                    }
                }
            })
        }
    });

    
});

router.post("/create" , cpUpload , async (req , res)=>{
    console.log(req.user.id);
    console.log(req.body);

    console.log(req.files);
    
    const galleryArr = [];
    req.files.gallery.forEach(element => {
        galleryArr.push(element.filename);
    });

    let vstoryS = req.body.vstory.slice(0 , 550);
    let vstoryL = '';
    if(req.body.vstory.length > 550){
        vstoryL = req.body.vstory.slice(551 , req.body.vstory.length);
    }
    const linkArr = ['https://www.worldwildlife.org/species/polar-bear' , 'https://polarbearsinternational.org/'];
    const mapArr = ['<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65544.93839503262!2d-94.18600181596238!3d58.74951101400492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x526fd949c8f9f537%3A0xd10c44d8423762dd!2sChurchill%2C%20MB%2C%20Canada!5e1!3m2!1sen!2sin!4v1633177076194!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>' , '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d650580.0063500211!2d-179.83727034921228!3d71.22642509651683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x50a70636a5f5033f%3A0xe1dca925085b4bc3!2sWrangel%20Island!5e1!3m2!1sen!2sin!4v1633177099817!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>' , '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7365378.31319678!2d5.943536331256296!3d76.8371722148991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45a1cfdc4fa3c049%3A0x2bf373e71b35e875!2sSvalbard%2C%20Svalbard%20and%20Jan%20Mayen!5e1!3m2!1sen!2sin!4v1633177144233!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'];

    const animal = new Animal({
        cover : req.files.cover[0].filename,
        dp : req.files.dp[0].filename,
        name : req.body.name,
        about : req.body.about,
        subClass : req.body.subClass,
        endCat : req.body.endangered,
        number : req.body.number,
        vstoryShort : vstoryS,
        vstoryLong : vstoryL,
        vimg : req.files.vimg[0].filename,
        gallery : galleryArr,
        links : linkArr,
        maps : mapArr,
        userid : req.user.id
    });

    await animal.save((err , data)=>{
        if(err){
            console.log(err);
        }
        User.findByIdAndUpdate(req.user.id , {hasAnimal : true} , (err , d)=>{
            if(err){
                console.log(err);
            }
            res.redirect(`/bio`);
        });
    });

    
    

});

module.exports = router;