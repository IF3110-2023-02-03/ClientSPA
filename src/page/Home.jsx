import Navbar from '../component/Navbar.jsx';
import { Box, Flex, Heading } from '@chakra-ui/react';

function Home() {
    return (
        <>
            <Box     
                h= {"100vh"}
                w= {"100vw"}
                backgroundImage={'../../assets/home-page.png'}
                backgroundSize={'cover'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition= {'center center'}
                backgroundAttachment={'fixed'}
                m={'0 auto'}>
                <Navbar />
                <Flex 
                    position={'absolute'}
                    height={'100%'}
                    width={'100%'}
                    justifyContent={'center'}
                    alignItems= {'center'}>
                    <Heading  
                        margin= {0}
                        padding= {0}
                        maxWidth={'45vw'}
                        fontSize={'60px'}
                        fontWeight={'bold'}
                        textAlign={'center'}>
                            Share Your Spaces Exclusively to Your Only Fans
                    </Heading>
                </Flex>
            </Box>
        </>
    );
}

export default Home;
