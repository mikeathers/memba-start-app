import React, {useEffect} from 'react'
import {Container} from './app.styles'
import {useAuth} from '@/context'
import {useSafeAsync} from '@/hooks'
import {CONFIG} from '@/config'
import {useRouter} from 'next/navigation'

interface AppContentProps {
  children: React.ReactNode
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  const {children} = props
  const {
    refreshUserSession,
    state: {isAuthenticated},
  } = useAuth()
  const {run, isLoading, isSuccess} = useSafeAsync()
  const router = useRouter()

  const runRefreshUserSession = async () => {
    await run(refreshUserSession())
  }

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push(CONFIG.SITE_ROUTES.ID)
  //   }
  // }, [isAuthenticated])

  useEffect(() => {
    runRefreshUserSession()
  }, [])

  if (isLoading) return <div>Loading</div>

  if (isSuccess) return <Container>{children}</Container>

  return null
}
