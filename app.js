const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");


const app = express();

app.use(express.static("public"));    //we are providing the path of our static files using app.use(express.static())
//for server to serve static like css,images etc we special function of express.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/4f6b5fa04d"
    
    const options = {
        method: "POST",
        auth: "abhijeet1:63f2ca53c4e3910b8c724fe8d6620bf9-us14"

    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata)
    request.end();
});

app.post("/failure",function(req, res){
    res.redirect("/");
})
app.post("/success",function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});


//API
// 63f2ca53c4e3910b8c724fe8d6620bf9-us14

//LIST ID
// 4f6b5fa04d