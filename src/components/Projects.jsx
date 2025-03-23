import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { projects } from '../constants/constants';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const backgroundRef = useRef(null);
  
  // Animated background effect
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const canvas = backgroundRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.5;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 0.5,
        color: `rgba(56, 189, 248, ${Math.random() * 0.7})`,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 0.8 - 0.4,
        glow: Math.random() * 10 + 5
      });
    }
    
    // Animate particles
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw glowing particle
        ctx.shadowBlur = particle.glow;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Connect particles with lines
      connectParticles(ctx, particles);
    };
    
    const connectParticles = (ctx, particles) => {
      const maxDistance = 180;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <ProjectsSection id="projects">
      <BackgroundCanvas ref={backgroundRef} />
      <GlowingOrb className="orb-1" />
      <GlowingOrb className="orb-2" />
      <GlowingOrb className="orb-3" />
      
      <div className="container">
        <TitleContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <SectionTitle className="section-title">
              <GlowingSpan>Creative</GlowingSpan> <HighlightText>Showcase</HighlightText>
            </SectionTitle>
            
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "180px" }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="title-underline"
            />
          </motion.div>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Turning ideas into digital reality
          </motion.p>
        </TitleContainer>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 50
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProjectCard
                whileHover={{ 
                  y: -15,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                <ImageContainer>
                  <FullImageWrapper
                    whileHover={{
                      scale: 1.18,
                      y: -25,
                      zIndex: 10,
                      boxShadow: "0 40px 70px rgba(0, 0, 0, 0.3)",
                      transition: { 
                        duration: 0.5, 
                        type: "spring", 
                        stiffness: 120,
                        damping: 15
                      }
                    }}
                  >
                    <ProjectImage 
                      src={project.image} 
                      alt={project.title}
                    />
                    <ImageOverlay />
                  </FullImageWrapper>
                </ImageContainer>
                <ProjectContent>
                  <TagsContainer>
                    <TagsRow>
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <ProjectTag 
                          key={tagIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * tagIndex }}
                        >
                          {tag}
                        </ProjectTag>
                      ))}
                      {project.tags.length > 3 && (
                        <MoreTags>+{project.tags.length - 3}</MoreTags>
                      )}
                    </TagsRow>
                  </TagsContainer>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDate>{project.date}</ProjectDate>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectLinks>
                    <ProjectLink 
                      href={project.github} 
                      target="_blank"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#2563eb",
                        boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub /> View Code
                    </ProjectLink>
                    {project.webapp && (
                      <ProjectLink 
                        href={project.webapp} 
                        target="_blank"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "#059669",
                          boxShadow: "0 8px 20px rgba(5, 150, 105, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        $isDemo
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            </motion.div>
          ))}
        </ProjectsGrid>
      </div>
    </ProjectsSection>
  );
};

export default Projects;

// Styled Components
const ProjectsSection = styled.section`
  background-color: var(--primary-color);
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 70%;
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, transparent 70%);
    top: 10%;
    left: -20%;
    transform: rotate(-45deg);
    filter: blur(60px);
    animation: rotateSlow 25s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 80%;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, transparent 70%);
    bottom: -30%;
    right: -20%;
    transform: rotate(30deg);
    filter: blur(80px);
    animation: rotateSlow 30s linear infinite reverse;
  }
  
  @keyframes rotateSlow {
    from { transform: rotate(0deg) translate(-5%, 2%); }
    to { transform: rotate(360deg) translate(5%, -2%); }
  }
  
  .container {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .title-underline {
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), transparent);
    border-radius: 4px;
    margin: 0.8rem 0 2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: var(--accent-color);
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 10px var(--accent-color);
    }
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    filter: blur(20px);
    z-index: -1;
  }
  
  .section-subtitle {
    color: var(--text-secondary);
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    letter-spacing: 1px;
  }
`;

const GlowingSpan = styled.span`
  position: relative;
  color: var(--text-primary);
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  animation: pulse 3s ease-in-out infinite alternate;
  
  @keyframes pulse {
    0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
    100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
  
  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 30px;
    background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    filter: blur(10px);
    z-index: -1;
  }
`;

const HighlightText = styled.span`
  position: relative;
  display: inline-block;
  background: linear-gradient(to right, var(--accent-color), #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -5px;
    height: 40%;
    width: 110%;
    background-color: rgba(56, 189, 248, 0.15);
    z-index: -1;
    transform: rotate(-2deg);
    border-radius: 4px;
  }
`;

const BackgroundCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const GlowingOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  z-index: 1;
  
  &.orb-1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(16, 185, 129, 0) 70%);
    top: 10%;
    right: -200px;
    animation: float 20s ease-in-out infinite;
  }
  
  &.orb-2 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(16, 185, 129, 0) 70%);
    bottom: 5%;
    left: -250px;
    animation: float 28s ease-in-out infinite alternate;
  }
  
  &.orb-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(16, 185, 129, 0) 70%);
    top: 40%;
    left: 20%;
    animation: float2 18s ease-in-out infinite;
  }
  
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -50px) rotate(10deg); }
    66% { transform: translate(-20px, 30px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  
  @keyframes float2 {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, 30px) scale(1.2); }
    100% { transform: translate(0, 0) scale(1); }
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--secondary-color);
  border-radius: 16px;
  overflow: visible;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(
      135deg,
      rgba(56, 189, 248, 0.6),
      transparent 40%,
      rgba(139, 92, 246, 0.4) 80%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.8;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 220px;
  width: 100%;
  overflow: visible;
  perspective: 1200px;
  z-index: 2;
`;

const FullImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  height: 220px;
  width: 100%;
  transform-style: preserve-3d;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-radius: 12px;
    transform-style: preserve-3d;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.2)
  );
  z-index: 1;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  
  ${FullImageWrapper}:hover & {
    opacity: 0;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform-origin: center;
  transition: transform 0.3s ease;
`;

const ProjectContent = styled.div`
  padding: 1.8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(56, 189, 248, 0.3), transparent);
  }
`;

const TagsContainer = styled.div`
  position: relative;
  margin-bottom: 1.2rem;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ProjectTag = styled(motion.span)`
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.05));
  color: var(--accent-color);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35rem 0.7rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(56, 189, 248, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0.1));
    transform: translateY(-2px);
  }
`;

const MoreTags = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--text-primary), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
`;

const ProjectDate = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--accent-color);
    transform: translateY(-50%);
    box-shadow: 0 0 5px rgba(56, 189, 248, 0.5);
  }
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.$isDemo ? '#10b981' : 'var(--accent-color)'};
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.4rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
    transition: transform 0.4s ease;
  }
  
  &:hover::before {
    transform: translateY(100%);
  }
`;