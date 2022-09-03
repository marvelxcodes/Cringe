import cors from 'cors'
import express from 'express'
import bodyparser from 'body-parser'

import Posts from './routes/posts.js';
import Comments from './routes/comments';
import Liked from './routes/comments'


const App = express();
const PORT = process.env.PORT || 4000;

App.use(cors())

App.use("/posts", Posts)
App.use("/comments", Comments)
App.use("/liked", Liked)

App.use(express.static("public"))

App.use(bodyparser.json({
    limit: "30mb",
    extended: true
}))

App.use(bodyparser.urlencoded({
    limit: "30mb",
    extended: true
}))

App.listen(PORT, () => {
    console.log(`Server is Listening on Port: ${PORT}!`)
})