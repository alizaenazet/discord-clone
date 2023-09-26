import React from 'react'
import { Plus } from "lucide-react";
import ActionTooltip from '@/components/action-tooltip';


function NavigationAction() {
  return (
    <div>
        <ActionTooltip 
        label={'add server'} 
        side='right'
        align="center"
        >
        <button className='group'>
          <div className=' border-orange-900 flex mx-3 h-[48px]
            w-[48px] group-hover:rounded-[16px]
            rounded-[24px] transition-all overflow-hidden 
            items-center justify-center bg-background 
            dark:bg-neutral-700 group-hover:bg-emerald-500'>
              <Plus className='group-hover:text-white transition 
              text-emerald-500' 
              size={25}
              />
          </div>
        </button>
        </ActionTooltip>
    </div>
  )
}

export default NavigationAction