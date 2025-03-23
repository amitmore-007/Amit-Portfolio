// src/components/Skills.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { skills } from '../constants/constants';

const Skills = () => {
  return (
    <SkillsSection id="skills">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My <span className="highlight">Skills</span>
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Here are the technologies I've worked with
        </motion.p>
        
        <SkillsContainer>
          {skills.map((skillGroup, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SkillGroupTitle>{skillGroup.title}</SkillGroupTitle>
              <SkillsGrid>
                {skillGroup.skills.map((skill, skillIndex) => (
                  <SkillCard key={skillIndex}>
                    <SkillIcon src={skill.icon} alt={skill.name} />
                    <SkillName>{skill.name}</SkillName>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </motion.div>
          ))}
        </SkillsContainer>
      </div>
    </SkillsSection>
  );
};

export default Skills;

const SkillsSection = styled.section`
  background-color: var(--primary-color);
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SkillGroupTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }
`;

const SkillCard = styled.div`
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
`;

const SkillName = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-secondary);
`;