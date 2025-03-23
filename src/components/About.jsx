import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaCode, FaServer, FaBrain, FaArrowRight } from 'react-icons/fa';

const About = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles.length = 0;
      const particleCount = Math.floor(canvas.width * canvas.height / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          radius: Math.random() * 2 + 1,
          color: `rgba(88, 133, 254, ${Math.random() * 0.5 + 0.2})`
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect particles
        particles.forEach((p2, j) => {
          if (i === j) return;
          
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(88, 133, 254, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const skillCategories = [
    { 
      name: "Frontend", 
      icon: <FaCode />,
      skills: ["React", "JavaScript", "HTML/CSS", "Redux", "TensorFlow.js", "Responsive Design"] 
    },
    { 
      name: "Backend", 
      icon: <FaServer />,
      skills: ["Node.js", "Express", "REST APIs", "GraphQL", "Authentication/Security"] 
    },
    { 
      name: "Database & AI", 
      icon: <FaBrain />,
      skills: ["MongoDB", "Vision Transformers", "SQL", "Data Modeling", "Image Processing"] 
    }
  ];

  return (
    <AboutSection id="about">
      <BackgroundCanvas ref={canvasRef} />
      
      <ContentContainer className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About <GradientText>Me</GradientText>
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Full Stack Developer | AI & Web Enthusiast
        </motion.p>
        
        <AboutContent>
          <motion.div 
            className="about-me-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AboutCard className="story-card">
              <CardContent>
                <AboutTitle>
                  <HeadingAccent />
                  My Story
                </AboutTitle>
                <AboutTextContainer>
                  <AboutText>
                    I'm a <GradientText>MERN Stack Developer</GradientText> passionate about building <GradientText>scalable web applications and AI-powered solutions</GradientText>. With expertise in <GradientText>React, Node.js, Express, MongoDB</GradientText>, and <GradientText>AI-driven development (Vision Transformers, TensorFlow.js)</GradientText>, I have developed multiple real-world applications.
                  </AboutText>
                  <AboutText>
                    My portfolio includes a <GradientText>Gift Card Management System</GradientText>, <GradientText>Rental Apply Website</GradientText>, <GradientText>Video Meet App</GradientText>, and an <GradientText>Image Captioning System</GradientText>. I thrive in <GradientText>collaborative environments</GradientText> and enjoy solving complex challenges with innovative tech solutions.
                  </AboutText>
                  <AboutText>
                    I'm open to exciting <GradientText>full-time roles, freelance projects, and collaborations</GradientText>! Let's build something amazing together.
                  </AboutText>
                  <ContactButtonWrapper>
                    <ContactButton to="contact" smooth={true} duration={500} offset={-70}>
                      Get In Touch
                      <FaArrowRight className="arrow-icon" />
                    </ContactButton>
                  </ContactButtonWrapper>
                </AboutTextContainer>
              </CardContent>
            </AboutCard>
          </motion.div>
          
          <motion.div 
            className="skills-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AboutCard className="skills-card">
              <CardContent>
                <AboutTitle>
                  <HeadingAccent />
                  Technical Skills
                </AboutTitle>
                
                {skillCategories.map((category, catIndex) => (
                  <SkillCategoryContainer key={category.name}>
                    <SkillCategoryTitle
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * catIndex }}
                      viewport={{ once: true }}
                    >
                      <CategoryIcon>{category.icon}</CategoryIcon>
                      {category.name}
                    </SkillCategoryTitle>
                    <SkillsContainer>
                      {category.skills.map((skill, index) => (
                        <SkillTag 
                          key={skill}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * (index + 1) }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(62, 116, 245, 0.25)"
                          }}
                        >
                          {skill}
                        </SkillTag>
                      ))}
                    </SkillsContainer>
                  </SkillCategoryContainer>
                ))}
              </CardContent>
            </AboutCard>
          </motion.div>
        </AboutContent>
      </ContentContainer>
    </AboutSection>
  );
};

export default About;

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const AboutSection = styled.section`
  position: relative;
  padding: 8rem 0 6rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0a0e17;
  color: #f3f4f6;
`;

const BackgroundCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  .section-title {
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    color: #f3f4f6;
    line-height: 1.1;
  }
  
  .section-subtitle {
    font-family: 'Mona Sans', sans-serif;
    font-size: 1.5rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 5rem;
    color: #a3b3ff;
    font-weight: 300;
    letter-spacing: 0.5px;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .story-card {
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    
    @media (max-width: 992px) {
      aspect-ratio: auto;
    }
  }
  
  .skills-card {
    height: calc(100% - 20px);
    align-self: center;
  }
`;

const AboutCard = styled.div`
  position: relative;
  background: rgba(23, 33, 54, 0.5);
  border-radius: 25px;
  border: 1px solid rgba(138, 152, 234, 0.2);
  backdrop-filter: blur(15px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #4169e1, #3e74f5, #7b68ee);
    z-index: -1;
    border-radius: 24px;
    opacity: 0.3;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    &:before {
      opacity: 0.6;
    }
  }
  
  &.story-card {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    
    &:before {
      opacity: 0.5;
    }
  }
`;

const CardContent = styled.div`
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .story-card & {
    justify-content: center;
  }
`;

const HeadingAccent = styled.span`
  display: block;
  width: 50px;
  height: 5px;
  background: linear-gradient(90deg, #3e74f5, #7b68ee);
  margin-bottom: 1rem;
  border-radius: 3px;
`;

const AboutTitle = styled.h3`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 2.3rem;
  margin-bottom: 2rem;
  color: #f3f4f6;
  font-weight: 600;
`;

const AboutTextContainer = styled.div`
  background: rgba(23, 33, 54, 0.5);
  border-radius: 16px;
  padding: 2rem;
  border-left: 4px solid #3e74f5;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .story-card & {
    justify-content: space-between;
  }
`;

const AboutText = styled.p`
  font-family: 'Mona Sans', sans-serif;
  color: #d1d5db;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  letter-spacing: 0.3px;
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #3e74f5, #7b68ee);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
`;

const ContactButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2.5rem;
`;

const ContactButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(90deg, #3e74f5, #7b68ee);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Mona Sans', sans-serif;
  font-size: 1rem;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(62, 116, 245, 0.3);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: skewX(-30deg);
    transition: all 0.6s ease;
  }
  
  &:hover {
    box-shadow: 0 12px 20px rgba(62, 116, 245, 0.4);
    transform: translateY(-3px);
    
    &:before {
      left: 150%;
    }
    
    .arrow-icon {
      transform: translateX(5px);
    }
  }
  
  .arrow-icon {
    transition: transform 0.3s ease;
  }
`;

const CategoryIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-right: 12px;
  background: linear-gradient(135deg, #3e74f5, #7b68ee);
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(62, 116, 245, 0.3);
`;

const SkillCategoryContainer = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillCategoryTitle = styled(motion.h4)`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #a3b3ff;
  font-weight: 600;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 1.2rem;
  background: rgba(23, 33, 54, 0.5);
  border-radius: 16px;
`;

const SkillTag = styled(motion.div)`
  background: rgba(62, 116, 245, 0.15);
  color: #a3b3ff;
  padding: 0.7rem 1.1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Mona Sans', sans-serif;
  letter-spacing: 0.5px;
  border: 1px solid rgba(62, 116, 245, 0.25);
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: rgba(62, 116, 245, 0.25);
    border-color: rgba(62, 116, 245, 0.4);
    color: #f3f4f6;
  }
`;