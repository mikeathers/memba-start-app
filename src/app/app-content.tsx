import React, {useEffect} from 'react'
import {Container} from './app.styles'
import {useAuth} from '@/context'
import {useSafeAsync, useTenant} from '@/hooks'
import {CONFIG} from '@/config'
import {useRouter, usePathname} from 'next/navigation'
import {Loading, TitleBar} from '@/components'
import {getTenantAccount} from '@/services'
import {Auth} from '@aws-amplify/auth'

interface AppContentProps {
  children: React.ReactNode
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  const {children} = props
  const {refreshUserSession, state} = useAuth()
  const {run, isLoading, isSuccess} = useSafeAsync()
  const router = useRouter()
  const {getUser} = useTenant()
  const pathName = usePathname()

  const runRefreshUserSession = async () => {
    await refreshUserSession()
  }

  const handleGetUserDetails = async () => {
    const res = await Auth.currentSession()
    console.log('TOKEN: ', res.getIdToken())

    await run(getUser(state.user?.emailAddress || ''))
  }

  useEffect(() => {
    if (!state.isAuthenticating) {
      if (!state.isAuthenticated) {
        router.push(CONFIG.SITE_ROUTES.ID)
      } else {
        console.log('triggered')
        handleGetUserDetails()
        if (pathName === '/') router.push(CONFIG.PAGE_ROUTES.APPS)
      }
    }
  }, [state.isAuthenticating, state.isAuthenticated])

  useEffect(() => {
    runRefreshUserSession()
  }, [])

  if (!state.isAuthenticated) return <Loading />
  if (isLoading) return <Loading />

  if (isSuccess)
    return (
      <>
        <TitleBar />
        <Container>{children}</Container>
      </>
    )

  return null
}
