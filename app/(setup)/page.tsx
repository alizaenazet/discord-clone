import { db } from '@/db/db';
import { Member, Server } from '@/db/schema';
import { initalProfile } from '@/lib/initial-profile'
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'


async function SetupPage() {
    const profile = await initalProfile();

    if (!profile) {
        console.log("Profile ga ada");
        
    }

    console.log('profile');
    console.log(profile);
    

    const server = await db.query.Server.findFirst({
        with: {
            members:{
                where: (members, {eq}) => eq(members.profileId,profile.id),
            }
        }
    })

    console.log('server');
    console.log(server);
    
    if (server) {
        return redirect(`/servers/${server.id}`)
    }


     
  return (
  <div>Create server</div>
  )
}

export default SetupPage