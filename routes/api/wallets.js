const express = require('express')
const router = express.Router()

const wallets = require('../../models/Wallets')

// Gets All Wallets
router.get('/', (req, res) => {
    wallets.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Create a new Wallet
router.post('/', (req, res) => {
    const newWallet = {
        walletName: req.body.walletName,
        pubAddress: req.body.pubAddress,
        pvtKey: req.body.pvtKey,
        mnemonicPhrase: req.body.mnemonicPhrase,
    }
    wallets.create(newWallet)
    console.log('Wallet created successfully!')
    res.sendStatus(200)
    res.redirect('/')
})

module.exports = router
