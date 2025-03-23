import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { experiences } from '../constants/constants';
import { FaBriefcase, FaBuilding } from 'react-icons/fa';

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"] 
  });
  
  // Subtle scroll animations
  const titleY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <ExperienceSection id="experience" ref={containerRef}>
      <GradientBackground />
      
      <ContentContainer>
        <HeaderContainer style={{ opacity: titleOpacity, y: titleY }}>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Professional Experience
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            My career journey and key accomplishments
          </SectionSubtitle>
        </HeaderContainer>
        
        <ExperienceTimeline>
          {experiences.map((exp, index) => (
            <TimelineCard
              key={exp.id}
              $isActive={activeExperience === index}
              onClick={() => setActiveExperience(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 8px 20px rgba(88, 101, 242, 0.2)" 
              }}
            >
              <CardHeader>
                <CompanyLogo
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <FaBuilding size={16} />
                </CompanyLogo>
                <CardTitleArea>
                  <CardTitle>{exp.role}</CardTitle>
                  <CardSubtitle>{exp.company}</CardSubtitle>
                </CardTitleArea>
                <DateBadge>{exp.date}</DateBadge>
              </CardHeader>
              
              <CardDivider 
                $isActive={activeExperience === index}
                initial={{ width: "0%" }}
                animate={{ width: activeExperience === index ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
              
              <AnimatePresence>
                {activeExperience === index && (
                  <ExpandedContent
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DescriptionList>
                      {exp.description.map((item, idx) => (
                        <DescriptionItem 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                        >
                          {item}
                        </DescriptionItem>
                      ))}
                    </DescriptionList>
                    
                    <SkillsContainer>
                      {['React', 'Node.js', 'UI/UX', 'TypeScript'].map((skill, idx) => (
                        <SkillTag 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                        >
                          {skill}
                        </SkillTag>
                      ))}
                    </SkillsContainer>
                  </ExpandedContent>
                )}
              </AnimatePresence>
            </TimelineCard>
          ))}
        </ExperienceTimeline>
        
        <TimelineNavigation>
          {experiences.map((exp, index) => (
            <TimelineDot 
              key={index}
              $isActive={activeExperience === index}
              onClick={() => setActiveExperience(index)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
            />
          ))}
        </TimelineNavigation>
      </ContentContainer>
    </ExperienceSection>
  );
};

// Beautiful gradient background with subtle animation
const GradientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Smooth following with delay for performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <GradientBackgroundContainer
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                     rgba(76, 29, 149, 0.9) 0%, 
                     rgba(30, 41, 99, 0.85) 45%, 
                     rgba(15, 23, 42, 0.8) 90%)`
      }}
    >
      <GlowOrb 
        style={{ 
          left: `calc(${mousePosition.x}% - 150px)`, 
          top: `calc(${mousePosition.y}% - 150px)` 
        }}
      />
      <GridLines />
    </GradientBackgroundContainer>
  );
};

const GridLines = () => {
  return (
    <GridLinesContainer>
      {Array.from({ length: 10 }).map((_, i) => (
        <GridLine key={i} $index={i} />
      ))}
    </GridLinesContainer>
  );
};

export default Experience;

// Styled Components
const ExperienceSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GradientBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background 0.5s ease;
  z-index: 0;
  overflow: hidden;
`;

const GlowOrb = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.25) 0%,
    rgba(99, 102, 241, 0.15) 40%,
    rgba(79, 70, 229, 0) 70%
  );
  transition: all 0.3s ease;
  pointer-events: none;
  filter: blur(30px);
`;

const GridLinesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.25;
`;

const GridLine = styled.div`
  position: absolute;
  background: linear-gradient(90deg, 
    rgba(67, 56, 202, 0) 0%, 
    rgba(139, 92, 246, 0.2) 50%, 
    rgba(67, 56, 202, 0) 100%);
  height: 1px;
  width: 100%;
  top: ${props => props.$index * 10}%;
  animation: horizontalFloat 20s infinite ease-in-out;
  animation-delay: ${props => props.$index * 0.5}s;
  
  @keyframes horizontalFloat {
    0% {
      transform: translateX(-10%);
    }
    50% {
      transform: translateX(10%);
    }
    100% {
      transform: translateX(-10%);
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const HeaderContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 15px;
  font-weight: 700;
  color: #f8fafc;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.5), rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.5));
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  color: #cbd5e1;
  margin-top: 20px;
`;

const ExperienceTimeline = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  gap: 25px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const TimelineCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 
              0 1px 5px rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(99, 102, 241, 0.2);
  
  &:hover {
    background: rgba(30, 41, 59, 0.85);
    border: 1px solid rgba(139, 92, 246, 0.4);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 22px 28px;
  gap: 18px;
`;

const CompanyLogo = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.3);
`;

const CardTitleArea = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  padding: 0;
  color: #f1f5f9;
  letter-spacing: 0.2px;
`;

const CardSubtitle = styled.h4`
  font-size: 0.95rem;
  color: #94a3b8;
  font-weight: 400;
  margin: 5px 0 0;
  padding: 0;
`;

const DateBadge = styled.div`
  color: #c4b5fd;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(139, 92, 246, 0.15);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
`;

const CardDivider = styled(motion.div)`
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(139, 92, 246, 0.8) 0%, 
    rgba(99, 102, 241, 0.4) 100%);
  margin: 0;
  width: 0%;
`;

const ExpandedContent = styled(motion.div)`
  padding: 25px 28px;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(99, 102, 241, 0.1);
`;

const DescriptionList = styled.ul`
  padding-left: 20px;
  margin: 0 0 20px;
`;

const DescriptionItem = styled(motion.li)`
  margin-bottom: 10px;
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const SkillTag = styled(motion.span)`
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
  }
`;

const TimelineNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
`;

const TimelineDot = styled(motion.div)`
  width: ${props => props.$isActive ? '12px' : '8px'};
  height: ${props => props.$isActive ? '12px' : '8px'};
  border-radius: 50%;
  background: ${props => props.$isActive ? 
    'linear-gradient(135deg, #8B5CF6, #6366F1)' : 
    'rgba(148, 163, 184, 0.4)'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isActive ? 
    '0 2px 6px rgba(139, 92, 246, 0.4)' : 'none'};
  
  &:hover {
    transform: scale(1.2);
  }
`;