"use client"
import React from 'react'
import ActionTooltip from '../action-tooltip';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';


interface NavigationItemProps{
    id: string;
    imageUrl: string;
    name: string;
}


function NavigationItem({
    id,
    imageUrl,
    name
}:NavigationItemProps) {
    const params = useParams()
    const router = useRouter()
  return (
    <div> 
        <ActionTooltip 
        label={name} 
        side='right'
        align='center'
        >
        <button
        onClick={()=>{router.push(`/servers/${id}`)}}
        className='group relative flex items-center'>
        <div className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
        )}/>
        <div className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
        )}>
            <img
            src={imageUrl} 
            alt={`channel ${name} icon`}/>
        </div>
        </button>
        </ActionTooltip>
    </div>
  )
}

export default NavigationItem