import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        // Reset form after successful submission
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setStatus(null);
        }, 3000);
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please try again later.' 
      });
    }
    
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <TerminalDots>
                <TerminalDot color="#ff5f56" />
                <TerminalDot color="#ffbd2e" />
                <TerminalDot color="#27c93f" />
              </TerminalDots>
              <TerminalTitle>~/portfolio/contact.js</TerminalTitle>
              <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalContent>
              <StatusMessage status={status}>
                {status?.message}
              </StatusMessage>
              
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Name <Required>*</Required></Label>
                  <Input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="const name = 'Your Name'"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Email <Required>*</Required></Label>
                  <Input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="const email = 'your.email@example.com'"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Subject</Label>
                  <Input 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="const subject = 'Project Opportunity'"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Message <Required>*</Required></Label>
                  <TextArea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="/* Your message here */"
                    rows="6"
                    required
                  />
                </FormGroup>
                
                <SubmitButton 
                  type="submit" 
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <>
                      <Spinner /> Processing...
                    </>
                  ) : (
                    'git push --send'
                  )}
                </SubmitButton>
              </Form>
              
              <CodeComment>
                // Your message will be securely transmitted
              </CodeComment>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

// Styled Components
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(56, 189, 248, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  background: #252525;
  padding: 12px 16px;
  position: relative;
`;

const TerminalDots = styled.div`
  display: flex;
  gap: 6px;
`;

const TerminalDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const TerminalTitle = styled.div`
  margin-left: 20px;
  color: #cccccc;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #cccccc;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #cccccc;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const Required = styled.span`
  color: #ff5f56;
  margin-left: 4px;
`;

const Input = styled.input`
  background: #2d2d2d;
  border: 1px solid #3e3e3e;
  border-radius: 4px;
  padding: 12px 16px;
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
  }
  
  &::placeholder {
    color: #6c6c6c;
  }
`;

const TextArea = styled.textarea`
  background: #2d2d2d;
  border: 1px solid #3e3e3e;
  border-radius: 4px;
  padding: 12px 16px;
  color: #d4d4d4;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
  }
  
  &::placeholder {
    color: #6c6c6c;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 100%);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  &:hover {
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CodeComment = styled.div`
  color: #6a9955;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  margin-top: 24px;
  text-align: center;
`;

const StatusMessage = styled.div`
  padding: ${props => props.status ? '12px 16px' : '0'};
  margin-bottom: ${props => props.status ? '20px' : '0'};
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  text-align: center;
  background-color: ${props => {
    if (!props.status) return 'transparent';
    return props.status.type === 'success' ? 'rgba(39, 201, 63, 0.1)' : 'rgba(255, 95, 86, 0.1)';
  }};
  color: ${props => {
    if (!props.status) return 'transparent';
    return props.status.type === 'success' ? '#27c93f' : '#ff5f56';
  }};
  border: ${props => {
    if (!props.status) return 'none';
    return props.status.type === 'success' ? '1px solid rgba(39, 201, 63, 0.3)' : '1px solid rgba(255, 95, 86, 0.3)';
  }};
  display: ${props => props.status ? 'block' : 'none'};
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;