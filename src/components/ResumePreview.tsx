import { useRef } from 'react';
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Divider,
    HStack,
    Flex,
    Badge,
} from '@chakra-ui/react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = ({ userData }: { userData: any }) => {
    const previewRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!previewRef.current) return;

        const canvas = await html2canvas(previewRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('portrait', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
    };
    const validExperience = Array.isArray(userData.experience)
        ? userData.experience.filter(
            (item: { Job_title?: string; Job_description?: string }) =>
                item.Job_title?.trim() || item.Job_description?.trim()
        )
        : [];
    const validSkill = Array.isArray(userData.skills) ? userData.skills.filter((skill: string) => skill.trim()) : [];
    // console.log('debugging experience', userData.experience.length)
    // console.log('debugging skills', userData.skills)
    // console.log('valid experience', validExperience.length)
    // console.log("valid skill", validSkill.length)

    return (
        <Box>
            {/* Resume Preview Container */}
            <Box
                ref={previewRef}
                p={6}
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                w={{ base: '100%', md: '80%' }}
                mx="auto"
                fontFamily="Arial, sans-serif"
                color="gray.700"
            >
                {/* Header Section */}
                <VStack spacing={2} align="flex-start">
                    <Heading as="h2" size="lg" color="teal.500">
                        {userData.name || 'Your Name'}
                    </Heading>
                    <Text fontSize="md">
                        {userData.email || 'example@email.com'} |{' '}
                        {userData.phone || '123-456-7890'}
                    </Text>
                </VStack>

                <Divider my={4} />

                {/* Summary Section */}
                {userData.summary && (
                    <Box mb={6}>
                        <Heading as="h3" size="md" color="teal.400" mb={2}>
                            Professional Summary
                        </Heading>
                        <Text>{userData.summary || 'A brief summary about yourself.'}</Text>
                    </Box>
                )}

                {/* Education Section */}
                {userData.education && (
                    <Box mb={6}>
                        <Heading as="h3" size="md" color="teal.400" mb={2}>
                            Education
                        </Heading>
                        <Text>{userData.education || ''}</Text>
                    </Box>
                )}

                {/* Experience Section */}
                {/* {userData.experience && Array.isArray(userData.experience) && ( */}
                {validExperience && Array.isArray(validExperience) && validExperience?.length > 0 && (
                    <Box mb={6}>
                        <Heading as="h3" size="md" color="teal.400" mb={2}>
                            Experience
                        </Heading>
                        <VStack align="flex-start" spacing={4}>
                            {userData.experience.map(
                                (item: { Job_title: string; Job_description: string; company_name: string }, index: number) => (
                                    <Box
                                        key={index}
                                        w="full"
                                        p={4}
                                        borderWidth="1px"
                                        borderRadius="md"
                                        boxShadow="sm"
                                    >
                                        <Heading as="h4" size="sm" color="teal.600" mb={1}>
                                            {item.Job_title || 'Job Title Not Provided'}
                                        </Heading>
                                        <Text color='teal.600' mb={1}>
                                            {item.company_name}
                                        </Text>
                                        <Text color="gray.700" fontSize="sm">
                                            {item.Job_description || 'Job Description Not Provided'}
                                        </Text>
                                    </Box>
                                )
                            )}
                        </VStack>
                    </Box>
                )}


                {/* Skills Section */}
                {validSkill && userData.skills.length > 0 && (
                    <Box>
                        <Heading as="h3" size="md" color="teal.400" mb={2}>
                            Skills
                        </Heading>
                        <HStack wrap="wrap" spacing={2}>
                            {Array.isArray(userData.skills) ? (
                                userData.skills.map((skill: string, index: number) => (
                                    <Badge
                                        key={index}
                                        colorScheme="teal"
                                        variant="solid"
                                        px={2}
                                        py={1}
                                        borderRadius="md"
                                    >
                                        {skill.trim()}
                                    </Badge>
                                ))
                            ) : (
                                <Text color="red.500">Skills data is not in the correct format</Text>
                            )}
                        </HStack>
                    </Box>
                )}
            </Box>

            {/* Download Button */}
            <Flex justifyContent="center" mt={6}>
                <Button colorScheme="teal" onClick={handleDownload}>
                    Download Resume
                </Button>
            </Flex>
        </Box>
    );
};

export default ResumePreview;
