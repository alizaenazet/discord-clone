import { s3Client } from '@/lib/s3bucket';
import { apiResponse } from '@/lib/utils'
import { auth } from "@clerk/nextjs";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";


export async function POST(request: Request) {
    let {key} = await request.json()
    const params = {
    Bucket : "learn-discord-clone",
    Key: key
    }
    console.log(key);
    console.log('key');
    
    try {
       const data = await s3Client.send(new DeleteObjectCommand(params))
       console.log('data');
       console.log(data);
        
       return apiResponse({body:{},status:200})
    } catch (error) {
        return apiResponse({body:{message:"something wrong"},status:400})   
    }
  }