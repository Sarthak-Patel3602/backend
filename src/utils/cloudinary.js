import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnClodinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        } else {
            // upload the file on cloudinary 
            const response = await cloudinary.uploader
                .upload(localFilePath, {
                    resource_type: "video",
                })
            //File has been uploded successfully 
            console.log("File has been uploded successfully", response.url);
            return response;
        }
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}


export { uploadOnClodinary };