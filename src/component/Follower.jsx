import {
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    Image,
    Text,
    Heading,
} from '@chakra-ui/react';
import { confirmFollow } from '../api/following';
import { useState } from 'react';

function Follower({username, fullname, id}) {
    const [deleted, setDeleted] = useState(false);

    const processDeleteFollower = async () => {
        await confirmFollow(localStorage.getItem("userID"), id, false);
        setDeleted(true);
    }

    if (deleted) {
        return (<></>);
    } else {
        return (
            <>
                <Card 
                    flex shadow={'2xl'} 
                    w={{ base:'80%', sm:'45%', md: '30%'}} 
                    mb={'3%'}>
                    <CardBody>
                        <Flex
                            flexDirection={'row'}
                            gap={'5%'}
                            justifyContent={'space-around'}
                        >
                            <Box width={'95%'}>
                                <Heading as={'h2'}>{fullname}</Heading>
                                <Text>@{username}</Text>
                                <Flex m={'10px 0 5px 0'} flexDirection={'row'}>
                                    {}
                                </Flex>
                                <Divider mt={'20px'} />
                                <Button 
                                    text={'Delete From Followers'} 
                                    w={'100%'}
                                    onClick={processDeleteFollower}
                                >
                                    Delete From Followers
                                </Button>
                            </Box>
                        </Flex>
                    </CardBody>
                </Card>
            </>
        );
    }
}

export default Follower;
