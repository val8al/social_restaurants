import mongoose from 'mongoose';
import { DB_URI } from '../../../config'

export const connectToDatabase = async () => {
    return mongoose.connect(DB_URI)
        .then(() => console.log("DB connection established"))
        .catch(err => console.log(`DB connection failure:\n${err}`))
};