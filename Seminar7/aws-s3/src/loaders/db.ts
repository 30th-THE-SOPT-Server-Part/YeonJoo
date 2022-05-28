import mongoose from "mongoose";
import config from "../config";
import Movie from "../models/Movie";
import Review from "../models/Review";
import File from "../models/File";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        mongoose.set("autoCreate", true);

        console.log("Mongoose Connected ...");

        Movie.createCollection().then(function (collection) {
            console.log("Movie collection created");
        });

        Review.createCollection().then(function (collection) {
            console.log("Review collection created");
        });

        File.createCollection().then(function (collection) {
            console.log("File collection created");
        });
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
