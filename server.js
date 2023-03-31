const fs = require("fs");
const path = require("path")

const express = require("express");
const app = express();


app.use(express.json());

// let file;

// fs.readFile(`${__dirname}/data/foodApi.json`, (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     // console.log(JSON.stringify(data).toString());
//     file = {
//         status: "Response Ok!!",
//         data: `${data}`
//     }
// })

const file = JSON.parse(fs.readFileSync(`${__dirname}/data/foodApi.json`))

app.get("/api/v1/foodapi", (req, res, next) => {

    res.status(200).json({
        status: "Response Ok!!",
        data: file
    })
})

app.get("/api/v1/foodapi/:id", (req, res, next) => {

    //console.log(req.params)
    const id = req.params.id;
    const cat = file.find(el => el.id === id);

    if (!cat) {
        res.status(404).json({
            status: "fail",
            message: "This category is not available"
        })
    } else {
        res.status(200).json({
            status: "success",
            data: cat
        })
    }

    // res.status(200).json({
    //     status: "Response Ok!!",
    //     data: file
    // })


})

app.post("/api/v1/foodapi", (req, res) => {

    const newId = { "id": `${file.length}0` };
    const newData = Object.assign(newId, req.body);

    file.push(newData);

    fs.writeFile(`${__dirname}/data/foodApi.json`, (JSON.stringify(file)), () => {
        console.log("Data saved successfully")
        res.status(201).json(file)
    })

    // res.status(201).json(file)

})

const port = 3000
app.listen(port, () => {
    console.log(`server started at port: ${port}`)
})