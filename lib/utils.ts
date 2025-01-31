import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function beutifyAgencyName(name: string) {
  let agency_name = name

  // clean up
  if (agency_name === 'San Francisco Municipal Transportation Agency') {
    agency_name = 'SFMTA'
  }
  if (agency_name === 'AC TRANSIT') {
    agency_name = 'AC Transit'
  }
  if (agency_name === 'Livermore Amador Valley Transit Authority') {
    agency_name = 'Wheels'
  }
  if (agency_name === 'Metro Transit') {
    agency_name = 'King County Metro'
  }

    return agency_name
  }
