

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,Alert } from 'react-native';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (name === '' || mobile === '' || email === '' || message === '') {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    

    
try {
      const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
        personalizations: [
          {
            to: [
              {
                email: 'info@redpositive.in',
              },
            ],
            subject: 'Contact Us Form Submission',
          },
        ],
        from: {
          email: 'youremail@example.com',
        },
        content: [
          {
            type: 'text/plain',
            value: `
              Name: ${name}
              Mobile: ${mobile}
              Email: ${email}
              Message: ${message}
            `,
          },
        ],
      }, {
        headers: {
          'Authorization': `kv9b3T2HTRO2oguvkT9oGg`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 202) {
        setName('');
        setMobile('');
        setEmail('');
        setMessage('');
        Alert.alert('Success', 'Your message has been sent!');
      } else {
        Alert.alert('Error', 'Failed to send email');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send email');
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.headers}>CONTACT FORM</Text>
      
<View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        autoCapitalize="words"
        autoCompleteType="name"
        keyboardType="default"
        returnKeyType="next"
      />
      <Text style={styles.label}>Mobile Number:</Text>
      <TextInput
        style={styles.input}
        value={mobile}
        onChangeText={setMobile}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        returnKeyType="next"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Text style={styles.label}>Message:</Text>
      <TextInput
        style={[styles.input, styles.messageInput]}
        value={message}
        onChangeText={setMessage}
        placeholder="Enter your message"
        multiline
        numberOfLines={4}
      /></View>
        
       <Pressable style={styles.Btn} onPress={handleSubmit}>
      <Text style={styles.BtnText}>Submit</Text>
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop:30,
  },
  headers:{fontSize: 24,
    fontWeight: 'bold',
    alignItems:'center',
    marginLeft:80

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  messageInput: {
    height: 200,
  },
  Btn: {
        width: 220,
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        backgroundColor: 'dodgerblue',
        marginLeft:75
      },
      BtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
      },
});

export default ContactForm;





