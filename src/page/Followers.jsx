import {
    Button,
    Input,
    Flex,
    Box,
    Heading,
    Center,
} from '@chakra-ui/react';
import Follower from '../component/Follower.jsx';
import WaitingFollower from '../component/WaitingFollower.jsx';
import Navbar from '../component/Navbar.jsx';
import { Search2Icon } from '@chakra-ui/icons';
import { useState } from 'react';

function Followers() {
    const [isRequestPage, setRequestPage] = useState(false);

    function changeRequest() {
        if (isRequestPage) {
            document.getElementById('see-request-btn').innerText =
                'See Request';
        } else {
            document.getElementById('see-request-btn').innerText =
                'All Followers';
        }
        setRequestPage(!isRequestPage);
    }

    return (
        <>
            <Flex justify={'center'} margin={'0 auto'}>
                <Navbar />
                <Box
                    w={'80%'}
                    h={'100%'}
                    mt={'8%'}
                    justify={'center'}
                    flexDirection={'column'}
                >
                    <Flex
                        flexDirection={'row'}
                        justify={'space-between'}
                        align={'center'}
                        mb={'3%'}
                    >
                        <Heading>Followers</Heading>
                        <Flex
                            flexDirection={'row'}
                            gap={'20px'}
                            alignItems={'center'}
                        >
                            <Button
                                p={'0 40px'}
                                id='see-request-btn'
                                onClick={changeRequest}
                            >
                                See Request
                            </Button>
                            <Search2Icon boxSize={7} />
                            <Input placeholder='Search ' size='lg' />
                        </Flex>
                    </Flex>

                    {isRequestPage ? (
                        <Flex
                            flexDirection={'column'}
                            background={'ButtonHighlight'}
                            padding={'2%'}
                            borderRadius={'55px'}
                        >
                            <Center mb={'2%'}>
                                <Heading>Request</Heading>
                            </Center>
                            <Flex
                                justify={'left'}
                                align={'center'}
                                flexDirection={'row'}
                                flexWrap={'wrap'}
                                gap={'5%'}
                            >
                                <WaitingFollower />
                                <WaitingFollower />
                                <WaitingFollower />
                                <WaitingFollower />
                                <WaitingFollower />
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex
                            justify={'left'}
                            align={'center'}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'5%'}
                        >
                            <Follower />
                            <Follower />
                        </Flex>
                    )}
                </Box>
            </Flex>
        </>
    );
}

export default Followers;
