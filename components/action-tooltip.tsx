"use client"
import React from 'react'
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
 } from "@/components/ui/tooltip";

 interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "right" | "left";
    align?: "start" | "end" | "center"
 }

 
 /**
  * Tooltip is display information the component when hovered.
  * more information - https://ui.shadcn.com/docs/components/tooltip
  * @param label - the information will displayed
  * @param side - side postion will displayed 
  * @param aling - label text align inside tooltip
  * @param children - nested component will gived tooltip
  * @returns 
  */
 function ActionTooltip({
    label,
    children,
    side,
    align
 }: ActionTooltipProps) {
   return (
     <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                <p className='font-semibold text-sm capitalize'>
                  {label}  
                </p>
            </TooltipContent>
        </Tooltip>
     </TooltipProvider>
   )
 }
 
 export default ActionTooltip