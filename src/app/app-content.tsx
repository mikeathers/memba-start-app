import React, {useEffect} from 'react'
import {Container} from './app.styles'
import {useAuth} from '@/context'
import {useSafeAsync} from '@/hooks'
import {CONFIG} from '@/config'
import {useRouter} from 'next/navigation'
import {Loading, TitleBar} from '@/components'

interface AppContentProps {
  children: React.ReactNode
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  const {children} = props
  const {refreshUserSession, state} = useAuth()
  const {run, isLoading, isSuccess} = useSafeAsync()
  const router = useRouter()

  const runRefreshUserSession = async () => {
    await run(refreshUserSession())
  }

  useEffect(() => {
    if (!state.isAuthenticating) {
      if (!state.isAuthenticated) {
        router.push(CONFIG.SITE_ROUTES.ID)
      } else {
        router.push(CONFIG.PAGE_ROUTES.APPS)
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
