// src/components/Experience.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { experiences } from '../constants/constants';

const Experience = () => {
  return (
    <ExperienceSection id="experience">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My <span className="highlight">Experience</span>
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          My professional journey so far
        </motion.p>
        
        <Timeline>
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TimelineItem isLeft={index % 2 === 0}>
                <TimelineContent>
                  <TimelineDate>{exp.date}</TimelineDate>
                  <TimelineRole>{exp.role}</TimelineRole>
                  <TimelineCompany>{exp.company}</TimelineCompany>
                  <TimelineDescription>
                    <ul>
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </motion.div>
          ))}
        </Timeline>
      </div>
    </ExperienceSection>
  );
};

export default Experience;

const ExperienceSection = styled.section`
  background-color: var(--secondary-color);
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: var(--accent-color);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -2px;
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 30px;
  
  ${({ isLeft }) => isLeft ? 'left: 0;' : 'left: 50%;'}
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: ${({ isLeft }) => (isLeft ? '-10px' : 'auto')};
    left: ${({ isLeft }) => (isLeft ? 'auto' : '-10px')};
    background-color: var(--primary-color);
    border: 4px solid var(--accent-color);
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    left: 0;
    
    &::after {
      left: 21px;
      right: auto;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background-color: var(--primary-color);
  position: relative;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;

const TimelineDate = styled.span`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const TimelineRole = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: var(--text-primary);
`;

const TimelineCompany = styled.h4`
  font-size: 1rem;
  margin-bottom: 15px;
  color: var(--text-secondary);
`;

const TimelineDescription = styled.div`
  color: var(--text-secondary);
  
  ul {
    padding-left: 20px;
    margin: 0;
    
    li {
      margin-bottom: 5px;
    }
  }
`;