'use client'
import React, {useEffect} from 'react'
import {useSafeAsync, useTenant} from '@/hooks'
import {Loading, Text} from '@/components'

import DumbbellSvg from './assets/dumbbell.svg'

import {Container, GymManagement, YourAppsContainer} from './apps.styles'
import {colorTokens} from '@/styles'
import {CONFIG} from '@/config'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/context'

interface AppsProps {
  content: AppsContent
}

export const Apps: React.FC<AppsProps> = (props) => {
  const {content} = props
  const {run, isLoading} = useSafeAsync()
  const {state} = useAuth()
  const {user, getUser} = useTenant()
  const router = useRouter()

  const handleOpenGymManagement = () => {
    const gymApp = user?.tenant.apps.find((app) => app.type === 'gym-management')
    if (gymApp) {
      router.push(gymApp.url)
      return
    }
    router.push(CONFIG.PAGE_ROUTES.GYM_MANAGEMENT)
  }

  const handleGetUser = async () => {
    await run(getUser(state.user?.emailAddress || ''))
  }

  useEffect(() => {
    handleGetUser()
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      <Text type={'h3'}>{content.heading}</Text>
      <YourAppsContainer>
        <GymManagement onClick={handleOpenGymManagement}>
          <DumbbellSvg />
          <Text type={'body'} $textAlign={'center'} color={colorTokens.neutrals000}>
            {content.gymManagementTitle}
          </Text>
        </GymManagement>
      </YourAppsContainer>
    </Container>
  )
}
