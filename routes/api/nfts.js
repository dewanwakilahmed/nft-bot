const express = require('express')
const router = express.Router()

const nfts = require('../../models/NFTs')

// Gets All NFTs
router.get('/', (req, res) => {
    nfts.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Creates a NFT in collection
router.post('/', (req, res) => {
    const newNFT = {
        nftName: req.body.nftName,
        assetContractAddress: req.body.assetContractAddress,
        tokenId: req.body.tokenId,
        accountAddress: req.body.accountAddress,
    }
    nfts.create(newNFT)
    console.log('NFT added to collection successfully!')
    res.sendStatus(200)
    res.redirect('/')
})

module.exports = router
