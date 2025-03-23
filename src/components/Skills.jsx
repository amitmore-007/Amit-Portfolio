// src/components/Skills.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { skills } from '../constants/constants';

const Skills = () => {
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SkillsSection id="skills">
      <BackgroundPattern />
      <div className="container">
        <SectionHeader>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            My <span className="highlight">Skills</span>
          </motion.h2>
          
          <motion.div
            className="title-underline"
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Here are the technologies I've worked with
          </motion.p>
        </SectionHeader>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SkillsContainer>
            {skills.map((skillGroup, index) => (
              <SkillGroup 
                key={index}
                variants={itemVariants}
              >
                <SkillGroupHeader>
                  <SkillGroupTitle>{skillGroup.title}</SkillGroupTitle>
                  <SkillGroupDivider />
                </SkillGroupHeader>
                
                <SkillsGrid>
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <SkillCard 
                      key={skillIndex}
                      whileHover={{ 
                        y: -10, 
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' 
                      }}
                    >
                      <SkillIconWrapper>
                        <SkillIcon src={skill.icon} alt={skill.name} />
                      </SkillIconWrapper>
                      <SkillName>{skill.name}</SkillName>
                      
                      <SkillProgress>
                        <SkillProgressBar 
                          style={{ width: skill.proficiency || '80%' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.proficiency || '80%' }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </SkillProgress>
                    </SkillCard>
                  ))}
                </SkillsGrid>
              </SkillGroup>
            ))}
          </SkillsContainer>
        </motion.div>
        
        <SkillsFooter>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            *These skills are constantly evolving as I continue to learn and grow as a developer.
          </motion.p>
          
         
        </SkillsFooter>
      </div>
    </SkillsSection>
  );
};

export default Skills;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(56, 189, 248, 0.05) 2px, transparent 2px);
  background-size: 30px 30px;
  pointer-events: none;
`;

const SkillsSection = styled.section`
  background-color: var(--primary-color);
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .highlight {
    color: var(--accent-color);
    position: relative;
  }
  
  .title-underline {
    height: 4px;
    background: var(--accent-color);
    margin: 0 auto 1.5rem;
    border-radius: 2px;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const SkillGroup = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const SkillGroupHeader = styled.div`
  margin-bottom: 2rem;
`;

const SkillGroupTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
  display: inline-block;
`;

const SkillGroupDivider = styled.div`
  height: 3px;
  width: 60px;
  background: var(--accent-color);
  border-radius: 3px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.8rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1.2rem;
  }
`;

const SkillCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 12px;
  padding: 1.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color) 0%, #2563eb 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const SkillIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SkillIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const SkillName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const SkillProgress = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const SkillProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color) 0%, #2563eb 100%);
  border-radius: 3px;
`;

const SkillsFooter = styled.div`
  text-align: center;
  margin-top: 4rem;
  
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-style: italic;
  }
  
  .view-all-btn {
    background: linear-gradient(135deg, var(--accent-color) 0%, #2563eb 100%);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
    }
  }
`;