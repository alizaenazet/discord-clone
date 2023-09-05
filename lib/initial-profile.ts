import { db } from "@/db/db";
import { Profile } from "@/db/schema";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";


export const initalProfile = async () => {

    console.log("cek user");
    
    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();
    }
    const {id,firstName,lastName,imageUrl,emailAddresses} = user
    
    const profile = await db.select().from(Profile).where(eq(Profile.userId,id))

    console.log('profile init');
    console.log(profile);
    
    if (profile.length) {
        return profile
    }
    

    console.log("Init profile and create");
    
    const newProfile ={
    id: randomUUID(),
    userId: id,
    name: `${firstName} ${lastName}`,
    imageUrl: imageUrl,
    email: emailAddresses[0].emailAddress
}
    await db.insert(Profile).values(newProfile)

     
    return newProfile;
    
}