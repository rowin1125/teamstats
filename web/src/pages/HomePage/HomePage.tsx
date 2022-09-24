import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import manAtNightImage from '../../components/Hero/images/footbal-night-man.jpg'
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Grid
        templateColumns="repeat(2, 1fr)"
        pos="relative"
        overflow="hidden"
        bg="primary.900"
      >
        <GridItem
          colSpan={{ base: 2, xl: 1 }}
          alignSelf="center"
          justifySelf="center"
        >
          <Container maxW="8xl">
            <Box
              mt={{
                base: 8,
                xl: 0,
              }}
              pos="relative"
              maxW={{
                xl: '3xl',
              }}
              w={{
                xl: 'full',
              }}
              zIndex={1}
              bg={'primary.900'}
              border="solid 1px transparent"
            >
              <Flex
                w="full"
                textAlign={{
                  sm: 'center',
                  xl: 'left',
                }}
                justifyContent="center"
                flexDirection="column"
              >
                <Heading
                  fontSize={{
                    base: '4xl',
                    xl: '7xl',
                  }}
                  fontWeight="extrabold"
                  color="white"
                >
                  Start vandaag met het beheren van jouw team!
                </Heading>
                <Text color="white">
                  Stop met het bijhouden van alle administratie op papier. Met
                  TeamGrip heb je alles in één overzichtelijke omgeving.
                </Text>
                <Flex flexDir={{ base: 'column', xl: 'row' }} mt={8}>
                  <Button>Login</Button>
                  <Button
                    ml={{ base: 0, xl: 4 }}
                    mt={{ base: 4, xl: 0 }}
                    colorScheme="secondary"
                  >
                    Maak een account
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Container>
        </GridItem>
        <GridItem
          colSpan={{ base: 2, xl: 1 }}
          border="solid 1px transparent"
          order={{ base: -1, xl: 0 }}
        >
          <Image
            h={{
              base: '100%',
              xl: '100%',
            }}
            w="full"
            fit="cover"
            src={manAtNightImage}
            alt=""
            loading="lazy"
            filter="brightness(0.5)"
            clipPath={{
              base: 'none',
              xl: 'polygon(15% 0px, 50px 100%, 90% 100%, 100% 0px)',
            }}
          />
        </GridItem>
      </Grid>
    </>
  )
}

export default HomePage
