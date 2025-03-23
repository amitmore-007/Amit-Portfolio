// src/components/Contact.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully. I will get back to you soon!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <ContactSection id="contact">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact <span className="highlight">Me</span>
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Get in touch with me
        </motion.p>
        
        <ContactContainer>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactInfo>
              <ContactInfoTitle>Let's talk about everything!</ContactInfoTitle>
              <ContactInfoText>
                Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </ContactInfoText>
              
              <ContactInfoItem>
                <ContactInfoIcon>
                  <FaEnvelope />
                </ContactInfoIcon>
                <div>
                  <ContactInfoItemTitle>Email</ContactInfoItemTitle>
                  <ContactInfoItemText>example@example.com</ContactInfoItemText>
                </div>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactInfoIcon>
                  <FaPhoneAlt />
                </ContactInfoIcon>
                <div>
                  <ContactInfoItemTitle>Phone</ContactInfoItemTitle>
                  <ContactInfoItemText>+123 456 7890</ContactInfoItemText>
                </div>
              </ContactInfoItem>
              
              <ContactInfoItem>
                <ContactInfoIcon>
                  <FaMapMarkerAlt />
                </ContactInfoIcon>
                <div>
                  <ContactInfoItemTitle>Location</ContactInfoItemTitle>
                  <ContactInfoItemText>City, Country</ContactInfoItemText>
                </div>
              </ContactInfoItem>
            </ContactInfo>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormInput 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormInput 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormInput 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormTextarea 
                  name="message" 
                  rows="5" 
                  placeholder="Your Message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </FormButton>
              
              {submitMessage && (
                <SubmitMessage status={submitStatus}>
                  {submitMessage}
                </SubmitMessage>
              )}
            </ContactForm>
          </motion.div>
        </ContactContainer>
      </div>
    </ContactSection>
  );
};

export default Contact;

const ContactSection = styled.section`
  background-color: var(--secondary-color);
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const ContactInfoText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ContactInfoIcon = styled.div`
  background-color: rgba(56, 189, 248, 0.1);
  color: var(--accent-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ContactInfoItemTitle = styled.h4`
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
`;

const ContactInfoItemText = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--primary-color);
  padding: 2rem;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid var(--secondary-color);
  background-color: var(--primary-color);
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid var(--secondary-color);
  background-color: var(--primary-color);
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FormButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const SubmitMessage = styled.p`
  text-align: center;
  padding: 0.8rem;
  border-radius: 5px;
  background-color: ${({ status }) => status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${({ status }) => status === 'success' ? '#10b981' : '#ef4444'};
`;