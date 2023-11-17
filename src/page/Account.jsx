import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Flex,
    FormLabel,
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
import Navbar from '../component/Navbar.jsx';
import { useEffect, useState } from 'react';
import { userInfo, updateUser, changeProfile, getSource, updateUsernameSOAP, updateFullnameSOAP, getFollowersCount } from '../api/account.js';
import { useNavigate } from 'react-router-dom';

function Account() {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState('');

    function refreshUser() {
        userInfo()
            .then((response) => {
                const { data } = response.data;
                setUser({
                    username: data.user.username,
                    fullname: data.user.fullname,
                    description: data.user.description,
                    profilePicture: data.user.pp_url,
                    broadcastCount: data.broadcastCount,
                    objectCount: data.objectCount,
                });
                displayImage(data.user.pp_url);
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    }

    useEffect(() => {
        // Check if userID is not set in localStorage
        const userID = localStorage.getItem('userID');
        if (!userID) {
            navigate('/'); // Redirect to home page
        } else {
            refreshUser(); // Fetch user info
            getFollowerCount();
        }
    }, [navigate]);

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

    useEffect(() => {
        if (isOpen1) {
            setInstruction('');
        }
    }, [isOpen1]);

    useEffect(() => {
        if (isOpen2) {
            setInstruction('');
        }
    }, [isOpen2]);

    useEffect(() => {
        if (isOpen3) {
            setInstruction('');
        }
    }, [isOpen3]);

    useEffect(() => {
        if (isOpen4) {
            setInstruction('');
        }
    }, [isOpen4]);

    const [instruction, setInstruction] = useState('');

    const [newDescription, setNewDescription] = useState('');
    const handleEditDescription = async () => {
        try {
            if (newDescription == '') {
                setInstruction('Updated description cannot be empty');
            } else {
                await updateUser(
                    user.username,
                    user.fullname,
                    newDescription,
                    user.profilePicture,
                );
                // Fetch updated user info after the change
                await refreshUser();
                onClose1(); // Close the modal after updating
            }
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    const [usernameValid, setUsernameValid] = useState(true);
    const [newUsername, setNewUsername] = useState('');
    const handleChangeUsername = async () => {
        try {
            if (newUsername == '') {
                setUsernameValid(false);
                setInstruction('Updated username cannot be empty');
            } else {
                if (usernameValid) {
                    await updateUser(
                        newUsername,
                        user.fullname,
                        user.description,
                        user.profilePicture,
                    );
                    await updateUsernameSOAP(user.username, newUsername);
                    // Fetch updated user info after the change
                    await refreshUser();
                    onClose3(); // Close the modal after updating
                }
            }
        } catch (error) {
            // Handle errors
            const { data } = error.response;

            if (data.message === 'Username already taken!') {
                setInstruction('Username already exists.');
            } else {
                setInstruction('Error updating username.');
            }
        }
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);

        if (!e.target.value) {
            setUsernameValid(false);
            setInstruction('Updated username cannot be empty');
        } else if (!/^\w+$/.test(e.target.value)) {
            setUsernameValid(false);
            setInstruction('Invalid username format.');
        } else {
            setUsernameValid(true);
            setInstruction('');
        }
    };

    const [newName, setNewName] = useState('');
    const [nameValid, setNameValid] = useState(true);
    const handleChangeName = async () => {
        try {
            if (newName == '') {
                setNameValid(false);
                setInstruction('Updated name cannot be empty');
            } else {
                if (nameValid) {
                    await updateUser(
                        user.username,
                        newName,
                        user.description,
                        user.profilePicture,
                    );
                    await updateFullnameSOAP(user.fullname, newName);
                    // Fetch updated user info after the change
                    await refreshUser();
                    onClose4(); // Close the modal after updating
                }
            }
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);

        if (!e.target.value) {
            setNameValid(false);
            setInstruction('Updated name cannot be empty');
        } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
            setNameValid(false);
            setInstruction('Invalid name format.');
        } else {
            setNameValid(true);
            setInstruction('');
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.clear();
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);

    const preview = () => {
        if (!selectedFile) {
          return (
              <Image
                  src='../../assets/no-image.jpg'
                  maxHeight={'30vh'}
                  maxWidth={'100%'}
                  objectFit={'contain'}
                  id='add-photo-display'
              /> 
        )} else {
          const reader = new FileReader();
          reader.onload = () => setPreviewFile(reader.result);
          reader.readAsDataURL(selectedFile);
            return (
                <Image
                    src={previewFile}
                    maxHeight={'30vh'}
                    maxWidth={'100%'}
                    objectFit={'contain'}
                    id='add-photo-display'
                />
            )
        }
      };

      const processChangeProfile = async () => {
        try {
            if (!selectedFile) {
                setInstruction('No File Chosen');
            } else {
                const formData = new FormData();
                formData.append("userID", localStorage.getItem('userID'));
                formData.append("file", selectedFile);
                formData.append("previousPath", currentImage)
                let res = await changeProfile(formData);
                displayImage(res.data.newPath);
                onClose2();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [displayFile, setDisplayFile] = useState(null);
    const displayImage = async (path) => {
        if (path) {
            let res = await getSource(path);
            const reader = new FileReader();
            reader.onload = () => setDisplayFile(reader.result);
            reader.readAsDataURL(res.data);
            setCurrentImage(path);
        }
    }

    const [followerCount, setFollowerCount] = useState(0);
    const getFollowerCount = async () => {
        getFollowersCount()
            .then(res => setFollowerCount(res.data.count))
            .catch(err => console.log(err))
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
                        flexDirection={'row'}
                        justify={'space-between'}
                        align={'center'}
                        mb={'3%'}
                    >
                        <Heading fontSize={{ base:'25px', sm: '30px' }}>Account</Heading>
                        <Flex
                            flexDirection={'row'}
                            gap={'20px'}
                            alignItems={'center'}
                        >
                            <Button
                                p={'0 40px'}
                                id='see-request-btn'
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Flex>
                    </Flex>
                    <Card flex shadow={'2xl'} w={'100%'} mb={'3%'}>
                        <CardBody padding={'3% 1%'}>
                            <Flex
                                flexDirection={{ base:'column', xl: 'row'}}
                                justifyContent={'space-around'}
                            >
                                <Image
                                    src={displayFile}
                                    width={{ base:'20vh', md:'30vh', lg: '40vh', xl: '50vh'}}
                                    height={{ base:'20vh', md:'30vh', lg: '40vh', xl: '50vh'}}
                                    objectFit={'cover'}
                                    alignSelf={'center'}
                                    mb={{ base: '20px', xl:'0' }}
                                />
                                <Box width={{ base:'100%', xl: '45%'}}>
                                    <Flex justifyContent={{ base:'center', xl: 'right'}} mb={'20px'}>
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
                                                            onChange={(event) =>
                                                                setNewDescription(
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <Text
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 5%'}
                                                            textAlign={'center'}
                                                        >
                                                            {instruction}
                                                        </Text>
                                                        <Button
                                                            id='submit-photo'
                                                            onClick={
                                                                handleEditDescription
                                                            }
                                                        >
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
                                                        {preview()}
                                                        <Center mt={'4%'}>
                                                            <FormLabel 
                                                                htmlFor='file-input'
                                                                border={'2px solid black'}
                                                                borderRadius={'15px'}
                                                                textAlign={'center'}
                                                                padding={'10px 20px'}>
                                                                Choose File
                                                            </FormLabel>
                                                        </Center>
                                                        <Input
                                                            type='file'
                                                            id='file-input'
                                                            display={"none"}
                                                            accept=".jpg, .jpeg, .png"
                                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                                        />
                                                        <Center
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 5%'}
                                                        >
                                                            {instruction}
                                                        </Center>
                                                        <Button onClick={processChangeProfile}>
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
                                                            onChange={
                                                                handleUsernameChange
                                                            }
                                                        />
                                                        <Text
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 5%'}
                                                            textAlign={'center'}
                                                        >
                                                            {instruction}
                                                        </Text>
                                                        <Button
                                                            id='submit-photo'
                                                            onClick={
                                                                handleChangeUsername
                                                            }
                                                        >
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
                                                            onChange={
                                                                handleNameChange
                                                            }
                                                        />
                                                        <Text
                                                            color={'red'}
                                                            width={'90%'}
                                                            m={'0 0 5% 5%'}
                                                            textAlign={'center'}
                                                        >
                                                            {instruction}
                                                        </Text>
                                                        <Button
                                                            id='submit-photo'
                                                            onClick={
                                                                handleChangeName
                                                            }
                                                        >
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
                                            {user.description
                                                ? user.description
                                                : "You haven't added a description for your account"}
                                        </Text>
                                        <br></br>
                                        <Flex
                                            m={'10px 0 5px 0'}
                                            flexDirection={'row'}
                                        >
                                            <Flex
                                                flexDirection={{base:'column', md:'row' }}
                                                alignItems={'center'}
                                                gap={'20px'}
                                            >
                                                <Flex
                                                    flexDirection={'row'}
                                                    alignItems={'center'}
                                                    gap={'20px'}>
                                                        <Image
                                                            src='../../assets/check.png'
                                                            h={'20px'}
                                                            w={'20px'}
                                                        />
                                                        <Text>{followerCount} Followers</Text>
                                                </Flex>
                                                <Flex
                                                    flexDirection={'row'}
                                                    alignItems={'center'}
                                                    gap={'20px'}>
                                                        <Image
                                                            src='../../assets/image.png'
                                                            h={'20px'}
                                                            w={'20px'}
                                                        />
                                                        <Text>
                                                            {user.objectCount} Exclusive
                                                            Content
                                                        </Text>
                                                </Flex>
                                                <Flex
                                                    flexDirection={'row'}
                                                    alignItems={'center'}
                                                    gap={'20px'}>
                                                        <Image
                                                            src='../../assets/signal.png'
                                                            h={'20px'}
                                                            w={'20px'}
                                                        />
                                                        <Text>
                                                            {user.broadcastCount}{' '}
                                                            Broadcast
                                                        </Text>
                                                </Flex>
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
