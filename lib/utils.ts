import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 import { NextResponse } from 'next/server'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface apiResponseProps {
  body?: {
    message?: string
    data?: any
    error?: string
  }
  status: number
}

export function apiResponse({body,status} : apiResponseProps ) {
  if (!body) {
    return NextResponse.json({},{status:status})
  }
  return NextResponse.json({...body},{status:status})
}

