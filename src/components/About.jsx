import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaCode, FaServer, FaBrain, FaArrowRight } from 'react-icons/fa';


const ParticleNetwork = ({ count = 50 }) => {
  // Generate random particles
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // % position
    y: Math.random() * 100, // % position
    size: Math.random() * 3 + 1,
    velocity: {
      x: (Math.random() - 0.5) * 0.2,
      y: (Math.random() - 0.5) * 0.2
    }
  }));

  return (
    <div className="particle-container" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: -1
    }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            background: 'rgba(123, 104, 238, 0.3)',
            boxShadow: '0 0 10px rgba(123, 104, 238, 0.5)'
          }}
          animate={{
            x: [0, particle.velocity.x * 100, 0],
            y: [0, particle.velocity.y * 100, 0],
            opacity: [0.1, 0.7, 0.1]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Add the ConnectionLines component for network effect
const ConnectionLines = ({ particles, threshold = 15 }) => {
  return (
    <svg 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    >
      {particles.flatMap((p1, i) => 
        particles.slice(i + 1).map((p2, j) => {
          const dx = Math.abs(p1.x - p2.x);
          const dy = Math.abs(p1.y - p2.y);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw lines between nearby particles
          if (distance < threshold) {
            const opacity = 1 - (distance / threshold);
            return (
              <motion.line
                key={`${i}-${i+j+1}`}
                x1={`${p1.x}%`}
                y1={`${p1.y}%`}
                x2={`${p2.x}%`}
                y2={`${p2.y}%`}
                stroke={`rgba(123, 104, 238, ${opacity * 0.2})`}
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: opacity * 0.5 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            );
          }
          return null;
        }).filter(Boolean)
      )}
    </svg>
  );
};


const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const networkParticles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

  const achievements = [
    { number: "4+", label: "Years Experience" },
    { number: "20+", label: "Projects" },
    { number: "15+", label: "Happy Clients" },
    { number: "5+", label: "AI Integrations" }
  ];

  // Calculate mouse-based transforms
  const calculateCardTransform = (elementRect) => {
    if (!containerRef.current) return { rotateX: 0, rotateY: 0 };
    
    const container = containerRef.current.getBoundingClientRect();
    const centerX = container.width / 2;
    const centerY = container.height / 2;
    
    const rotateY = ((mousePosition.x - centerX) / centerX) * 5;
    const rotateX = ((centerY - mousePosition.y) / centerY) * 5;
    
    return { rotateX, rotateY };
  };

  return (
    <AboutSection id="about" ref={containerRef} >
     <ParticleNetwork count={50} />
     <ConnectionLines particles={networkParticles} threshold={25} />
      <NeuralBackground mouseX={mousePosition.x} mouseY={mousePosition.y} />
     
      {/* <StarsCanvas /> */}
      
      <ContentContainer>
        <motion.div style={{ opacity: opacityRange }}>
          <motion.div 
            className="heading-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <HeadingWrapper>
             
              <SolidText>About <GradientSpan>Me</GradientSpan></SolidText>
            </HeadingWrapper>
            
            <SubtitleContainer>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="subtitle-line"
              />
              <motion.p 
                className="subtitle-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Full Stack Developer | AI & Web Enthusiast
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="subtitle-line"
              />
            </SubtitleContainer>
          </motion.div>
          
         
          
          <ContentGrid>
            <motion.div 
              className="profile-section"
              style={{ y: parallaxY1 }}
            >
              <ProfileCard 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                transformStyle="preserve-3d"
              >
                <HoverGradientBorder />
                <ProfileContent>
                  <ProfileHeader>
                    <ProfileTitleWrapper>
                      <AnimatedCube />
                      <ProfileTitle>Who I Am</ProfileTitle>
                    </ProfileTitleWrapper>
                    <GlowUnderline />
                  </ProfileHeader>
                  
                  <ProfileQuote>
                    "Building digital experiences at the intersection of AI and web development"
                  </ProfileQuote>
                  
                  <ProfileText>
                    I'm a <HighlightText>MERN Stack Developer</HighlightText> passionate about creating <HighlightText>seamless user experiences</HighlightText> powered by cutting-edge technologies.
                  </ProfileText>
                  
                  <ProfileText>
                    My expertise spans <HighlightText>React, Node.js, MongoDB</HighlightText> and <HighlightText>AI integration (Vision Transformers, TensorFlow.js)</HighlightText>, allowing me to build applications that are not only visually stunning but also intelligent.
                  </ProfileText>
                  
                  <KeyProjectsContainer>
                    <KeyProjectsHeader>Featured Projects</KeyProjectsHeader>
                    <KeyProjectsList>
                      <KeyProject>
                        <ProjectIcon className="gift-card" />
                        <ProjectDetails>
                          <ProjectName>Gift Card System</ProjectName>
                          <ProjectTech>React, Node.js, MongoDB</ProjectTech>
                        </ProjectDetails>
                      </KeyProject>
                      <KeyProject>
                        <ProjectIcon className="rental" />
                        <ProjectDetails>
                          <ProjectName>Rental Apply Platform</ProjectName>
                          <ProjectTech>MERN Stack, Redux</ProjectTech>
                        </ProjectDetails>
                      </KeyProject>
                      <KeyProject>
                        <ProjectIcon className="ai" />
                        <ProjectDetails>
                          <ProjectName>Image Captioning System</ProjectName>
                          <ProjectTech>TensorFlow.js, React</ProjectTech>
                        </ProjectDetails>
                      </KeyProject>
                    </KeyProjectsList>
                  </KeyProjectsContainer>
                  
                  <ConnectButtonContainer>
                    <ConnectButton to="contact" smooth={true} duration={500} offset={-70}>
                      <ConnectButtonText>Let's Connect</ConnectButtonText>
                      <ButtonArrow><FaArrowRight /></ButtonArrow>
                      <ButtonHighlight />
                    </ConnectButton>
                  </ConnectButtonContainer>
                </ProfileContent>
              </ProfileCard>
            </motion.div>
            
            <motion.div 
              className="skills-section"
              style={{ y: parallaxY2 }}
            >
              <SkillsCard
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                transformStyle="preserve-3d"
              >
                <HoverGradientBorder />
                <SkillsContent>
                  <SkillsHeader>
                    <SkillsTitleWrapper>
                      <CubeGrid />
                      <SkillsTitle>Tech Stack</SkillsTitle>
                    </SkillsTitleWrapper>
                    <GlowUnderline />
                  </SkillsHeader>
                  
                  {skillCategories.map((category, catIndex) => (
                    <SkillCategory key={category.name} delay={catIndex * 0.2}>
                      <CategoryHeader>
                        <IconBubble>{category.icon}</IconBubble>
                        <CategoryName>{category.name}</CategoryName>
                      </CategoryHeader>
                      
                      <SkillsCloud>
                        {category.skills.map((skill, index) => (
                          <SkillPill 
                            key={skill}
                            initialDelay={0.1 * index + catIndex * 0.2}
                            whileHover={{ 
                              scale: 1.1,
                              y: -5
                            }}
                          >
                            {skill}
                            <SkillPillGlow />
                          </SkillPill>
                        ))}
                      </SkillsCloud>
                    </SkillCategory>
                  ))}
                  
                  
                </SkillsContent>
              </SkillsCard>
            </motion.div>
          </ContentGrid>
        </motion.div>
      </ContentContainer>
    </AboutSection>
  );
};

export default About;

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const spin = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 10px rgba(123, 104, 238, 0.6), 0 0 20px rgba(123, 104, 238, 0); }
  50% { text-shadow: 0 0 20px rgba(123, 104, 238, 0.8), 0 0 40px rgba(123, 104, 238, 0.4); }
  100% { text-shadow: 0 0 10px rgba(123, 104, 238, 0.6), 0 0 20px rgba(123, 104, 238, 0); }
