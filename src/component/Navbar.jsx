import { Link } from 'react-router-dom';
// import '../style/Navbar.css';
import {
    Flex,
    Text,
} from '@chakra-ui/react';

function Navbar() {
    // generate authorized navbar
    if (localStorage.getItem('userID')) {
        return (
            <>
                <Flex     
                    width= {'100%'}
                    mt= {'2%'}
                    position= {'absolute'}
                    justifyContent= {'center'}
                    zIndex={'1'}>
                    <Flex 
                        height= {'68px'}
                        p= {'0 3%'}
                        backgroundColor={'white'}
                        border={'3px solid black'}
                        borderRadius={'50px'}
                        flexDirection= {'row'}
                        alignItems= {'center'}
                        justifyContent= {'center'}
                        gap= {'10%'}>
                        <NavbarItem path='/content' srcimg='../../assets/image.png' alt='Content' desc='Content'/>
                        <NavbarItem path='/broadcast' srcimg='../../assets/signal.png' alt='Broadcast' desc='Broadcast'/>
                        <NavbarItem path='/followers' srcimg='../../assets/check.png' alt='Followers' desc='Followers'/>
                        <NavbarItem path='/account' srcimg='../../assets/setting.png' alt='Account' desc='Account'/>
                    </Flex>
                </Flex>
            </>
        );
    }
    // generate unauthorized navbar
    else {
        return (
            <>
                <Flex     
                    width= {'100%'}
                    mt= {'2%'}
                    position= {'absolute'}
                    justifyContent= {'center'}
                    zIndex={'1'}>
                    <Flex 
                        height= {'68px'}
                        p= {'0 3%'}
                        backgroundColor={'white'}
                        border={'3px solid black'}
                        borderRadius={'50px'}
                        flexDirection= {'row'}
                        alignItems= {'center'}
                        justifyContent= {'center'}
                        gap= {'10%'}>
                        <NavbarItem path='/login' srcimg='../../assets/profile.png' alt='login' desc='Login'/>
                    </Flex>
                </Flex>
            </>
        );
    }
}

function NavbarItem({path, srcimg, alt, desc}) {
    return (
        <Link 
            to={path} 
            style= {{
                color: 'black', 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px'}}>
            <img
                src={srcimg}
                alt={alt}
                className='navbar-item-img'
                width= {'36px'}
                height= {'36px'}
                _hover= {{
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    transition: '0.3s'}}
            />
            <Text 
                textDecoration= {'none'}
                fontSize= {'16px'}
                _hover= {{
                    textDecoration: 'underline',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    transition: '0.3s',}}>
                    {desc}
            </Text>
        </Link>
    )
}

export default Navbar;
