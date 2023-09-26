import { auth } from "@clerk/nextjs";
import { db } from "./db";


export const currentProfile = async () => {
    const {userId} = auth()

    if (!userId) {
        return null
    }
    console.log('userId');
    console.log(userId);
    
    const profile = await db.profile.findUnique({
        where:{
            userId:userId
        }
    })
    
    if (profile) {
        return profile
    }
    return null
}