import styled from 'styled-components'
import {borderRadius, colors, mediaQueries, spacing} from '@/styles'
import Link from 'next/link'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (${mediaQueries.s}) {
    padding: 0 ${spacing.space4x};
  }
`

export const YourAppsContainer = styled.div`
  padding-top: ${spacing.space6x};
`

export const GymManagement = styled.button`
  background-color: ${colors.blues800};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius.heavyRounded};
  width: 150px;
  height: 150px;
  padding: 0 ${spacing.space1x} ${spacing.space3x} ${spacing.space1x};
  border: none;

  &:hover {
    cursor: pointer;
    background-color: ${colors.blues500};
  }

  svg {
    width: 120px;
    height: 120px;
  }
`
