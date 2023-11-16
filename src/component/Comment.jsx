import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { deleteBroadcastComment } from '../api/broadcast.js';
import { deleteContentComment } from '../api/content.js';
import { useState } from 'react';

function Comment({id, type, user, message}) {
    const [deleted, setDeleted] = useState(false);

    const processDeleteComment = async () => {
        if (type == 'Broadcast') {
            try {
                await deleteBroadcastComment(id);
                setDeleted(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await deleteContentComment(id);
                setDeleted(true);
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (deleted) {
        return (<></>)
    } else {
        return (
            <>
                <Flex
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box>
                        <Text as={'b'}>{user}</Text>
                        <Text>{message}</Text>
                    </Box>
                    <Flex flexDirection={'row'}>
                        <DeleteIcon onClick={processDeleteComment}/>
                    </Flex>
                </Flex>
            </>
        );
    }
}

export default Comment;
