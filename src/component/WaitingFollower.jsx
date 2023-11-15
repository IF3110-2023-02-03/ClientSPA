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

function Follower({username, fullname, id}) {

    return (
        <>
            <Card flex shadow={'2xl'} w={'30%'} mb={'3%'}>
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
                                {/* <Flex
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    gap={'10px'}
                                >
                                    <Image
                                        src='../../assets/check.png'
                                        h={'20px'}
                                        w={'20px'}
                                    />
                                    <Text>120 Following</Text>
                                    <Image
                                        src='../../assets/date.png'
                                        h={'20px'}
                                        w={'20px'}
                                    />
                                    <Text>12 Posts</Text>
                                </Flex> */}
                            </Flex>
                            <Divider mt={'20px'} />
                            <Flex flexDirection={'row'} gap={'5%'}>
                                <Button
                                    text={'Delete From Followers'}
                                    w={'100%'}
                                    onClick={() => 
                                        confirmFollow(localStorage.getItem("userID"), id, true)
                                            .then(res => console.log(res))
                                            .catch(err => console.log(err))
                                    }
                                >
                                    Approve
                                </Button>
                                <Button
                                    text={'Delete From Followers'}
                                    w={'100%'}
                                    onClick={() => 
                                        confirmFollow(localStorage.getItem("userID"), id, false)
                                            .then(res => console.log(res))
                                            .catch(err => console.log(err))
                                    }
                                >
                                    Delete
                                </Button>
                            </Flex>
                        </Box>
                    </Flex>
                </CardBody>
            </Card>
        </>
    );
}

export default Follower;
