import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaTimes } from 'react-icons/fa';

const ContactForm = ({ 
  phone = "+917620905221", 
  email = "amore43035@gmail.com", 
  location = "Pune, Maharashtra, India" 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const [showModal, setShowModal] = useState(false);
  
  const mapRef = useRef(null);
  
  // Initialize map animation
  useEffect(() => {
    const canvas = mapRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Grid parameters
    const gridSize = 30;
    const dotSize = 1;
    const pulseRadius = 80;
    const pulseSpeed = 0.8;
    const pulseOpacity = 0.7;
    
    let pulses = [
      { x: canvas.width * 0.3, y: canvas.height * 0.4, radius: 0, maxRadius: pulseRadius, opacity: pulseOpacity },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: 0, maxRadius: pulseRadius, opacity: pulseOpacity * 0.8 },
    ];
    
    // Helper function to draw the grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the grid
      ctx.fillStyle = 'rgba(82, 109, 130, 0.15)';
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw pulses
      pulses.forEach(pulse => {
        const gradient = ctx.createRadialGradient(
          pulse.x, pulse.y, 0,
          pulse.x, pulse.y, pulse.radius
        );
        
        gradient.addColorStop(0, `rgba(65, 137, 230, ${pulse.opacity})`);
        gradient.addColorStop(0.7, `rgba(65, 137, 230, ${pulse.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(65, 137, 230, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.fill();
        
        pulse.radius += pulseSpeed;
        
        if (pulse.radius > pulse.maxRadius) {
          pulse.radius = 0;
        }
      });
    };
    
    // Animation loop
    let animationFrame;
    const animate = () => {
      drawGrid();
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      // Connect to your custom backend API
      const response = await axios.post(
        'http://localhost:5000/api/contact', // Your server URL (change in production)
        formData
      );
      
      if (response.data.success) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' }
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Show the success modal
        setShowModal(true);
        
        // Reset form status after the modal is closed
        setTimeout(() => {
          setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
          });
        }, 5000);
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
      
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: error.response?.data?.message || 'Something went wrong. Please try again later.' }
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <FormSection id="contact">
      <BackgroundMap ref={mapRef} />
      
      <ContentContainer>
        <FormTitle>Get In Touch</FormTitle>
        <FormDescription>
          Feel free to reach out if you want to collaborate or just say hi!
        </FormDescription>
        
        <FormContentWrapper>
          <ContactInfoContainer>
            <ContactInfoTitle>Contact Information</ContactInfoTitle>
            
            <ContactInfoItem>
              <ContactInfoIcon>
                <FaPhone />
              </ContactInfoIcon>
              <div>
                <ContactInfoLabel>Phone</ContactInfoLabel>
                <ContactInfoText>{phone}</ContactInfoText>
              </div>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactInfoIcon>
                <FaEnvelope />
              </ContactInfoIcon>
              <div>
                <ContactInfoLabel>Email</ContactInfoLabel>
                <ContactInfoText>{email}</ContactInfoText>
              </div>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactInfoIcon>
                <FaMapMarkerAlt />
              </ContactInfoIcon>
              <div>
                <ContactInfoLabel>Location</ContactInfoLabel>
                <ContactInfoText>{location}</ContactInfoText>
              </div>
            </ContactInfoItem>
            
            <LocationBlip />
          </ContactInfoContainer>
          
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Tell me about your project or inquiry..."
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={status.submitting}>
                {status.submitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
              
              {status.info.msg && status.info.error && (
                <StatusMessage error={status.info.error}>
                  {status.info.msg}
                </StatusMessage>
              )}
            </Form>
          </FormContainer>
        </FormContentWrapper>
      </ContentContainer>

      {/* Success Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>
            
            <SuccessIcon>
              <FaCheckCircle />
            </SuccessIcon>
            
            <ModalTitle>Message Sent!</ModalTitle>
            <ModalMessage>
              Thank you for reaching out. I'll get back to you soon!
            </ModalMessage>
            
            <ModalButton onClick={closeModal}>
              Close
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </FormSection>
  );
};

export default ContactForm;

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

const ripple = keyframes`
  0% { transform: scale(0.1); opacity: 1; }
  70% { transform: scale(3); opacity: 0.7; }
  100% { transform: scale(5); opacity: 0; }
`;

const modalFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalSlideIn = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const iconPop = keyframes`
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Styled Components
const FormSection = styled.section`
  position: relative;
  padding: 5rem 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const BackgroundMap = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  z-index: 1;
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  text-align: center;
  font-weight: 700;
`;

const FormDescription = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.1rem;
`;

const FormContentWrapper = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfoContainer = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(135deg, var(--accent-color), #364f6b);
  padding: 3rem 2rem;
  color: white;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 20%);
    z-index: 0;
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
`;

const ContactInfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.2rem;
  animation: ${float} 6s ease-in-out infinite;
`;

const ContactInfoLabel = styled.p`
  font-size: 0.85rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
`;

const ContactInfoText = styled.p`
  font-weight: 500;
`;

const LocationBlip = styled.div`
  position: absolute;
  bottom: 30%;
  left: 25%;
  width: 15px;
  height: 15px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  z-index: 2;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    animation: ${ripple} 3s linear infinite;
  }
  
  &::after {
    animation-delay: 1s;
  }
`;

const FormContainer = styled.div`
  flex: 2;
  padding: 3rem;
  background: var(--bg-secondary);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.1);
  }
  
  &::placeholder {
    color: rgba(148, 163, 184, 0.6);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.1);
  }
  
  &::placeholder {
    color: rgba(148, 163, 184, 0.6);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  background-color: ${props => props.error ? 'rgba(220, 38, 38, 0.1)' : 'rgba(34, 197, 94, 0.1)'};
  color: ${props => props.error ? '#dc2626' : '#16a34a'};
  font-weight: 500;
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${modalFadeIn} 0.3s ease-out;
`;

// Update these styled components in your existing code

const ModalContent = styled.div`
  background: linear-gradient(135deg, #10b981, #047857);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 90%;
  width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  animation: ${modalSlideIn} 0.4s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
  }
`;

const SuccessIcon = styled.div`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1.5rem;
  animation: ${iconPop} 0.5s ease-out;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
  font-weight: 700;
`;

const ModalMessage = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const ModalButton = styled.button`
  padding: 0.8rem 2.5rem;
  background: white;
  color: #047857;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;