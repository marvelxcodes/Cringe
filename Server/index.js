import cors from 'cors'
import express from 'express'
import bodyparser from 'body-parser'

import Posts from './routes/posts.js';

const App = express();

App.use("/posts", Posts)

const PORT = process.env.PORT || 4000;

App.use(bodyparser.json({
    limit: "30mb",
    extended: true
}))

App.use(bodyparser.urlencoded({
    limit: "30mb",
    extended: true
}))

App.use(cors())

App.listen(PORT, () => {
    console.log(`Server is Listening on Port: ${PORT}!`)
})