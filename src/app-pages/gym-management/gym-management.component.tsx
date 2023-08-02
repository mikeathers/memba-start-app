'use client'
import React, {useEffect, useState} from 'react'
import {
  Container,
  CenterContent,
  GoBackLink,
  GymNameContainer,
  Content,
  TiersContainer,
  GymUrlContainer,
  GymMembershipsContainer,
  PlusContainer,
  AddedMembershipContainer,
  AddButton,
  GymDetailsForm,
  GymMembershipsInputs,
  CreateGymManagementButton,
  CreateGymManagementButtonContainer,
} from './gym-management.styles'
import {Button, PricingCard, SvgIcon, Text, TextInput} from '@/components'
import {CONFIG, TIERS} from '@/config'
import {colorTokens, spacingTokens} from '@/styles'
import {createGymApp} from '@/services'
import {useSafeAsync, useTenant} from '@/hooks'
import {useRouter} from 'next/navigation'

interface GymManagementProps {
  content: GymManagementContent
}

export const GymManagement: React.FC<GymManagementProps> = (props) => {
  const {content} = props
  const {user} = useTenant()
  const {run, error, data, isLoading} = useSafeAsync()
  const [gymName, setGymName] = useState<string>('')
  const [parsedGymName, setParsedGymName] = useState<string>('')
  const [selectedTier, setSelectedTier] = useState<string>(TIERS.FREE)
  const [membership, setMembership] = useState<Membership>({name: '', price: 0})
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const gymApp = user?.tenant.apps.find((item) => item.type === 'gym-management')
    if (gymApp) {
      router.push(gymApp.url)
    }
  }, [user])

  const handleSelectClick = (tier: string) => {
    setSelectedTier(tier)
  }

  const handleSetGymName = (gymName: string) => {
    const gymNameWithNoSpecialCharacters = gymName.replace(/[^a-zA-Z ]/g, '')
    const parsedGymNameForUrl = gymNameWithNoSpecialCharacters
      .replace(' ', '')
      .toLowerCase()
    setParsedGymName(parsedGymNameForUrl)
    setGymName(gymNameWithNoSpecialCharacters)
  }

  const handleAddMembership = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMemberships([...memberships, membership])
    setMembership({name: '', price: 0})
  }

  const handleSubmit = async () => {
    if (!gymName) {
      setFormError(content.noGymNameError)
      return
    }
    if (memberships.length < 1) {
      setFormError(content.noMembershipsError)
      return
    }

    const result = await run(
      createGymApp({
        gymName,
        tenantId: user?.tenantId || '',
        tier: selectedTier,
        memberships,
        tenantAdminEmailAddress: user?.emailAddress || '',
      }),
    )

    if (result) {
      const gymApp = (result as Tenant).apps.find((app) => app.type === 'gym-management')
      router.push(gymApp?.url || '')
    }
  }

  return (
    <Container>
      <GoBackLink href={CONFIG.PAGE_ROUTES.APPS}>
        <Text type={'body'}>{content.goBack}</Text>
      </GoBackLink>

      <CenterContent>
        <Content>
          <Text type={'h1'} $marginBottomX={spacingTokens.space2x}>
            {content.heading}
          </Text>
          <Text type={'body-bold'}>Choose a tier to get started</Text>
          <TiersContainer>
            <PricingCard
              titleNumber={content.freeTierTitleNumber}
              titleText={content.freeTierTitleText}
              pricePerMonth={content.freeTierPricePerMonth}
              numberOfCustomers={content.freeTierNumberOfCustomer}
              transactionalCosts={content.transactionalCosts}
              selectClick={() => handleSelectClick(TIERS.FREE)}
              select={content.select}
              selectedText={content.selectedText}
              findOutMore={content.findOutMore}
              findOutMoreClick={() => null}
              selected={selectedTier === TIERS.FREE}
            />
            <PricingCard
              titleNumber={content.basicTierTitleNumber}
              titleText={content.basicTierTitleText}
              pricePerMonth={content.basicTierPricePerMonth}
              numberOfCustomers={content.basicTierNumberOfCustomer}
              transactionalCosts={content.transactionalCosts}
              selectClick={() => handleSelectClick(TIERS.BASIC)}
              select={content.select}
              selectedText={content.selectedText}
              findOutMore={content.findOutMore}
              findOutMoreClick={() => null}
              selected={selectedTier === TIERS.BASIC}
            />
            <PricingCard
              titleNumber={content.premiumTierTitleNumber}
              titleText={content.premiumTierTitleText}
              pricePerMonth={content.premiumTierPricePerMonth}
              numberOfCustomers={content.premiumTierNumberOfCustomer}
              transactionalCosts={content.transactionalCosts}
              selectClick={() => handleSelectClick(TIERS.PREMIUM)}
              select={content.select}
              selectedText={content.selectedText}
              findOutMore={content.findOutMore}
              findOutMoreClick={() => null}
              selected={selectedTier === TIERS.PREMIUM}
            />
          </TiersContainer>

          <GymDetailsForm>
            <Text type={'h3'}>{content.gymDetails}</Text>

            <GymNameContainer>
              <TextInput
                label={content.gymNameLabel}
                placeholder={content.gymNamePlaceholder}
                onChange={(e) => handleSetGymName(e.target.value)}
              />
              <GymUrlContainer>
                <Text type={'footnote'} $marginBottomX={spacingTokens.spaceHalfx}>
                  {content.gymUrlLabel}
                </Text>
                {gymName ? (
                  <Text
                    type={'body-bold'}
                  >{`${parsedGymName}${content.gymUrlSuffix}`}</Text>
                ) : (
                  <Text type={'footnote'}>{content.gymNameExample}</Text>
                )}
              </GymUrlContainer>
            </GymNameContainer>

            <Text type={'h3'} $marginBottomX={spacingTokens.space2x}>
              {content.gymMembershipsTitle}
            </Text>
            <GymMembershipsContainer>
              <GymMembershipsInputs>
                <TextInput
                  label={content.gymMembershipName}
                  placeholder={content.gymMembershipNamePlaceholder}
                  onChange={(e) => setMembership({...membership, name: e.target.value})}
                  value={membership.name}
                />
                <TextInput
                  label={content.gymMembershipPrice}
                  placeholder={content.gymMembershipPricePlaceholder}
                  type={'number'}
                  onChange={(e) =>
                    setMembership({...membership, price: Number(e.target.value)})
                  }
                  value={membership.price}
                />
              </GymMembershipsInputs>

              <AddButton variant={'text'} onClick={handleAddMembership}>
                {content.addMembership}
              </AddButton>
            </GymMembershipsContainer>

            <Text type={'h3'} $marginBottomX={spacingTokens.space3x}>
              {content.yourMemberships}
            </Text>
            {memberships.length < 1 ? (
              <Text type={'footnote'}>{content.noMemberships}</Text>
            ) : (
              memberships.map((item) => (
                <AddedMembershipContainer key={item.name}>
                  <Text
                    type={'body-bold'}
                    $marginRightX={spacingTokens.space2x}
                    $marginBottomX={spacingTokens.space1x}
                  >
                    {item.name}
                  </Text>
                  <Text type={'body'}>£{item.price}/pm</Text>
                </AddedMembershipContainer>
              ))
            )}
          </GymDetailsForm>

          {formError && (
            <Text
              $marginTopX={spacingTokens.space6x}
              type={'body'}
              color={colorTokens.reds500}
            >
              {formError}
            </Text>
          )}

          <CreateGymManagementButtonContainer>
            <CreateGymManagementButton
              variant={'primary'}
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {content.createCta}
            </CreateGymManagementButton>
          </CreateGymManagementButtonContainer>
        </Content>
      </CenterContent>
    </Container>
  )
}
