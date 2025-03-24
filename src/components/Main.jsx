import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import KUTE from 'kute.js';
import profileImage from '../assets/images/profile.jpg';
import fallbackImage from '../assets/images/profile.jpg';
import resume from '../assets/pdf/resume.pdf';
import ContactModal from './ContactModal'; // Import the contact modal componen


const Main = () => {
  const blobRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  useEffect(() => {
    // Animate the blob
    if (blobRef.current) {
      const tween = KUTE.fromTo(
        '#blob1',
        { path: '#blob1' },
        { path: '#blob2' },
        { repeat: 999, duration: 3000, yoyo: true }
      );
      tween.start();
    }
    
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    // Matrix effect with custom characters
    if (matrixCanvasRef.current) {
      const canvas = matrixCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // More developer-focused characters
      const characters = "{};<>()[]#$_&-+=*/|\\:\"'`~^%!?,.01";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      
      const drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -20);
      }
      
      const drawMatrix = () => {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#38bdf8';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          ctx.fillText(text, x, y);
          
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
      };
      
      const matrixInterval = setInterval(drawMatrix, 50);
      
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearInterval(matrixInterval);
        clearInterval(cursorInterval);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    // The actual submission logic is in the ContactModal component
  };

  

  return (
    <MainContainer id="home">
      <BackgroundElements>
        {/* <MatrixCanvas ref={matrixCanvasRef} /> */}
        <GradientOverlay />
        
        {/* Code animation in background instead of letters */}
        <CodeAnimationBackground>
          {Array(20).fill().map((_, i) => (
            <CodeSnippet 
              key={i}
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1,
                fontSize: `${Math.random() * 0.6 + 0.5}rem`
              }}
            >
              {[
                "function render() { return <Component />; }",
                "const [state, setState] = useState(null);",
                "useEffect(() => { getData(); }, []);",
                "export default function App() { ... }",
                "import React from 'react';",
                "const styles = { color: '#fff', margin: '1rem' };",
                "props.map(item => <div key={item.id}>{item.name}</div>)",
                "addEventListener('click', handleClick);",
                "document.querySelector('.element');",
                "fetch('/api/data').then(res => res.json())"
              ][Math.floor(Math.random() * 10)]}
            </CodeSnippet>
          ))}
        </CodeAnimationBackground>
        
        <CodeLines>
          {Array(15).fill().map((_, i) => (
            <CodeLine 
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              {`${i % 2 === 0 ? 'const ' : 'function '} ${['render', 'component', 'createApp', 'useState', 'useEffect', 'buildUI'][i % 6]}${i % 2 === 0 ? ' = ' : '() {'} ${['<div>', '</div>', 'return (', ')', 'import React', 'export default'][i % 6]}`}
            </CodeLine>
          ))}
        </CodeLines>
        
        
        {/* <Blob ref={blobRef}>
          <svg viewBox="0 0 600 600" width="100%" height="100%" preserveAspectRatio="none">
            <g transform="translate(300,300)">
              <path id="blob1" d="M120,-157.6C152.7,-141.5,174.3,-102.6,184.4,-62.4C194.6,-22.1,193.2,19.6,178,54.8C162.8,90,133.9,118.8,100.6,138.7C67.3,158.7,29.6,169.7,-12.4,178.9C-54.4,188.1,-100.7,195.4,-133.2,175.8C-165.7,156.1,-184.5,109.6,-179.9,70.7C-175.4,31.7,-147.4,0.3,-128.5,-27C-109.6,-54.3,-99.7,-77.5,-80.4,-95.9C-61,-114.2,-32.2,-127.7,6.2,-135.8C44.5,-143.9,87.3,-173.7,120,-157.6Z" fill="url(#gradient1)" />
              <path id="blob2" d="M137.1,-191.3C172,-163.4,190.6,-115.7,189.9,-73.9C189.2,-32.1,169.3,3.8,155.6,43.8C142,83.7,134.7,127.8,109.5,151.4C84.2,175,41.1,178.1,-5.2,184.6C-51.6,191.1,-103.2,201,-139.7,180.8C-176.2,160.7,-197.7,110.4,-206.1,60.5C-214.6,10.6,-210.1,-38.8,-187.5,-75.9C-164.9,-113,-124.2,-137.7,-84.8,-163.9C-45.5,-190,-22.7,-217.5,14.2,-235.7C51.2,-253.9,102.3,-219.1,137.1,-191.3Z" fill="url(#gradient1)" style={{ visibility: 'hidden' }} />
            </g>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(92, 225, 230, 0.7)" />
                <stop offset="50%" stopColor="rgba(142, 45, 226, 0.7)" />
                <stop offset="100%" stopColor="rgba(74, 0, 224, 0.7)" />
              </linearGradient>
            </defs>
          </svg>
        </Blob> */}
        
        {/* Code particles instead of brackets */}
        {Array(15).fill().map((_, i) => (
          <CodeParticle 
            key={i}
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 2 + 1}rem`
            }}
          >
            {["</>", "{ }", "( )", "[]", "#", "$", "=>", "&&", "||", "===", "++", "import", "export", "async", "await", "git status", "git add .","git commit", "useState()", "useRef()", "useEffect()", "useCallback()"][Math.floor(Math.random() * 15)]}
          </CodeParticle>
        ))}
        
        {/* Floating Git commands */}
        <GitCommand style={{ top: '15%', left: '8%', transform: 'rotate(-5deg)' }}>
          git commit -m "amazing portfolio"
        </GitCommand>
        <GitCommand style={{ top: '25%', right: '5%', transform: 'rotate(3deg)' }}>
          git push origin main
        </GitCommand>
        <GitCommand style={{ bottom: '30%', left: '12%', transform: 'rotate(2deg)' }}>
          npm install --save-dev
        </GitCommand>
        
        <GridLines />
      </BackgroundElements>
  
      <MainContent>
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ConsoleWrapper>
              <TerminalHeader>
                <TerminalDots>
                  <TerminalDot color="#ff5f56" />
                  <TerminalDot color="#ffbd2e" />
                  <TerminalDot color="#27c93f" />
                </TerminalDots>
                <TerminalTitle>~/portfolio/introduction.js</TerminalTitle>
              </TerminalHeader>
              <TerminalBody>
                <TerminalLine>
                  <LineNumber>1</LineNumber>
                  <LineContent><span className="const-keyword">const</span> <span className="function-name">Amit</span> <span className="operator">=</span> (<span className="param">name</span>, <span className="param">passion</span>) <span className="operator">=&gt;</span> {`{`}</LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>2</LineNumber>
                  <LineContent>  <span className="return-keyword">return</span> {`{`}</LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>3</LineNumber>
                  <LineContent>    <span className="property">name</span>: <span className="string">'Amit More'</span>,</LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>4</LineNumber>
                  <LineContent>    <span className="property">title</span>: <span className="string">'</span>
                    <TypeAnimation
                      sequence={[
                        'Full Stack Developer',
                        2000,
                        'UI/UX Designer',
                        2000,
                        'Problem Solver',
                        2000,
                        'Frontend Expert',
                        2000,
                      ]}
                      wrapper="span"
                      repeat={Infinity}
                      className="type-animation"
                    />
                    <span className="string">'</span>,
                  </LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>5</LineNumber>
                  <LineContent>    <span className="property">skills</span>: [<span className="string">'React'</span>, <span className="string">'Node.js'</span>, <span className="string">'TypeScript'</span>, <span className="string">'UI/UX'</span>],</LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>6</LineNumber>
                  <LineContent>    <span className="property">passion</span>: <span className="string">'Building beautiful digital experiences'</span></LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>7</LineNumber>
                  <LineContent>  {`}`};</LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>8</LineNumber>
                  <LineContent>{`}`};</LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>9</LineNumber>
                  <LineContent><span className="comment">// I design and develop services for customers of all sizes</span></LineContent>
                </TerminalLine>
                <TerminalLine>
                  <LineNumber>10</LineNumber>
                  <LineContent><span className="const-keyword">export default</span> <span className="function-name">Amit</span>;</LineContent>
                </TerminalLine>
                <CommandLine>
                  <LinePrefix>$</LinePrefix> <LineCommand>node introduction.js</LineCommand>
                  {cursorVisible && <Cursor>_</Cursor>}
                </CommandLine>
              </TerminalBody>
            </ConsoleWrapper>
            <ButtonContainer>
              <PrimaryButton 
                href={resume}
                target="_blank"
                as={motion.a}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonText>npm install resume</ButtonText>
              </PrimaryButton>
              {/* Modified the SecondaryButton to open the modal instead of scrolling */}
              <SecondaryButton 
                onClick={() => setIsModalOpen(true)} 
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonText>git contact --init</ButtonText>
              </SecondaryButton>
            </ButtonContainer>
            
            <SocialIcons>
              {[
                { Icon: FaGithub, url: "https://github.com/amitmore-007", label: "github" },
                { Icon: FaLinkedin, url: "https://www.linkedin.com/in/amit-more-57a646249/", label: "linkedin" },
                
              ].map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <SocialIconWrapper>
                    <SocialIcon 
                      href={social.url} 
                      target="_blank"
                      as={motion.a}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 5,
                        color: 'var(--accent-color)' 
                      }}
                    >
                      <social.Icon />
                    </SocialIcon>
                    <IconLabel>{social.label}</IconLabel>
                  </SocialIconWrapper>
                </motion.div>
              ))}
            </SocialIcons>
          </motion.div>
        </ContentWrapper>
        
        <ImageWrapper>
  <ProfileImageContainer>
    <ProfileImage 
      src={profileImage}
      alt="Amit More"
      as={motion.img}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      onError={(e) => {
        console.error("Image failed to load");
        e.target.src = fallbackImage;
      }}
    />
    
    <GlowingCircle />
    
    
  </ProfileImageContainer>
</ImageWrapper>
      </MainContent>
      
      <ScrollIndicator>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ScrollIcon>
            <span className="chevron"></span>
            <span className="chevron"></span>
            <span className="chevron"></span>
          </ScrollIcon>
        </motion.div>
        <ScrollText>scroll.addEventListener('down', showMore);</ScrollText>
      </ScrollIndicator>
      {/* Add the ContactModal component */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
      />
    </MainContainer>
  );
}

export default Main;

// Styled Components
const MainContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

// const MatrixCanvas = styled.canvas`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 0;
// `;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 1;
`;

const CodeLines = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  width: 40%;
  opacity: 0.1;
  font-family: 'Fira Code', monospace;
  z-index: 1;
`;

const CodeLine = styled(motion.div)`
  margin-bottom: 10px;
  color: #38bdf8;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(78, 16, 171, 0.15) 0%, rgba(15, 23, 42, 0) 70%),
              radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0) 70%);
  z-index: 2;
`;

const Blob = styled.div`
  position: absolute;
  top: -5%;
  right: -10%;
  width: 80%;
  height: 80%;
  opacity: 0.4;
  z-index: 1;
  
  @media screen and (max-width: 768px) {
    top: -20%;
    right: -20%;
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, 15px) rotate(5deg);
  }
  50% {
    transform: translate(5px, 25px) rotate(0deg);
  }
  75% {
    transform: translate(-5px, 10px) rotate(-5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

const CodeParticle = styled.div`
  position: absolute;
  color: rgba(56, 189, 248, 0.2);
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  z-index: 1;
  animation: ${floatAnimation} linear infinite;
`;

const GitCommand = styled.div`
  position: absolute;
  color: rgba(56, 189, 248, 0.2);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 10px;
  background: rgba(56, 189, 248, 0.05);
  border-radius: 5px;
  z-index: 1;
`;

const MainContent = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  z-index: 10;
  margin-top:120px;
  
  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 0 20px;
  
  @media screen and (max-width: 992px) {
    text-align: center;
    padding-top: 2rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:-140px;
  
  @media screen and (max-width: 992px) {
    margin-bottom: 2rem;
  }
`;

// Terminal styled components
const ConsoleWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  background: #1e1e1e;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  background: #252525;
  padding: 8px 16px;
`;

const TerminalDots = styled.div`
  display: flex;
  gap: 6px;
`;

const TerminalDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const TerminalTitle = styled.div`
  margin-left: 20px;
  color: #cccccc;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
`;

const CodeAnimationBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const CodeSnippet = styled.div`
  position: absolute;
  color: rgba(56, 189, 248, 0.2);
  font-family: 'Fira Code', monospace;
  white-space: nowrap;
  animation: ${floatAnimation} linear infinite;
`;

const TerminalBody = styled.div`
  background: #1e1e1e;
  padding: 16px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  
  .const-keyword, .return-keyword {
    color: #569cd6;
  }
  
  .function-name {
    color: #dcdcaa;
  }
  
  .param {
    color: #9cdcfe;
  }
  
  .operator {
    color: #d4d4d4;
  }
  
  .property {
    color: #9cdcfe;
  }
  
  .string {
    color: #ce9178;
  }
  
  .comment {
    color: #6a9955;
  }
  
  .type-animation {
    color: #ce9178;
  }
`;

const TerminalLine = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const LineNumber = styled.div`
  color: #858585;
  user-select: none;
  text-align: right;
  padding-right: 16px;
  min-width: 30px;
`;

const LineContent = styled.div`
  color: #d4d4d4;
`;

const CommandLine = styled.div`
  display: flex;
  margin-top: 16px;
  color: #d4d4d4;
  align-items: center;
`;

const LinePrefix = styled.span`
  color: #3ba58b;
  font-weight: bold;
  margin-right: 8px;
`;

const LineCommand = styled.span`
  color: #d4d4d4;
`;

const Cursor = styled.span`
  display: inline-block;
  color: #38bdf8;
  font-weight: bold;
  margin-left: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media screen and (max-width: 992px) {
    justify-content: center;
  }
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    margin: 0 auto 2.5rem;
  }
`;

const ButtonText = styled.span`
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrimaryButton = styled.a`
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 100%);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #818cf8 0%, #38bdf8 100%);
    transition: all 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    box-shadow: 0 6px 25px rgba(56, 189, 248, 0.5);
    
    &::before {
      left: 0;
    }
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  border: 2px solid rgba(56, 189, 248, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(56, 189, 248, 0.1);
    border-color: #38bdf8;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media screen and (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  
  &:hover {
    color: #38bdf8;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
    transform: translateY(-3px);
  }
`;

const IconLabel = styled.span`
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 20px;
  z-index: 5;
  transition: all 0.5s ease;
  border: 2px solid rgba(56, 189, 248, 0.5);
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.3);
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 40px rgba(56, 189, 248, 0.5);
  }
`;

const GlowingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%);
  filter: blur(15px);
  animation: rotateBlob 8s infinite alternate;
  z-index: 4;
  
  @keyframes rotateBlob {
    0% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    100% {
      border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%;
    }
  }
