import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Flex,
    Heading,
    Image,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    Text,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Follower from '../component/Follower.jsx';
import WaitingFollower from '../component/WaitingFollower.jsx';
import Navbar from '../component/Navbar.jsx';
import ButtonWhite from '../component/ButtonWhite.jsx';
import { Search2Icon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { userInfo, updateUser } from '../api/account.js';

function Account() {
    function refreshUser() {
        userInfo()
            .then(response => {
                const { data } = response.data;
                setUser({
                    username: data.user.username,
                    fullname: data.user.fullname,
                    description: data.user.description,
                    profilePicture: data.user.pp_url,
                    broadcastCount: data.broadcastCount,
                    objectCount: data.objectCount,
                });
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }
    
    useEffect(() => {
        refreshUser();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const {
        isOpen: isOpen1,
        onOpen: onOpen1,
        onClose: onClose1,
    } = useDisclosure();
    const {
        isOpen: isOpen2,
        onOpen: onOpen2,
        onClose: onClose2,
    } = useDisclosure();
    const {
        isOpen: isOpen3,
        onOpen: onOpen3,
        onClose: onClose3,
    } = useDisclosure();
    const {
        isOpen: isOpen4,
        onOpen: onOpen4,
        onClose: onClose4,
    } = useDisclosure();
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        description: '',
        profilePicture: '',
        broadcastCount: 0,
        objectCount: 0,
    });

    const [instruction, setInstruction] = useState('');

    const [newDescription, setNewDescription] = useState('');
    const handleEditDescription = async () => {
        try {
            if (newDescription == '') {
                setInstruction('Updated description cannot be empty');
            } else {
                await updateUser(user.username, user.fullname, newDescription);
                // Fetch updated user info after the change
                await refreshUser();
                onClose1(); // Close the modal after updating
            }
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    const handleUploadProfilePicture = async (newProfilePicture) => {
        try {
            // Perform the logic for updating the profile picture here


            await updateUser(user.username, user.fullname, user.description, newProfilePicture);
            // Fetch updated user info after the change
            const updatedUserInfo = await userInfo();
            setUser(updatedUserInfo.data);
            onClose2(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    const [newUsername, setNewUsername] = useState('');
    const handleChangeUsername = async () => {
        try {
            if (newUsername == '') {
                setInstruction('Updated username cannot be empty');
            } else {
                await updateUser(newUsername, user.fullname, user.description);
                // Fetch updated user info after the change
                await refreshUser();
                onClose3(); // Close the modal after updating
            }
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const [newName, setNewName] = useState('');
    const handleChangeName = async () => {
        try {
            if (newName == '') {
                setInstruction('Updated name cannot be empty');
            } else {
                await updateUser(user.username, newName, user.description);
                // Fetch updated user info after the change
                await refreshUser();
                onClose4(); // Close the modal after updating
            }
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };

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
                        <Heading>Account</Heading>
                        <Flex
                            flexDirection={'row'}
                            gap={'20px'}
                            alignItems={'center'}
                        >
                            <Button p={'0 40px'} id='see-request-btn'>
                                Logout
                            </Button>
                        </Flex>
                    </Flex>
                    <Card flex shadow={'2xl'} w={'100%'} mb={'3%'}>
                        <CardBody padding={'3% 1%'}>
                            <Flex
                                flexDirection={'row'}
                                justifyContent={'space-around'}
                            >
                                <Image
                                    src={user.profilePicture}
                                    width={'50vh'}
                                    height={'50vh'}
                                    objectFit={'cover'}
                                />
                                <Box width={'45%'}>
                                    <Flex justifyContent={'right'} mb={'20px'}>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button>Manage Account</Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                w={'-moz-fit-content'}
                                            >
                                                <PopoverArrow />
                                                <Button onClick={onOpen1}>
                                                    Edit Description
                                                </Button>
                                                <Modal
                                                    onClose={onClose1}
                                                    isOpen={isOpen1}
                                                    isCentered
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>
                                                            Edit Description
                                                        </ModalHeader>
                                                        <ModalCloseButton />
                                                        <Textarea
                                                            type='description'
                                                            id='desc'
                                                            placeholder='Description'
                                                            w={'90%'}
                                                            m={'5%'}
                                                            onChange={event =>
                                                                setNewDescription(
                                                                    event.target
                                                                    .value
                                                                    )
                                                                }
                                                        />
                                                        <Text
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 20%'}>{instruction}
                                                        </Text>
                                                        <Button id='submit-photo' onClick={handleEditDescription}>
                                                            Update
                                                        </Button>
                                                    </ModalContent>
                                                </Modal>
                                                <Button onClick={onOpen2}>
                                                    Change Profile Picture
                                                </Button>
                                                <Modal
                                                    onClose={onClose2}
                                                    isOpen={isOpen2}
                                                    isCentered
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>
                                                            Change Profile
                                                            Picture
                                                        </ModalHeader>
                                                        <ModalCloseButton />
                                                        <Image
                                                            src='../../assets/home-page.png'
                                                            maxHeight={'30%'}
                                                            maxWidth={'100%'}
                                                            objectFit={
                                                                'contain'
                                                            }
                                                            id='add-photo-display'
                                                        />
                                                        <Center m={'4% 0'}>
                                                            <label htmlFor='file-input'>
                                                                <ButtonWhite
                                                                    text={
                                                                        'Choose File'
                                                                    }
                                                                />
                                                            </label>
                                                        </Center>
                                                        <Input
                                                            type='file'
                                                            id='file-input'
                                                            display={'none'}
                                                        />
                                                        <Button id='submit-photo'>
                                                            Update
                                                        </Button>
                                                    </ModalContent>
                                                </Modal>
                                                <Button onClick={onOpen3}>
                                                    Change Username
                                                </Button>
                                                <Modal
                                                    onClose={onClose3}
                                                    isOpen={isOpen3}
                                                    isCentered
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>
                                                            Change Username
                                                        </ModalHeader>
                                                        <ModalCloseButton />
                                                        <Input
                                                            type='description'
                                                            id='desc'
                                                            placeholder='New Username'
                                                            w={'90%'}
                                                            m={'5%'}
                                                            onChange={event =>
                                                                setNewUsername(
                                                                    event.target
                                                                    .value
                                                                    )
                                                                }
                                                        />
                                                        <Text
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 20%'}>{instruction}
                                                        </Text>
                                                        <Button id='submit-photo' onClick={handleChangeUsername}>
                                                            Update
                                                        </Button>
                                                    </ModalContent>
                                                </Modal>
                                                <Button onClick={onOpen4}>
                                                    Change Name
                                                </Button>
                                                <Modal
                                                    onClose={onClose4}
                                                    isOpen={isOpen4}
                                                    isCentered
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>
                                                            Change Name
                                                        </ModalHeader>
                                                        <ModalCloseButton />
                                                        <Input
                                                            type='description'
                                                            id='desc'
                                                            placeholder='New Name'
                                                            w={'90%'}
                                                            m={'5%'}
                                                            onChange={event =>
                                                                setNewName(
                                                                    event.target
                                                                    .value
                                                                    )
                                                                }
                                                        />
                                                        <Text
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 20%'}>{instruction}
                                                        </Text>
                                                        <Button id='submit-photo' onClick={handleChangeName}>
                                                            Update
                                                        </Button>
                                                    </ModalContent>
                                                </Modal>
                                            </PopoverContent>
                                        </Popover>
                                    </Flex>
                                    <Flex
                                        height={'70%'}
                                        flexDirection={'column'}
                                        alignItems={'center'}
                                        verticalAlign={'center'}
                                        justify={'center'}
                                    >
                                        <Heading as={'h2'}>
                                            {user.fullname}
                                        </Heading>
                                        <Text fontSize={'24px'}>
                                            @{user.username}
                                        </Text>
                                        <br></br>
                                        <Text textAlign={'center'}>
                                            {user.description}
                                        </Text>
                                        <br></br>
                                        <Flex
                                            m={'10px 0 5px 0'}
                                            flexDirection={'row'}
                                        >
                                            <Flex
                                                flexDirection={'row'}
                                                alignItems={'center'}
                                                gap={'20px'}
                                            >
                                                <Image
                                                    src='../../assets/check.png'
                                                    h={'20px'}
                                                    w={'20px'}
                                                />
                                                <Text>190 Followers</Text>
                                                <Image
                                                    src='../../assets/image.png'
                                                    h={'20px'}
                                                    w={'20px'}
                                                />
                                                <Text>
                                                    {user.objectCount} Exclusive Content
                                                </Text>
                                                <Image
                                                    src='../../assets/signal.png'
                                                    h={'20px'}
                                                    w={'20px'}
                                                />
                                                <Text>{user.broadcastCount} Broadcast</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        </CardBody>
                    </Card>
                </Box>
            </Flex>
        </>
    );
}

export default Account;
