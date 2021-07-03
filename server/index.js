const express = require('express')
const PORT = process.env.PORT || 3001;

const app = express();
const path = require("path");

app.use(cors());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api/health", (req,res) => {
    res.json({ message: "Api working" })
})

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


app.listen(PORT, () => { 
    console.log(`Postal Launched at ${PORT}`)
})
