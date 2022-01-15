const mongoose = require('mongoose')
const Schema = mongoose.Schema

let walletsSchema = new Schema(
    {
        walletName: {
            type: String,
        },
        pubAddress: {
            type: String,
        },
        pvtKey: {
            type: String,
        },
        mnemonicPhrase: {
            type: String,
        },
    },
    {
        collection: 'wallets',
    }
)

module.exports = mongoose.model('Wallets', walletsSchema)
