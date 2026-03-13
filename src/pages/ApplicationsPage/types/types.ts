export interface PostDataApp {
  name: string
  phone: number
  specility: string
}

export interface PatchPayloadApp {
  phone: string
  specility: string
}

export enum SpecilityEnum {
  front = 'front',
  back = 'back',
  devops = 'devops',
  gamedev = 'gamedev'
}

export interface AppType {
  name: string
  phone: string 
  specility: SpecilityEnum
  id: number 
}

export const initialApp: AppType = {
   name: '',
  phone: '',
  specility: SpecilityEnum.back,
  id: 0 
}



export const SpecilityOptions: { label: string, value: SpecilityEnum}[]= [
  {
    label: "Backend",
    value: SpecilityEnum.back
  },
  {
    label: "Frontend",
    value: SpecilityEnum.front
  },
  {
    label: "DevOps",
    value: SpecilityEnum.devops
  },
  {
    label: "GameDev",
    value: SpecilityEnum.gamedev
  },
]

