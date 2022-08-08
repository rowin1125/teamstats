import { Box, Flex } from '@chakra-ui/react'

import { Toaster } from '@redwoodjs/web/dist/toast'

import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'
import Hero from 'src/components/Hero/Hero'
import Sidebar from 'src/components/Sidebar/Sidebar'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Hero type="football-night-man" />
      <Flex justifyContent="space-between" px={{ base: 0, xl: 8 }} pt={8}>
        <div>
          <Sidebar />
        </div>
        <Flex flexDir="column" w="full">
          <Header />
          <Box as="main" pl={{ xl: 8 }} px={{ xl: 8 }} pr={{ xl: 0 }}>
            {children}
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  )
}

export default AppLayout
