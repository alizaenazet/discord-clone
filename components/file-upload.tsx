'use-client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { uploadImage } from '@/lib/s3bucket'

interface fileUploadProps {
    format: string[],
    maxSize?: number,
    value: string,
    onChange: (url?: string) => void;
}

function FileUpload({
    format,
    maxSize,
    value,
    onChange}: fileUploadProps) {
    const [isLoadingUpload,setIsLoadingUpload] = useState(false)
  return (
    <Card>
        <CardContent className='p-2 flex justify-center content-center '>
        {value.length > 1 ? 
            <div className='rounded-full w-3/12 h-1/4 '>
                <img className='object-scale-down rounded-full'
                src={value} alt={''} />    
            </div> : isLoadingUpload ? <p>uploading..</p> :
        <Input id="picture" type="file"  className={`p-20 text-black`} 
            onChange={async (e) => {
                if (!e.target.files) {return null};
                const file = e.target.files?.[0]
                const res = await uploadImage({
                    format,maxSize, file,setIsLoadingUpload})        
                    const {data, status} =  res

                if (status === 200) {
                    onChange(data.data.imageUrl)
                }

                
            }}/>
        }  
        </CardContent>
        <CardFooter>
            <p className='text-xs font-bold text-zinc-500 dark:text-secondary/70'>file: {format.toString()}, max size: {maxSize ? maxSize : "~"}</p>
        </CardFooter>
    </Card>
  )
}

export default FileUpload