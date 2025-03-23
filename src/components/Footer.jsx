// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>Ratheshan</FooterLogo>
        
        <FooterLinks>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#experience">Experience</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterLinks>
        
        <FooterSocials>
          <SocialLink href="https://github.com/username" target="_blank">
            <FaGithub />
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/username" target="_blank">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="https://twitter.com/username" target="_blank">
            <FaTwitter />
          </SocialLink>
        </FooterSocials>
        
        <FooterCopyright>
          © {currentYear} Ratheshan. All rights reserved.
        </FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  padding: 3rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
`;

const FooterContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const FooterSocials = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a`
  color: var(--text-secondary);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
    transform: translateY(-3px);
  }
`;

const FooterCopyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;