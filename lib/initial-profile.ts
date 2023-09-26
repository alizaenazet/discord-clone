import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";



export const initalProfile = async () => {

    console.log("cek user");
    
    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();
    }
    const {id,firstName,lastName,imageUrl,emailAddresses} = user
    
    // check the profile 
    const profile = await db.profile.findUnique({
        where:{
            userId: id
        }
    })

    // is exist return the profile
    if (profile) {
        return profile
    }
    
    // is not exist create the profile into database
    const newProfile = await db.profile.create({
        data: {
            userId: id,
            name: `${firstName} ${lastName}`,
            imageUrl: imageUrl,
            email: emailAddresses[0].emailAddress,
        },
    });

     
    return newProfile;
    
}