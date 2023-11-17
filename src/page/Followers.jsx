import { Button, Input, Flex, Box, Heading, Center } from '@chakra-ui/react';
import Follower from '../component/Follower.jsx';
import WaitingFollower from '../component/WaitingFollower.jsx';
import Navbar from '../component/Navbar.jsx';
import { Search2Icon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFollowers, getPendingFollowers } from '../api/following.js';

function Followers() {
    const navigate = useNavigate();

    const [isRequestPage, setRequestPage] = useState(false);
    const [requests, setRequests] = useState([])
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        // Check if userID is not set in localStorage, then redirect to home page
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
        getFollowers(localStorage.getItem("userID"), "").then(res => {
            console.log(res)
            setFollowers(res.data.data)
        }).catch(err => console.log(err))
    }, []);

    const changeRequest = async () => {
        if(isRequestPage){
            await getFollowers(localStorage.getItem("userID")).then(res => {setFollowers(res.data.data)}).catch(err => console.log(err))
            document.getElementById('see-request-btn').innerText =
                'See Request';
        } else {
            await getPendingFollowers(localStorage.getItem("userID")).then(res => setRequests(res.data.data)).catch(err => console.log(err))
            document.getElementById('see-request-btn').innerText =
                'All Followers';
        }
        setRequestPage(!isRequestPage);
    }

    const handleChange = async (e) => {
        getFollowers(localStorage.getItem("userID"), e.target.value).then(res => {
            console.log(res)
            setFollowers(res.data.data)
        }).catch(err => console.log(err))
    }

    return (
        <>
            <Flex justify={'center'} margin={'0 auto'}>
                <Navbar />
                <Box
                    w={'80%'}
                    h={'100%'}
                    mt={{ base:'30%', sm:'20%', lg: '8%' }}
                    justify={'center'}
                    flexDirection={'column'}
                >
                    <Flex
                        flexDirection={{ base:'column', lg:'row'}}
                        justify={'space-between'}
                        align={{ base:'left', lg:'center'}}
                        mb={'3%'}
                        gap={{ base:'15px', sm:'30px', lg:'0'}}
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
                            <Input placeholder='Search ' size='lg' onChange={handleChange} />
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
                                align={'center'}
                                flexDirection={'row'}
                                flexWrap={'wrap'}
                                gap={'5%'}
                                width={'100%'}
                                justify={{ base:'center', sm:'left'}}
                            >
                                {
                                    requests.map(req => 
                                        <WaitingFollower key={req.followerID} username={req.followerUsername} fullname={req.followerName} id={req.followerID}/>)
                                }
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex
                            justify={{ base:'center', sm:'left'}}
                            align={'center'}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'5%'}
                        >
                            {
                                followers.map(fol => <Follower key={fol.followerID} username={fol.followerUsername} fullname={fol.followerName} id={fol.followerID}/>)
                            }
                        </Flex>
                    )}
                </Box>
            </Flex>
        </>
    );
}

export default Followers;