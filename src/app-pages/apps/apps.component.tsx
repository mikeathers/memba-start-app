'use client'
import React from 'react'
import {Container} from './apps.styles'

interface AppsProps {
  content: AppsContent
}

export const Apps: React.FC<AppsProps> = (props) => {
  const {content} = props

  return <Container>{content.heading}</Container>
}
