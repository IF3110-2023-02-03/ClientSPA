import Navbar from '../component/Navbar.jsx';
import '../style/HomePage.css';
import { Box } from '@chakra-ui/react';

function Home() {
    return (
        <>
            <Box className='wrapper'>
                <Navbar />
                <Box className='hello-text'>
                    <h1>Share Your Spaces Exclusively to Your Only Fans</h1>
                </Box>
            </Box>
        </>
    );
}

export default Home;
