'use client'
import type React from 'react'

import {
  ActionButton,
  ActionsContainer,
  AvatarCircle,
  AvatarCircleSmall,
  Circle,
  Container,
  LeftContent,
  Menu,
  MenuTitleContainer,
  Name,
  NameContainer,
  RightContent,
} from './title-bar.styles'
import {Text} from '../text'
import {useAuth} from '@/context'
import {useComponentVisible, useSafeAsync} from '@/hooks'
import {sentenceCase} from '@/utils'
import {spacingTokens} from '@/styles'

export const TitleBar: React.FC = () => {
  const {
    signUserOut,
    state: {user},
  } = useAuth()
  const firstNameInitial = user?.givenName.charAt(0).toUpperCase()
  const lastNameInitial = user?.familyName.charAt(0).toUpperCase()
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const handleLogout = async () => {
    await signUserOut()
  }
  return (
    <Container>
      <LeftContent>
        <Circle />
        <Text type={'h2'}>Memba</Text>
      </LeftContent>
      <RightContent>
        <AvatarCircle onClick={() => setIsComponentVisible(!isComponentVisible)}>
          <Text type={'h4'}>{firstNameInitial}</Text>
          <Text type={'h4'}>{lastNameInitial}</Text>
        </AvatarCircle>
        {isComponentVisible && (
          <Menu ref={ref}>
            <MenuTitleContainer>
              <Text type={'body-bold'} $marginBottomX={spacingTokens.space2x}>
                Account
              </Text>
              <NameContainer>
                <AvatarCircleSmall>
                  <Text type={'body'}>{firstNameInitial}</Text>
                  <Text type={'body'}>{lastNameInitial}</Text>
                </AvatarCircleSmall>
                <Name>
                  <Text type={'body'}>{`${sentenceCase(user?.givenName)} ${sentenceCase(
                    user?.familyName,
                  )}`}</Text>
                  <Text type={'caption'}>{user?.emailAddress}</Text>
                </Name>
              </NameContainer>
            </MenuTitleContainer>
            <ActionsContainer>
              <ActionButton variant={'text'}>Account settings</ActionButton>
              <ActionButton variant={'text'} onClick={handleLogout}>
                Log out
              </ActionButton>
            </ActionsContainer>
          </Menu>
        )}
      </RightContent>
    </Container>
  )
}
