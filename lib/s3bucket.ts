import { S3Client } from "@aws-sdk/client-s3";
import axios from "axios";
// Set the AWS Region.
const REGION = "ap-southeast-3"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
export const s3Client = new S3Client({ region: REGION });
// export { s3Client };


interface uploadImageProps {
    format: string[],
    maxSize?: number,
    file: File,
    setIsLoadingUpload: (isLoading: boolean) => void;
}
export async function uploadImage({
    format,
    maxSize,
    file,
    setIsLoadingUpload}: uploadImageProps) {
    const formData = new FormData()
    formData.set("format",format.toString())
    formData.set("maxSize",maxSize ? maxSize.toString() : "" )
    formData.set("file",file)
    try {
        setIsLoadingUpload(true)
        const {data,status} = await axios.post("/api/upload-file",formData)
        setIsLoadingUpload(false)
        return {data,status}
    } catch (error) {
        console.log('JSON.stringify(error)');
        console.log(JSON.stringify(error));
        throw new Error("hit api upload file, failed")
    }
}


export async function deleteImage(urlObject: string) {
    const keyObject = urlObject.split("/")
    if (keyObject) {
        await axios.post("/api/delete-file",{key:keyObject[3]})
    }else{
        throw new Error("send request delete image failed check imageUrl and the object key")
    }
}