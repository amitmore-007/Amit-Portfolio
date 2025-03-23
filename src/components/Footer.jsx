import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
     
      
      <FooterContent>
        <FooterTop>
          <LogoSection>
            <FooterLogo>
              <LogoText>Amit More</LogoText>
            </FooterLogo>
            <LogoTagline>Building digital experiences that matter</LogoTagline>
          </LogoSection>
          
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink href="#home">
                <LinkText>Home</LinkText>
                <LinkHoverEffect />
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#about">
                <LinkText>About</LinkText>
                <LinkHoverEffect />
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#skills">
                <LinkText>Skills</LinkText>
                <LinkHoverEffect />
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#experience">
                <LinkText>Experience</LinkText>
                <LinkHoverEffect />
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#projects">
                <LinkText>Projects</LinkText>
                <LinkHoverEffect />
              </FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink href="#contact">
                <LinkText>Contact</LinkText>
                <LinkHoverEffect />
              </FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterTop>
        
        <FooterSocials>
          <SocialLink href="https://github.com/amitmore-007" target="_blank" aria-label="GitHub">
            <SocialBubble className="github">
              <FaGithub />
            </SocialBubble>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/amit-more-57a646249/" target="_blank" aria-label="LinkedIn">
            <SocialBubble className="linkedin">
              <FaLinkedin />
            </SocialBubble>
          </SocialLink>
        </FooterSocials>
        
        <Divider />
        
        <FooterBottom>
          <FooterCopyright>
            © {currentYear} <CopyrightName>Amit More</CopyrightName>. All rights reserved.
          </FooterCopyright>
          <MadeWithLove>
            Made with <HeartIcon><FaHeart /></HeartIcon> using React
          </MadeWithLove>
        </FooterBottom>
      </FooterContent>
      
      <BackgroundGlow />
    </FooterContainer>
  );
};

export default Footer;

// Animations
const glowing = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const appear = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Update the FooterContainer component with a completely different gradient
const FooterContainer = styled.footer`
  position: relative;
  /* Replace with a distinct gradient using different colors */
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  padding: 6rem 0 3rem;
  overflow: hidden;
`;

// You may also want to update the FooterWave component to ensure smooth transition
const FooterWave = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  line-height: 0;
  overflow: hidden;
  
  svg {
    display: block;
    width: 100%;
    height: 80px;
    transform: rotateY(180deg);
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--accent-color-rgb), 0.2) 0%, rgba(var(--accent-color-rgb), 0) 70%);
  transform: translateX(-50%);
  z-index: 0;
  animation: ${glowing} 8s ease-in-out infinite;
  pointer-events: none;
`;

const FooterContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 0.5rem;
  animation: ${appear} 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.1s;
`;

const LogoText = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ffffff 0%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.5px;
`;

const LogoHighlight = styled.span`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--accent-color);
    border-radius: 3px;
    opacity: 0.6;
  }
`;

const LogoTagline = styled.p`
  color: var(--text-secondary);
  font-style: italic;
  font-size: 0.9rem;
  opacity: 0;
  animation: ${appear} 0.8s ease-out forwards;
  animation-delay: 0.3s;
`;

const FooterLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style-type: none;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 1rem;
  }
`;

const FooterLinkItem = styled.li`
  opacity: 0;
  animation: ${appear} 0.5s ease-out forwards;
  animation-delay: calc(0.1s * var(--i, 1));
  
  &:nth-child(1) { --i: 1; }
  &:nth-child(2) { --i: 2; }
  &:nth-child(3) { --i: 3; }
  &:nth-child(4) { --i: 4; }
  &:nth-child(5) { --i: 5; }
  &:nth-child(6) { --i: 6; }
`;

const FooterLink = styled.a`
  display: inline-block;
  position: relative;
  padding: 0.5rem 0;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  transition: color 0.3s ease;
  overflow: hidden;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const LinkText = styled.span`
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
  
  ${FooterLink}:hover & {
    transform: translateY(-2px);
  }
`;

const LinkHoverEffect = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-color) 0%, #ffffff 100%);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
  
  ${FooterLink}:hover & {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const FooterSocials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  display: block;
  text-decoration: none;
  opacity: 0;
  animation: ${appear} 0.8s ease-out forwards;
  
  &:nth-child(1) { animation-delay: 0.6s; }
  &:nth-child(2) { animation-delay: 0.8s; }
  &:nth-child(3) { animation-delay: 1s; }
`;

const SocialBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${floating} 5s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 80%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.github {
    background: linear-gradient(135deg, #333333, #24292e);
    animation-delay: 0.5s;
  }
  
  &.linkedin {
    background: linear-gradient(135deg, #0077B5, #00a0dc);
    animation-delay: 1s;
  }
  
  &.twitter {
    background: linear-gradient(135deg, #1DA1F2, #0d8ad6);
    animation-delay: 1.5s;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin-bottom: 2rem;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterCopyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0;
  animation: ${appear} 0.8s ease-out forwards;
  animation-delay: 1.2s;
`;

const CopyrightName = styled.span`
  color: var(--accent-color);
  font-weight: 600;
`;

const MadeWithLove = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  opacity: 0;
  animation: ${appear} 0.8s ease-out forwards;
  animation-delay: 1.4s;
`;

const HeartIcon = styled.span`
  color: #ff6b6b;
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: inline-flex;
`;