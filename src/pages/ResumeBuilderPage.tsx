import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Grid,
    VStack,
    Heading,
    Text,
    Divider,
    Tag,
    TagLabel,
    TagCloseButton,
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import ResumePreview from '../components/ResumePreview';
import ResumePDF from '../components/ResumePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';

const ResumeBuilderPage = () => {
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        education: '',
        institution: '',
        experience: [
            {
                company_name: '',
                Job_title: '',
                Job_description: '',
            },
        ],
        skills: [''],
    };

    const [userData, setUserData] = useState(initialValues);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
        education: Yup.string().required('Education details are required'),
        experience: Yup.array()
            .of(
                Yup.object().shape({
                    Job_title: Yup.string().required('Job title is required'),
                    Job_description: Yup.string().required('Job description is required'),
                })
            )
            .min(1, 'At least one experience is required'),
        skills: Yup.array()
            .of(Yup.string().required('Skill cannot be empty'))
            .min(1, 'At least one skill is required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log('Form data submitted:', values);
        setUserData(values);
    };
    console.log("From Resume builder page", userData)
    return (
        <Box minH="100vh" bg="gray.50" p={4}>
            <Grid
                templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                gap={8}
            >
                {/* Form Section */}
                <Box bg="white" p={8} borderRadius="md" boxShadow="md">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <VStack spacing={4}>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Field
                                            as={Input}
                                            name="name"
                                            placeholder="Enter your name"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const name = e.target.value;
                                                setFieldValue('name', name)
                                                setUserData({ ...userData, name });
                                            }}
                                        />
                                        <ErrorMessage name="name">
                                            {msg => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                        </ErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Field
                                            as={Input}
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const email = e.target.value;
                                                setFieldValue('email', email); // Update Formik's state
                                                // setFieldValue('emailVerified', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // Check for valid email
                                                setUserData(prev => ({ ...prev, email })); // Update local state
                                            }}
                                        />
                                        <ErrorMessage name="email">
                                            {msg => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                        </ErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Field
                                            as={Input}
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const phone = e.target.value;
                                                setFieldValue('phone', phone);
                                                setUserData({ ...userData, phone });
                                            }}
                                        />
                                        <ErrorMessage name="phone">
                                            {msg => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                        </ErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Institution Name</FormLabel>
                                        <Field
                                            as={Input}
                                            name="institution"
                                            placeholder="Enter institution name"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const institution = e.target.value;
                                                setFieldValue('institution', institution);
                                                setUserData({ ...userData, institution });
                                            }}
                                        />
                                        <ErrorMessage name="institution">
                                            {msg => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                        </ErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Education</FormLabel>
                                        <Field
                                            as={Textarea}
                                            name="education"
                                            placeholder="Enter your latest Qualificatioon"
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                const education = e.target.value;
                                                setFieldValue('education', education);
                                                setUserData({ ...userData, education });

                                            }}
                                        />
                                        <ErrorMessage name="education">
                                            {msg => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                        </ErrorMessage>
                                    </FormControl>

                                    {/* Experience Field Array */}


                                    <FormControl>
                                        <FormLabel>Experience</FormLabel>
                                        <FieldArray
                                            name="experience"
                                            render={(arrayHelpers) => (
                                                <VStack align="start" spacing={4}>
                                                    {values.experience.map((exp, index) => (
                                                        <Box key={index} w="full">

                                                            <Field
                                                                as={Input}
                                                                name={`experience.${index}.company_name`}
                                                                placeholder="Enter company name"
                                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                                    setFieldValue(`experience.${index}.company_name`, e.target.value);
                                                                    const updatedExperience = [...userData.experience];
                                                                    updatedExperience[index].company_name = e.target.value;
                                                                    setUserData({ ...userData, experience: updatedExperience });

                                                                }}
                                                            />

                                                            <Field
                                                                as={Textarea}
                                                                name={`experience.${index}.Job_title`}
                                                                placeholder="Enter Job Title"
                                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                                    const updatedExperience = [...userData.experience];
                                                                    updatedExperience[index] = {
                                                                        ...updatedExperience[index],
                                                                        Job_title: e.target.value,
                                                                    };
                                                                    setUserData({ ...userData, experience: updatedExperience });
                                                                    setFieldValue(`experience.${index}.Job_title`, e.target.value);
                                                                }}
                                                            />
                                                            <ErrorMessage name={`experience.${index}.Job_title`}>
                                                                {(msg) => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                                            </ErrorMessage>


                                                            <Field
                                                                as={Textarea}
                                                                name={`experience.${index}.Job_description`}
                                                                placeholder="Enter Job Description"
                                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                                    const updatedExperience = [...userData.experience];
                                                                    updatedExperience[index] = {
                                                                        ...updatedExperience[index],
                                                                        Job_description: e.target.value,
                                                                    };
                                                                    setUserData({ ...userData, experience: updatedExperience });
                                                                    setFieldValue(`experience.${index}.Job_description`, e.target.value);
                                                                }}
                                                            />
                                                            <ErrorMessage name={`experience.${index}.Job_description`}>
                                                                {(msg) => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                                            </ErrorMessage>


                                                            <Button
                                                                size="sm"
                                                                colorScheme="red"
                                                                mt={2}
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Box>
                                                    ))}


                                                    <Button
                                                        size="sm"
                                                        colorScheme="teal"
                                                        onClick={() =>
                                                            arrayHelpers.push({
                                                                Job_title: '',
                                                                Job_description: '',
                                                                company_name: ''
                                                            })
                                                        }
                                                    >
                                                        Add Experience
                                                    </Button>
                                                </VStack>
                                            )}
                                        />
                                    </FormControl>




                                    {/* Skills Field Array */}
                                    <FormControl>
                                        <FormLabel>Skills</FormLabel>
                                        <FieldArray
                                            name="skills"
                                            render={arrayHelpers => (
                                                <VStack align="start" spacing={2}>
                                                    {values.skills.map((skill, index) => (
                                                        <Box key={index} w="full">
                                                            <Field
                                                                as={Input}
                                                                name={`skills.${index}`}
                                                                placeholder="Enter a skill"
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    setFieldValue(`skills.${index}`, e.target.value);
                                                                    const updatedSkills = [...userData.skills];
                                                                    updatedSkills[index] = e.target.value;
                                                                    setUserData({ ...userData, skills: updatedSkills });
                                                                }}
                                                            />
                                                            <ErrorMessage name={`skills.${index}`}>
                                                                {msg => <Text color="red.500" fontSize="sm">{msg}</Text>}
                                                            </ErrorMessage>
                                                            <Button
                                                                size="sm"
                                                                colorScheme="red"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Box>
                                                    ))}
                                                    <Button
                                                        size="sm"
                                                        colorScheme="teal"
                                                        onClick={() => arrayHelpers.push('')}
                                                    >
                                                        Add Skill
                                                    </Button>
                                                </VStack>
                                            )}
                                        />
                                    </FormControl>

                                    <Button type="submit" colorScheme="teal" w="full">
                                        Save & Continue
                                    </Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </Box>

                {/* Resume Preview Section */}
                <ResumePreview userData={userData} />
                <ResumePDF userData={userData} />
                <div style={{ height: "100vh", overflow: "hidden" }}>
                    <PDFDownloadLink document={<ResumePDF userData={userData} />} fileName="resume.pdf">

                        downLoad
                    </PDFDownloadLink>
                </div>
            </Grid>
        </Box >
    );
};

export default ResumeBuilderPage;