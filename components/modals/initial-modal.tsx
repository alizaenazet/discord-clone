'use client'

// import all zod
import * as z from 'zod'
// create form with useForm hook
import { useForm } from 'react-hook-form';
// for validate useForm
import { zodResolver } from "@hookform/resolvers/zod";
// import Dialog components for make modal
import { 
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle
 } from "../ui/dialog";

 import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form";

import { Input } from '@/components/ui/input';  
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import FileUpload from '../file-upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';


   /* form schema using zod object :
    - Zod object can make easy to declare and understand about the schema.
    - Represent the form schema into an object, possbile to make schema validation easy to modify and maintenance. 
    - multifunction for many requirement about the schmea validation, as follows: 
        https://zod.dev/?id=schema-methods
    */
        const formSchema = z.object({
            name: z.string().min(1,{
                message: "Server name is required"
            }),
            imageUrl: z.string().min(1,{
                message: "Server image is required"
            })
        })
        

function InitialModal() {
        const router = useRouter()
 
       /* Solve Hydration failed error :
     - render the modal in the window make a hydration error, cause different markup between server and client
     - using useState & useEffect to solve the problem with conditional rendering, as follows :
      dev.to/olanetsoft/how-to-fix-react-hydration-error-in-nextjs-practical-guide-cjh
    */
      const [isMounted, setIsMounted] = useState(false)
      useEffect(() => {
          setIsMounted(true)
      },[])
    
      
    /* menage form with useForm Hook :
    - useForm for easy form management, take an object as optional argument.
    - have many optional Generic props for many requirement and menegement & schema validation props. 
    - easy to understand and have many props to help manage and validate a form, as follows :
        https://react-hook-form.com/docs/useform
    */
   
    const form = useForm({
        // combine resolver props for validation using zodResolver to validate with the zod schema   
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

 
    const isLoadingSubmit = form.formState.isSubmitting
    
    // custome onSubmit function for the submited useForm values
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log(values.toString());
        try {
            await axios.post('/api/servers',values)
            form.reset()
            router.refresh()
            window.location.reload()
        } catch (error) {
            console.log(error);
        }

    }

    if (!isMounted) {
        return null
    }



  return (
    <Dialog open>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold" >
                    Let's Customize your server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Give your server a personality with a name and an
                    image. You can always change it later.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'> 
                    <div className='space-y-8 px-6'>

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field}) => (
                            <FormItem>
                            <FormControl>
                                <FileUpload 
                                    format={["image", "png"]} 
                                    value={field.value} 
                                    onChange={field.onChange}
                                    />
                            </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel 
                                    className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                                    Server name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoadingSubmit}
                                        className='bg-zinc-300/50 border-0
                                        focus-visible:ring-0 text-black
                                        focus-visivle:ring-offset-0'
                                        placeholder='Enter server name'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <DialogFooter className='bg-gray-100 px-6 py-4' >
                            <Button 
                                variant='primary'
                                type='submit'
                                disabled={isLoadingSubmit}>
                                Create
                            </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default InitialModal