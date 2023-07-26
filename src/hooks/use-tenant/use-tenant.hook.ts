import {create} from 'zustand'
import {getTenantAccount} from '@/services'

interface TenantStore {
  getUser: (emailAddress: string) => Promise<void>
  user: MembaUser | null
}

export const useTenant = create<TenantStore>((set) => ({
  getUser: async (emailAddress: string) => {
    const response = await getTenantAccount({emailAddress})
    console.log({response})
    set({user: response})
  },
  user: null,
}))
