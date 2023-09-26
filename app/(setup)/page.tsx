import InitialModal from '@/components/modals/initial-modal';
import { db } from '@/lib/db';
import { initalProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
import React from 'react'


async function SetupPage() {
    const profile = await initalProfile();

    
    // Select server from the user 
    const server = await db.server.findFirst({
        where: {
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    console.log('server');
    console.log(server);
    
    if (server) {
        return redirect(`/servers/${server.id}`)
    }


     
  return <InitialModal />
}

export default SetupPage