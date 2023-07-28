'use client'
import React from 'react'
import {useSafeAsync, useTenant} from '@/hooks'
import {Loading, Text} from '@/components'

import DumbbellSvg from './assets/dumbbell.svg'

import {Container, GymManagement, YourAppsContainer} from './apps.styles'
import {colorTokens} from '@/styles'
import {CONFIG} from '@/config'
import {useRouter} from 'next/navigation'

interface AppsProps {
  content: AppsContent
}

export const Apps: React.FC<AppsProps> = (props) => {
  const {content} = props
  const {isLoading} = useSafeAsync()
  const {user} = useTenant()
  const router = useRouter()

  const handleOpenGymManagement = () => {
    const gymApp = user?.tenant.apps.find((app) => app.type === 'gym-management')
    if (gymApp) {
      router.push(gymApp.url)
      return
    }
    router.push(CONFIG.PAGE_ROUTES.GYM_MANAGEMENT)
  }

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
