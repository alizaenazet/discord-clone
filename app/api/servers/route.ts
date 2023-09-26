import { currentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { db } from '@/lib/db';

 
export async function POST(request: Request) {
    try {
        const { name, imageUrl } = await request.json();
    const profile = await currentProfile()

    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

  
    const server = await db.server.create({
        data:{
            name,
            imageUrl,
            inviteCode: nanoid(),
            profileId: profile.id,
            channels:{
                create: [
                    {name: "general", profileId:profile.id}
                ]
            },
            members:{
                create:[
                    {role: "MODERATOR",profileId: profile.id,}
                ]
            }
        }
    })
    
  return NextResponse.json({ server })
    } catch (error) {
        console.log("[SERVERS_POST]",error);
        return NextResponse.json("Internal error",{status:500})
    }
}