`;

const AnnotationLine = styled.div`
  position: absolute;
  top: 50%;
  width: 120px;
  height: 1px;
  background: rgba(56, 189, 248, 0.5);
  z-index: 6;
  
  &::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #38bdf8;
    top: -2px;
  }
  
  &:first-of-type::before {
    right: 0;
  }
  
  &:last-of-type::before {
    left: 0;
  }
`;

const AnnotationText = styled.div`
  position: absolute;
  top: -10px;
  width: max-content;
  font-size: 0.7rem;
  color: rgba(56, 189, 248, 0.8);
  font-family: 'Fira Code', monospace;
  
  ${AnnotationLine}:first-of-type & {
    right: 10px;
  }
  
  ${AnnotationLine}:last-of-type & {
    left: 10px;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const ScrollIcon = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #38bdf8;
    border-radius: 50%;
    animation: scrollDown 1.5s infinite;
  }
  
  @keyframes scrollDown {
    0% {
      opacity: 0;
      top: 6px;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      top: 30px;
    }
  }
`;

const ScrollText = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 10px;
  letter-spacing: 1px;
  font-family: 'Montserrat', sans-serif;
`;

const FloatingCodeElement = styled(motion.div)`
  position: absolute;
  background: rgba(15, 15, 40, 0.8);
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border-left: 3px solid var(--accent-color);
  max-width: 220px;
  z-index: 5;
  
  &[position="top-left"] {
    top: 15%;
    left: -240px;
  }
  
  &[position="bottom-right"] {
    bottom: 15%;
    right: -240px;
  }
  
  @media (max-width: 1200px) {
    display: none; /* Hide on smaller screens */
  }
`;

const TechBadge = styled(motion.div)`
  position: absolute;
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.7), rgba(142, 45, 226, 0.7));
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  z-index: 2;
`;

