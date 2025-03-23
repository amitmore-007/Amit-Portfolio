// src/components/About.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <AboutSection id="about">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About <span className="highlight">Me</span>
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Here you will find more information about me, what I do, and my current skills
        </motion.p>
        
        <AboutContent>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AboutTitle>Get to know me!</AboutTitle>
            <AboutText>
              I'm a <span className="highlight">Full Stack Web Developer</span> building and deploying websites and web applications that lead to the success of the overall product. Check out some of my work in the <span className="highlight">Projects</span> section.
            </AboutText>
            <AboutText>
              I also like sharing content related to the stuff that I have learned over the years in Web Development so it can help other people in the Dev Community. Feel free to connect with me on my social platforms.
            </AboutText>
            <AboutText>
              I'm open to <span className="highlight">Job</span> opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then don't hesitate to <span className="highlight">contact</span> me.
            </AboutText>
            <ContactButton to="contact" smooth={true} duration={500} offset={-70}>
              Contact Me
            </ContactButton>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AboutTitle>My Skills</AboutTitle>
            <SkillsContainer>
              <SkillTag>HTML</SkillTag>
              <SkillTag>CSS</SkillTag>
              <SkillTag>JavaScript</SkillTag>
              <SkillTag>React</SkillTag>
              <SkillTag>Next.js</SkillTag>
              <SkillTag>Node.js</SkillTag>
              <SkillTag>Express</SkillTag>
              <SkillTag>MongoDB</SkillTag>
              <SkillTag>Git</SkillTag>
              <SkillTag>UI/UX Design</SkillTag>
              <SkillTag>Responsive Design</SkillTag>
              <SkillTag>RESTful APIs</SkillTag>
              <SkillTag>Firebase</SkillTag>
              <SkillTag>TypeScript</SkillTag>
              <SkillTag>Redux</SkillTag>
            </SkillsContainer>
          </motion.div>
        </AboutContent>
      </div>
    </AboutSection>
  );
};

export default About;

const AboutSection = styled.section`
  background-color: var(--secondary-color);
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
`;

const AboutText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
  
  .highlight {
    color: var(--accent-color);
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: var(--accent-color);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillTag = styled.div`
  background-color: rgba(56, 189, 248, 0.1);
  color: var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
`;