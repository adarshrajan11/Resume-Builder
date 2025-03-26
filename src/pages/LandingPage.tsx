import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            minH="100vh"
            bgGradient="linear(to-r, teal.400, blue.500)"
            color="gray.950" // Use slightly less white for better contrast
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Stack textAlign="center" direction="column">
                <Heading as="h1" size="2xl">Resume Builder</Heading>
                <Text fontSize="lg">Easily create professional resumes in minutes.</Text>
                <Button
                    size="lg"
                    colorScheme="teal"
                    onClick={() => navigate('/builder')}
                >
                    Start Building
                </Button>
            </Stack>
        </Box>
    );
};

export default LandingPage;
