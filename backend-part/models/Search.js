import mongoose from "mongoose";


const searchSchema = new mongoose.Schema(
{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    query: { type: String, required: true },
    response:{type: String},
    timestamp: { type: Date, default: Date.now }
}
);

const Search=mongoose.model('Search', searchSchema)
export default Search;