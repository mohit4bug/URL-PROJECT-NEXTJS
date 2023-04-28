const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    }
})
export default mongoose.models.link || mongoose.model("link", schema);


