import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const ResumePDF = ({ userData }: { userData: any }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontSize: 12,
            fontFamily: 'Helvetica',
            color: '#333',
        },
        section: {
            marginBottom: 20,
            paddingBottom: 10,
            borderBottom: '1px solid #ccc',
        },
        header: {
            fontSize: 20,
            marginBottom: 10,
            fontWeight: 'bold',
            color: '#2c3e50',
        },
        subHeader: {
            fontSize: 14,
            marginBottom: 8,
            fontWeight: 'bold',
            color: '#34495e',
        },
        text: {
            marginBottom: 5,
            lineHeight: 1.5,
        },
        skill: {
            marginRight: 8,
            marginBottom: 8,
            paddingHorizontal: 5,
            paddingVertical: 3,
            border: '1px solid #2c3e50',
            borderRadius: 5,
            fontSize: 10,
            color: '#2c3e50',
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        contactInfo: {
            fontSize: 12,
            marginBottom: 5,
            color: '#7f8c8d',
        },
        companyName: {
            fontStyle: 'italic',
            fontSize: 12,
            color: '#7f8c8d',
        },
    });

    return (
        <Document>
            <Page style={styles.page}>
                {/* Header Section */}
                <View style={styles.section}>
                    <Text style={styles.header}>{userData.name || 'Your Name'}</Text>
                    <Text style={styles.contactInfo}>{userData.email || 'example@email.com'}</Text>
                    <Text style={styles.contactInfo}>{userData.phone || '123-456-7890'}</Text>
                </View>

                {/* Summary Section */}
                {userData.summary && (
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Professional Summary</Text>
                        <Text style={styles.text}>{userData.summary}</Text>
                    </View>
                )}

                {/* Education Section */}
                {userData.education && (
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Education</Text>
                        <Text style={styles.companyName}>{userData.institution}</Text>
                        <Text style={styles.text}>{userData.education}</Text>
                    </View>
                )}

                {/* Experience Section */}
                {userData.experience && Array.isArray(userData.experience) && userData.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Experience</Text>
                        {userData.experience.map((item: any, index: number) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>{item.Job_title || 'Job Title Not Provided'}</Text>
                                <Text style={styles.companyName}>{item.company_name}</Text>
                                <Text style={styles.text}>{item.Job_description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills Section */}
                {userData.skills && Array.isArray(userData.skills) && userData.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.subHeader}>Skills</Text>
                        <View style={styles.skillsContainer}>
                            {userData.skills.map((skill: string, index: number) => (
                                <Text key={index} style={styles.skill}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ResumePDF;
