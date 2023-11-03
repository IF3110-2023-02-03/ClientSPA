import { 
    Box,
    Button,
    Card, 
    CardBody,
    Center,
    Flex,
    IconButton,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    Stack,
    Text } from "@chakra-ui/react"
import { 
    EditIcon } from '@chakra-ui/icons'
import Comment from "./Comment.jsx"

function ContentVideo() {
    return (
      <>
        <Card 
            flex 
            shadow={"2xl"} 
            w={"80%"}
            mb={"3%"}>
            <CardBody>
                <Flex
                    flexDirection={"row"}
                    justifyContent={"space-around"}
                    width="100%">
                    <Center 
                        as="video"
                        controls 
                        src="../../assets/video.mp4"
                        w={"45%"}
                        maxHeight={"70vh"}
                        objectFit={"contain"}
                        objectPosition={"50% 50%"}/>
                    <Box
                        width={"45%"}>
                        <Flex 
                            justifyContent={"right"}
                            mb={"20px"}>
                            <Popover>
                                <PopoverTrigger>
                                    <IconButton 
                                        aria-label='Search database'
                                        bg={"white"} 
                                        icon={<EditIcon bg={"white"}/>} />
                                </PopoverTrigger>
                                <PopoverContent w={"-moz-fit-content"}>
                                    <PopoverArrow />
                                    <Button>Edit Description</Button>
                                    <Button>Delete Content</Button>
                                </PopoverContent>
                            </Popover>
                        </Flex>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupid
                            atat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        <Flex
                            m={"10px 0 5px 0"}
                            flexDirection={"row"}>
                            <Flex 
                                flexDirection={"row"}
                                alignItems={"center"}
                                gap={"20px"}>
                                <Image 
                                    src="../../assets/heart.png"
                                    h={"20px"}
                                    w={"20px"}/>
                                <Text>Likes</Text>
                            </Flex>
                        </Flex>
                        <Text 
                            as={"b"}
                            fontSize={"24px"}>Comments</Text>
                        <Stack 
                            maxHeight={"40vh"}
                            overflowY={"auto"}
                            m={"5px 0 30px 0"}>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                        </Stack>
                    </Box>
                </Flex>
            </CardBody>
        </Card>
      </>
    )
}
  
  export default ContentVideo