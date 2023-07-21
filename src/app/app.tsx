'use client'
import type React from 'react'

import {Auth} from '@aws-amplify/auth'
import {CONFIG} from '@/config'
import {AuthProvider, useAuth} from '@/context'
import {Footer} from '@/components/footer'
import {Container, Layout} from './app.styles'
import {ToastContainer} from 'react-toastify'
import {AppContent} from './app-content'

import 'react-toastify/dist/ReactToastify.css'
import {TitleBar} from '@/components'

export const App = ({children}: {children: React.ReactElement}) => {
  Auth.configure({
    mandatorySignIn: false,
    region: 'eu-west-2',
    userPoolId: CONFIG.AMPLIFY.USER_POOL_ID,
    identityPoolId: CONFIG.AMPLIFY.IDENTITY_POOL_ID,
    userPoolWebClientId: CONFIG.AMPLIFY.USER_WEB_CLIENT_ID,
    ssr: true,
  })

  return (
    <AuthProvider>
      <Layout>
        <TitleBar />
        <AppContent>{children}</AppContent>
        <Footer />
        <ToastContainer
          autoClose={false}
          position="bottom-left"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className={'toast-position'}
        />
      </Layout>
    </AuthProvider>
  )
}
