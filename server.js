const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/sikayet", (req, res) => {

    const sikayet = req.body;

    fs.readFile('sikayetler.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            const sikayetler = JSON.parse(data);
            sikayet.id = sikayetler.length + 1;
            sikayetler.push(sikayet);

            fs.writeFile('sikayetler.json', JSON.stringify(sikayetler), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).end();
                } else {
                    res.status(200).end();
                }
            });
        }
    });
});

app.delete("/sikayet/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('sikayetler.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            let sikayetler = JSON.parse(data);

            const index = sikayetler.findIndex(sikayet => sikayet.id === id);
            if (index !== -1) {
                sikayetler.splice(index, 1);

                fs.writeFile('sikayetler.json', JSON.stringify(sikayetler), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                });
            } else {
                res.status(404).send('Şikayet bulunamadı');
            }
        }
    });
});

app.put("/sikayet/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const yeniSikayet = req.body;

    fs.readFile('sikayetler.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            let sikayetler = JSON.parse(data);

            const index = sikayetler.findIndex(sikayet => sikayet.id === id);
            if (index !== -1) {
                sikayetler[index] = {...sikayetler[index], ...yeniSikayet};

                fs.writeFile('sikayetler.json', JSON.stringify(sikayetler), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                });
            } else {
                res.status(404).send("sikayet bulunamadi");
            }
        }
    });
});

app.get("/sikayet/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('sikayetler.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else {
            let sikayetler = JSON.parse(data);

            const sikayet = sikayetler.find(sikayet => sikayet.id === id);
            if (sikayet) {
                res.json(sikayet);
            } else {
                res.status(404).send('Şikayet bulunamadı');
            }
        }
    });
});


app.listen(3000, () => console.log("Server is running on port 3000"));