`;

const borderGlow = keyframes`
  0% { box-shadow: 0 0 0 2px rgba(62, 116, 245, 0); }
  50% { box-shadow: 0 0 0 2px rgba(62, 116, 245, 0.8); }
  100% { box-shadow: 0 0 0 2px rgba(62, 116, 245, 0); }
`;

const rotate3d = keyframes`
  0% { transform: rotateX(0deg) rotateY(0deg); }
  50% { transform: rotateX(180deg) rotateY(180deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`;

// Styled Components
const AboutSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 8rem 0;
  overflow: hidden;
  background-color: #080b14;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
`;

const NeuralBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  background: 
    radial-gradient(
      circle at ${props => props.mouseX}px ${props => props.mouseY}px, 
      rgba(123, 104, 238, 0.15) 0%, 
      rgba(62, 116, 245, 0.05) 20%, 
      transparent 60%
    ),
    linear-gradient(135deg, #080b14 0%, #0f1a30 100%);
  transition: background 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233e74f5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

// const StarsCanvas = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: -1;
  
//   &:before, &:after {
//     content: '';
//     position: absolute;
//     width: 3px;
//     height: 3px;
//     border-radius: 50%;
//     background: white;
//   }
  
//   &:before {
//     box-shadow: 
//       20px 30px white, 50px 80px white, 80px 120px rgba(255,255,255,0.8),
//       110px 50px rgba(255,255,255,0.6), 140px 90px white, 170px 20px rgba(255,255,255,0.7),
//       200px 60px white, 230px 30px rgba(255,255,255,0.6), 260px 80px white,
//       310px 40px rgba(255,255,255,0.8), 340px 90px white, 370px 30px rgba(255,255,255,0.7),
//       400px 50px white, 450px 80px rgba(255,255,255,0.6), 490px 30px white,
//       520px 90px rgba(255,255,255,0.8), 560px 40px white, 590px 70px rgba(255,255,255,0.7),
//       620px 30px white, 650px 80px rgba(255,255,255,0.6), 680px 40px white,
//       720px 90px rgba(255,255,255,0.7), 750px 50px white, 780px 30px rgba(255,255,255,0.8),
//       825px 70px white, 850px 40px rgba(255,255,255,0.6), 880px 80px white,
//       910px 30px rgba(255,255,255,0.7), 940px 60px white, 970px 40px rgba(255,255,255,0.8);
//     animation: ${twinkle} 10s infinite alternate;
//   }
  
//   &:after {
//     box-shadow: 
//       30px 50px white, 65px 100px white, 95px 30px rgba(255,255,255,0.8),
//       130px 70px rgba(255,255,255,0.6), 160px 40px white, 190px 80px rgba(255,255,255,0.7),
//       220px 30px white, 255px 60px rgba(255,255,255,0.6), 285px 40px white,
//       320px 80px rgba(255,255,255,0.8), 355px 30px white, 385px 70px rgba(255,255,255,0.7),
//       420px 40px white, 455px 60px rgba(255,255,255,0.6), 485px 80px white,
//       520px 30px rgba(255,255,255,0.8), 555px 70px white, 585px 40px rgba(255,255,255,0.7),
//       620px 80px white, 655px 30px rgba(255,255,255,0.6), 685px 70px white,
//       720px 40px rgba(255,255,255,0.7), 755px 80px white, 785px 30px rgba(255,255,255,0.8),
//       820px 60px white, 860px 70px rgba(255,255,255,0.6), 890px 30px white,
//       925px 80px rgba(255,255,255,0.7), 960px 40px white, 995px 60px rgba(255,255,255,0.8);
//     animation: ${twinkle} 14s infinite alternate-reverse;
//   }
// `;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  .heading-container {
    margin-bottom: 3rem;
  }
  
  .subtitle-line {
    height: 3px;
    background: linear-gradient(90deg, transparent, #7b68ee, transparent);
    border-radius: 3px;
  }
  
  .subtitle-text {
    font-family: 'Mona Sans', sans-serif;
    font-size: 1.5rem;
    color: #a3b3ff;
    margin: 0 1.5rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
`;

const HeadingWrapper = styled.div`
  position: relative;
  height: 90px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  perspective: 1000px;
`;

// const OutlineText = styled.h2`
//   position: absolute;
//   font-family: 'Cabinet Grotesk', sans-serif;
//   font-size: 5rem;
//   font-weight: 800;
//   -webkit-text-stroke: 1px rgba(62, 116, 245, 0.3);
//   color: transparent;
//   transform: translateZ(-10px);
//   opacity: 0.5;
//   margin: 0;
//   user-select: none;
// `;

// const GlowText = styled.h2`
//   position: absolute;
//   font-family: 'Cabinet Grotesk', sans-serif;
//   font-size: 5rem;
//   font-weight: 800;
//   color: transparent;
//   -webkit-text-stroke: 1px #7b68ee;
//   filter: blur(4px);
//   animation: ${glow} 3s ease-in-out infinite;
//   transform: translateZ(-5px);
//   margin: 0;
//   user-select: none;
// `;

const SolidText = styled.h2`
  position: relative;
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 5rem;
  font-weight: 800;
  color: #f3f4f6;
  margin: 0;
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const GradientSpan = styled.span`
  background: linear-gradient(135deg, #3e74f5, #7b68ee, #a3b3ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientShift} 5s ease infinite;
`;

const SubtitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;



const CountUpNumber = styled.div`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3e74f5, #7b68ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #3e74f5, transparent);
    border-radius: 2px;
  }
`;

const AchievementLabel = styled.div`
  font-family: 'Mona Sans', sans-serif;
  color: #a3b3ff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: 0.8rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 6fr 5fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const HoverGradientBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  z-index: -1;
  background: linear-gradient(135deg, #3e74f5, #7b68ee, #3e74f5);
  background-size: 300% 300%;
  opacity: 0;
  transition: all 0.3s ease;
  animation: ${gradientShift} 5s ease infinite;
`;

const ProfileCard = styled(motion.div)`
  position: relative;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s ease;
  transform-style: preserve-3d;
  margin-top :30px;
  border: 1px solid rgba(138, 152, 234, 0.2);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 30px rgba(62, 116, 245, 0.05);
  
 
`;

const ProfileContent = styled.div`
  padding: 2.5rem;
  position: relative;
  z-index: 1;
`;

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const ProfileTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AnimatedCube = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #3e74f5;
  position: relative;
  transform-style: preserve-3d;
  animation: ${rotate3d} 8s linear infinite;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  &:before {
    border: 2px solid #7b68ee;
    transform: rotateY(90deg) translateZ(12px);
    left: -2px;
  }
  
  &:after {
    border: 2px solid #a3b3ff;
    transform: rotateX(90deg) translateZ(12px);
    top: -2px;
  }
`;

const ProfileTitle = styled.h3`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #f3f4f6;
  margin: 0;
`;

const GlowUnderline = styled.div`
  height: 3px;
  width: 60px;
  margin-top: 1rem;
  background: linear-gradient(90deg, #3e74f5, #7b68ee);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    animation: ${shine} 2s infinite;
  }
`;

const ProfileQuote = styled.blockquote`
  font-family: 'Mona Sans', sans-serif;
  font-style: italic;
  color: #a3b3ff;
  border-left: 3px solid #3e74f5;
  padding-left: 1rem;
  margin: 2rem 0;
  font-size: 1.2rem;
  position: relative;
  
  &:before {
    content: '"';
    position: absolute;
    top: -15px;
    left: -15px;
    font-size: 3rem;
    color: rgba(62, 116, 245, 0.2);
    font-family: Georgia, serif;
  }
`;

const ProfileText = styled.p`
  font-family: 'Mona Sans', sans-serif;
  color: #d1d5db;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const HighlightText = styled.span`
  position: relative;
  color: #f3f4f6;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #3e74f5, #7b68ee);
    opacity: 0.3;
    z-index: -1;
    border-radius: 3px;
  }
`;

const KeyProjectsContainer = styled.div`
  background: rgba(10, 17, 30, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  border-left: 3px solid #7b68ee;
`;

const KeyProjectsHeader = styled.h4`
  font-family: 'Cabinet Grotesk', sans-serif;
  color: #a3b3ff;
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
`;

const KeyProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const KeyProject = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: rgba(62, 116, 245, 0.1);
    transform: translateX(5px);
  }
`;

const ProjectIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3e74f5, #7b68ee);
  color: white;
  position: relative;
  overflow: hidden;
  
  &.gift-card:before {
    content: '🎁';
    font-size: 1rem;
  }
  
  &.rental:before {
    content: '🏠';
    font-size: 1rem;
  }
  
  &.ai:before {
    content: '🤖';
    font-size: 1rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(62, 116, 245, 0.7), rgba(123, 104, 238, 0.7));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${KeyProject}:hover & {
    &:after {
      opacity: 1;
    }
  }
`;

const ProjectDetails = styled.div`
  flex: 1;
`;

const ProjectName = styled.div`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 600;
  color: #f3f4f6;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const ProjectTech = styled.div`
  font-family: 'Mona Sans', sans-serif;
  font-size: 0.85rem;
  color: #a3b3ff;
`;

const ConnectButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const ConnectButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3e74f5, #7b68ee);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(62, 116, 245, 0.3);
    
    svg {
      transform: translateX(3px);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ConnectButtonText = styled.span`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-weight: 600;
  color: white;
  font-size: 1rem;
  position: relative;
  z-index: 2;
`;

const ButtonArrow = styled.span`
  color: white;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
`;

const ButtonHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  z-index: 1;
  
  ${ConnectButton}:hover & {
    transform: translateX(0);
  }
`;

const SkillsCard = styled(motion.div)`
  position: relative;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s ease;
  transform-style: preserve-3d;
  border: 1px solid rgba(138, 152, 234, 0.2);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 30px rgba(62, 116, 245, 0.05);
  
  
`;

const SkillsContent = styled.div`
  padding: 2.5rem;
  position: relative;
  z-index: 1;
`;

const SkillsHeader = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const SkillsTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CubeGrid = styled.div`
  width: 24px;
  height: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  
  div {
    background: #3e74f5;
    border-radius: 2px;
    animation: ${pulse} 2s infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      background: #7b68ee;
      animation-delay: 0.3s;
    }
    
    &:nth-child(3) {
      background: #a3b3ff;
      animation-delay: 0.6s;
    }
    
    &:nth-child(4) {
      animation-delay: 0.9s;
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(62, 116, 245, 0.3);
    filter: blur(8px);
    opacity: 0.5;
  }
`;

const SkillsTitle = styled.h3`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #f3f4f6;
  margin: 0;
`;

const SkillCategory = styled(motion.div)`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3e74f5, #7b68ee);
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(62, 116, 245, 0.3);
  animation: ${float} 3s ease-in-out infinite;
`;

const CategoryName = styled.h4`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

const SkillsCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const SkillPillGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 30px;
  z-index: -1;
  background: linear-gradient(135deg, #3e74f5, #7b68ee);
  opacity: 0;
  transition: all 0.3s ease;
  filter: blur(8px);
`;

const SkillPill = styled(motion.div)`
  position: relative;
  font-family: 'Mona Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #a3b3ff;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(138, 152, 234, 0.3);
  border-radius: 30px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
  
  &:hover {
    color: white;
    border-color: transparent;
    
    ${SkillPillGlow} {
      opacity: 1;
    }
  }
`;

const SkillsMeter = styled.div`
  margin-top: 3rem;
`;

const MeterLabel = styled.div`
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
`;

const MeterBar = styled.div`
  height: 12px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const MeterFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #3e74f5, #7b68ee);
  border-radius: 6px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30px;
    background: rgba(255, 255, 255, 0.2);
    filter: blur(3px);
    animation: ${shine} 2s infinite;
  }
`;

const MeterPercentage = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Mona Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
`;




