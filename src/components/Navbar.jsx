import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '../constants/constants';
import logoImage from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeLink, setActiveLink] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Find active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection !== -1) {
        setActiveLink(navLinks[currentSection].id);
      }
    };
    
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavbarContainer 
      ref={navRef}
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      scrolled={scrollPosition > 50}
    >
      {/* Magnetic fluid animation background */}
      <NavbarBackground>
        <FluidCanvas 
          animate={{ 
            opacity: scrollPosition > 100 ? 0.7 : 1
          }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y / 100}deg) rotateY(${-mousePosition.x / 100}deg)`
          }}
        />
        
        <LiquidGlow 
          style={{ 
            left: `${mousePosition.x}px`, 
            top: `${mousePosition.y}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </NavbarBackground>
      
      <NavbarContent>
        <LogoContainer>
          <Logo
            as={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <LogoImage 
              src={logoImage}
              alt="Amit More"
              as={motion.img}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </Logo>
        </LogoContainer>
        
        <MenuContainer>
          <NavTrack>
            {navLinks.map((link, index) => (
              <NavItemWrapper
                key={link.id}
                as={motion.div}
                custom={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                isActive={activeLink === link.id}
              >
                <NavItem
                  as={motion.div}
                  animate={activeLink === link.id ? 
                    { scale: 1.1, y: -2 } : 
                    { scale: 1, y: 0 }
                  }
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={link.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => {
                      setActiveLink(link.id);
                      closeMenu();
                    }}
                    isActive={activeLink === link.id}
                  >
                    {link.title}
                    {activeLink === link.id && (
                      <ActiveIndicator 
                        as={motion.div}
                        layoutId="activeIndicator"
                        initial={false}
                      />
                    )}
                  </NavLink>
                </NavItem>
              </NavItemWrapper>
            ))}
          </NavTrack>
          
         
        </MenuContainer>
        
        <MobileIcon 
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </MobileIcon>
      </NavbarContent>
      
      <AnimatePresence>
        {isOpen && (
          <MobileMenuContainer
            as={motion.div}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MobileMenuInner>
              {navLinks.map((link, index) => (
                <MobileNavItem
                  key={link.id}
                  as={motion.div}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MobileNavLink
                    to={link.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={closeMenu}
                  >
                    {link.title}
                  </MobileNavLink>
                </MobileNavItem>
              ))}
              
              <MobileContactButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                Contact Me
              </MobileContactButton>
            </MobileMenuInner>
          </MobileMenuContainer>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;

// Styled components
const NavbarContainer = styled.nav`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  overflow: visible;
`;

const NavbarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 25, 0.8);
  backdrop-filter: blur(8px);
  overflow: hidden;
  z-index: -1;
  border-bottom: 1px solid rgba(130, 130, 255, 0.2);
`;

const FluidCanvas = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(
      125deg, 
      rgba(70, 30, 180, 0.2), 
      rgba(60, 100, 200, 0.1),
      rgba(120, 40, 220, 0.2)
    ),
    radial-gradient(
      circle at 30% 50%,
      rgba(100, 50, 220, 0.3) 0%,
      rgba(100, 50, 220, 0) 35%
    ),
    radial-gradient(
      circle at 70% 50%,
      rgba(60, 120, 255, 0.3) 0%,
      rgba(60, 120, 255, 0) 40%
    );
  filter: blur(12px) contrast(120%);
  mix-blend-mode: screen;
  transition: transform 0.1s ease;
`;

const LiquidGlow = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(125, 111, 255, 0.4) 0%,
    rgba(125, 111, 255, 0.2) 40%,
    rgba(125, 111, 255, 0) 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.1s ease;
  z-index: -1;
  filter: blur(20px);
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 90%;
  max-width: 1200px;
  padding: 0 20px;
  position: relative;
`;

const LogoContainer = styled.div`
  position: relative;
  cursor: pointer;
  perspective: 1000px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  position: relative;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
  height: 100%;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 20px;
  perspective: 1000px;
`;

const NavItemWrapper = styled.div`
  position: relative;
  padding: 5px 0;
  perspective: 800px;
`;

const NavItem = styled.div`
  position: relative;
  padding: 6px 15px;
  border-radius: 20px;
  background: ${({ isActive }) => 
    isActive 
      ? 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(65, 105, 225, 0.3))'
      : 'transparent'
  };
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(65, 105, 225, 0.2));
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #8A2BE2, #4169E1);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
`;

const NavLink = styled(Link)`
  color: ${({ isActive }) => (isActive ? 'white' : 'rgba(255, 255, 255, 0.8)')};
  display: block;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  cursor:pointer;
  &:hover {
    color: white;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
`;

const ContactButtonWrapper = styled.div`
  perspective: 1000px;
`;

const ContactButton = styled.button`
  position: relative;
  background: linear-gradient(135deg, #8A2BE2, #4169E1);
  border: none;
  color: white;
  padding: 10px 22px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  
  &:before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.5s ease;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 2;
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ContactButton}:hover & {
    opacity: 0.4;
  }
`;

const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
    z-index: 1001;
  }
`;

const MobileMenuContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, rgba(10, 10, 25, 0.95), rgba(30, 30, 60, 0.95));
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const MobileMenuInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const MobileNavItem = styled.div`
  width: 80%;
  max-width: 300px;
  margin: 8px 0;
  perspective: 1000px;
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 15px 20px;
  text-align: center;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  background: rgba(125, 111, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  
  &:hover {
    background: rgba(125, 111, 255, 0.2);
    transform: translateZ(10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const MobileContactButton = styled.button`
  margin-top: 20px;
  background: linear-gradient(135deg, #8A2BE2, #4169E1);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
`;