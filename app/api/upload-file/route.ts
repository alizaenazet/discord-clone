import { apiResponse } from '@/lib/utils'
import { auth } from "@clerk/nextjs";
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '@/lib/s3bucket'



 
function validateFile(file:File, format:string, maxSize:string) {

    const defaultMaxSize = 100 //100 mb
    const fileSizeToMb = file.size/1024/1024;

    if (fileSizeToMb > Number.parseInt(maxSize) || fileSizeToMb > defaultMaxSize) {
       return apiResponse({
            body:{message:"over size"},
            status: 400
        })
    }

    const formatValid :string [] = format.split(',')
    formatValid.map((value) => {
        if (!formatValid.includes(value)) {
            return apiResponse({
                body:{message:"format not valid"},
                status: 400
            })
            
        }
    })

    return true
}


export async function POST(request: Request) {
    console.log("hitted");
    
    const {userId} = auth()
    if (!userId) {
        return apiResponse({body:{message:"Unauthorized"}, status:401})
    }

  const formData = await request.formData()
  const format: string | null= formData.get('format')  as unknown as string
  const maxSize: string | null = formData.get('maxSize')  as unknown as string
  const file: File | null = formData.get('file') as unknown as File
  
  if (!file) {
    apiResponse({
        body:{message:"file is missing"},
        status:400
    })
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
   const isValid = validateFile(file,format,maxSize)
   if (isValid !== true) {
        return isValid
   }

  const params = {
    Bucket : "learn-discord-clone",
    Key: `${userId}-${file.name}-${new Date().toISOString()}`,
    Body: buffer
  }
  try {
      const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        if (response.$metadata.httpStatusCode && response.$metadata.httpStatusCode > 299) {
            return apiResponse({
                body:{message:"upload failed"},
                status:500,
                })      
        }
  } catch (error) {
    console.log(error);
    return apiResponse({
        body:{message:JSON.stringify(error)},
        status:500,
        })      
  }

    

  return apiResponse({
    body:{message:"success",data:{imageUrl:process.env.S3_BUCKET_BASEURL+params.Key}},
    status:200,
    })
}