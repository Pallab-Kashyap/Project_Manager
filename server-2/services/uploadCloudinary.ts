import cloudinary from "../config/cloudinaryConfig";

const uploadOnCloudinary = async (filePath: string) => {
    if(!filePath) throw new Error('file path missing in upload cloudinary parameters')

  try {
      const result = await cloudinary.uploader.upload(filePath, { 
        resource_type: "raw",  
      })
     

      return  {
        url: result.url,
        publicId: result.public_id
      }
      
  } catch (error) {
    console.log(error);
    throw new Error('Error in uploading to cloudinary')
  }
}


export default uploadOnCloudinary
