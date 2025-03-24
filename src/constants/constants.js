// src/constants/constants.js
import fitnessImage from '../assets/images/fitness.png';
import giftcardImage from '../assets/images/giftcard.png';
import rentalImage from '../assets/images/rental.png';
import captionImage from '../assets/images/caption.png';
import interviewImage from '../assets/images/interview.png';
import biddingImage from '../assets/images/bidding.png';


export const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
  ];
  
  export const skills = [
    {
      title: "Frontend",
      skills: [
        { name: "React JS", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
        { name: "Redux", icon: "https://img.icons8.com/color/48/000000/redux.png" },
        
        { name: "HTML", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS", icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "Bootstrap", icon: "https://img.icons8.com/color/48/000000/bootstrap.png" },
        { name: "Material UI", icon: "https://img.icons8.com/color/48/000000/material-ui.png" },
        { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/48px-Tailwind_CSS_Logo.svg.png" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node JS", icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
        { name: "Express JS", icon: "https://img.icons8.com/fluency/48/000000/node-js.png" },
        { name: "MongoDB", icon: "https://img.icons8.com/color/48/000000/mongodb.png" },
        { name: "Firebase", icon: "https://img.icons8.com/color/48/000000/firebase.png" },
        { name: "Postman", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png" },
        { name: "SQL", icon: "https://img.icons8.com/?size=100&id=UFXRpPFebwa2&format=png&color=000000" },
      ],
    },
    {
      title: "Programming Languages",
      skills: [
      
        { name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "Javascript", icon: "https://img.icons8.com/?size=100&id=Nkym0Ujb8VGI&format=png&color=000000" },
      ],
    },
    {
      title: "Others",
      skills: [
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitHub", icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png" },
        { name: "Power BI", icon: "https://img.icons8.com/?size=100&id=3sGOUDo9nJ4k&format=png&color=000000" },
      ],
    },
  ];
  
  export const experiences = [
    {
      id: 1,
      role: "Frontend Development Intern",
      company: "Codsoft Solutions",
      date: "Dec 2023 - Jan 2024",
      description: [
        "Built responsive websites using HTML, CSS, and JavaScript.",
        "Assisted in developing frontend components using React.js.",
        "Participated in code reviews and testing procedures."
       
      ]
     
    },
    {
      id: 2,
      role: "Full Stack Web Developer Intern",
      company: "Zealits Solutions Inc.",
      date: "Nov 2024 - Present",
      description: [
        "Developed and maintained web applications using React.js and Node.js.",
        "Implemented RESTful APIs for data retrieval and manipulation.",
        "Collaborated with cross-functional teams to deliver high-quality software solutions."
       
      ]
    },
    
  ];
  
  export const projects = [
    {
      id: 1,
      title: "AI- Powered Fitness Website - FitSync",
      date: "Mar 2025 - Present",
      description:
        "FitRevolution is an AI-powered fitness platform designed to provide personalized workout plans, diet recommendations, and progress tracking based on user goals and preferences. It features an interactive dashboard, AI-driven food scanning, video meet functionality for real-time workout collaboration",
      image: fitnessImage,
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/amitmore-007/Workout-Planner.git",
      
    },
    {
      id: 2,
      title: "Restaurant Giftcard Management System",
      date: "Dec 2024 - Feb 2025",
      description:
        "The Gift Card Management System is a platform designed to facilitate the seamless purchase, storage, and redemption of gift cards. It enables users to securely buy, manage, and add gift cards to digital wallets like Google Wallet, while businesses can track transactions and buyer details efficiently. The system ensures secure payments, user-friendly management, and a smooth gifting experience.",
      image: giftcardImage,
      tags: ["React", "Material UI", "Chart.js", "Firebase"],
      github: "https://github.com/amitmore-007/good-gifts.git",
      webapp: "https://giftcards.aiiventure.com",
    },
    {
      id: 3,
      title: "Rental Apply Platform",
      date: "Jan 2025 - Feb 2025",
      description:
        "The Rental Apply Website is a platform designed to streamline the apartment rental process, allowing users to browse listings, apply for rentals, and make secure payments through Square API. It provides a user-friendly interface for tenants to submit applications and for property owners to manage rental requests efficiently, ensuring a seamless and transparent rental experience.",
      image: rentalImage,
      tags: ["React", "Redux", "Node.js", "MongoDB"],
      github: "https://github.com/amitmore-007/RentApply.git",
      webapp: "http://154.53.42.27:5000/",
    },
    {
      id: 4,
      title: "Interview Scheduler Platform",
      date: "Jan 2025 - Mar 2025",
      description:
        "The Interview Scheduler Website is a platform that allows recruiters to schedule interviews based on date, time, and candidate availability. It ensures a seamless scheduling process, enabling candidates to view and manage their interview slots efficiently.",
      image: interviewImage,
      tags: ["React", "API Integration", "Styled Components"],
      github: "https://github.com/amitmore-007/InterviewScheduler.git",
      webapp: "http://154.53.42.27:5000/",

    },
    {
        id: 5,
        title: "Image Captioning System using Deep Learning",
        date: "Sep 2024 - Mar 2025",
        description:
          "The Image Captioning System leverages Vision Transformers (ViTs) to generate accurate and context-aware descriptions for images. The Vision Encoder** extracts visual features, while the Transformer-based model deciphers contextual relationships to produce meaningful captions. ",
        image: captionImage,
        tags: ["React", "API Integration", "Vision Transformer", "Python",],
        github: "https://github.com/amitmore-007/Image-Captioning-Using-Deep-Learning.git",
        webapp: "https://project4.demo.com",
      },
      {
        id: 6,
        title: "Bidding Application",
        date: "Feb 2025 - Mar 2025",
        description:
          "The Bidding App is a real-time auction platform where users can place bids on listed items. It likely includes features such as user authentication, product listings, bidding history, and live updates on bid status. The system ensures fair and competitive bidding with secure transactions. This app is useful for e-commerce, online marketplaces, and auction-based sales. ",
        image: biddingImage,
        tags: ["React", "API Integration", "Express.js","Node.js"],
        github: "https://github.com/zealits/BiddingApp.git",
        webapp: "http://154.53.42.27:1710/",
      },
  ];