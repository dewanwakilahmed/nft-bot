const mongoose = require('mongoose')
const Schema = mongoose.Schema

let NFTsSchema = new Schema(
    {
        nftName: {
            type: String,
        },
        assetContractAddress: {
            type: String,
        },
        tokenId: {
            type: String,
        },
        accountAddress: {
            type: String,
        },
    },
    {
        collection: 'nfts',
    }
)

module.exports = mongoose.model('NFTs', NFTsSchema)
