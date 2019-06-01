import mongoose from 'mongoose'
import BruteForceSchema from 'express-brute-mongoose/dist/schema'
const schema = mongoose.Schema

const BruteSchema = new schema(BruteForceSchema)

const BruteModel = mongoose.model('bruteforce', BruteSchema)

export default BruteModel
