import cors from 'cors'
import express from 'express'
import bodyparser from 'body-parser'

import Posts from './routes/posts.js';
import Comments from './routes/comments.js';
import Likes from './routes/likes.js'
import Upload from './controllers/upload.js';

const App = express();
const PORT = process.env.PORT || 4000;

App.use(cors())

App.use(express.static("./public"))

App.use(bodyparser.json({
    limit: "30mb",
    extended: true
}))

App.use(bodyparser.urlencoded({
    limit: "30mb",
    extended: true
}))

App.use("/posts", Posts)
App.use("/comments", Comments)
App.use("/likes", Likes)

App.listen(PORT, () => {
    console.log(`Server is Listening on Port: ${PORT}!`)
})