const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dbConfig = require('./database/db')

// Connecting MongoDB Database
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.db).then(
    () => {
        console.log('Database successfully connected!')
    },
    (error) => {
        console.log('Could not connect to database : ' + error)
    }
)

const app = express()

// Body Parser Middleware
app.use(express.json()) // Handles raw JSON
app.use(express.urlencoded({ extended: false })) // Handles form submission

// CORS Middleware
app.use(cors())

// API Routes
app.use('/wallets', require('./routes/api/wallets')) // For Saved Wallets
app.use('/nfts', require('./routes/api/nfts')) // For Purchased NFTs

const PORT = process.env.port || 5000
app.listen(PORT, () =>
    console.log(`Minter Bot Web Server is running at port ${PORT}...`)
)
