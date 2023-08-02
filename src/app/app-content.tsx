import React, {useEffect} from 'react'
import {Container} from './app.styles'
import {useAuth} from '@/context'
import {useSafeAsync, useTenant} from '@/hooks'
import {CONFIG} from '@/config'
import {useRouter, usePathname} from 'next/navigation'
import {Loading, TitleBar} from '@/components'

interface AppContentProps {
  children: React.ReactNode
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  const {children} = props
  const {refreshUserSession, state} = useAuth()
  const {run, isLoading} = useSafeAsync()
  const router = useRouter()
  const {getUser, user} = useTenant()
  const pathName = usePathname()

  const runRefreshUserSession = async () => {
    await run(refreshUserSession())
  }

  const handleGetUser = async () => {
    if (state.user?.emailAddress) {
      await run(getUser(state.user?.emailAddress || ''))
    }
  }

  useEffect(() => {
    runRefreshUserSession()
  }, [])

  useEffect(() => {
    if (!state.isAuthenticating && !state.isAuthenticated) {
      router.push(CONFIG.SITE_ROUTES.ID)
    }
  }, [state.isAuthenticating, state.isAuthenticated])

  useEffect(() => {
    if (pathName === '/') {
      router.push(CONFIG.PAGE_ROUTES.APPS)
    }
  }, [])

  useEffect(() => {
    handleGetUser()
  }, [state.isAuthenticated])

  useEffect(() => {
    if (state.user) {
      const isTenantAdmin = state?.user?.isTenantAdmin === 'true'
      const gymApp = user?.tenant.apps.find((item) => item.type === 'gym-management')
      if (!isTenantAdmin) {
        router.push(gymApp?.url || CONFIG.SITE_ROUTES.ID)
      }
    }
  }, [state.user])

  if (isLoading || state.isAuthenticating) return <Loading />

  return (
    <>
      <TitleBar />
      <Container>{children}</Container>
    </>
  )
}
