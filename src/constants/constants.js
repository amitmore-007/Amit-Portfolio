// src/constants/constants.js
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
        { name: "Next JS", icon: "https://img.icons8.com/color/48/000000/nextjs.png" },
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
      ],
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "C", icon: "https://img.icons8.com/color/48/000000/c-programming.png" },
        { name: "C++", icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png" },
        { name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
      ],
    },
    {
      title: "Others",
      skills: [
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitHub", icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png" },
      ],
    },
  ];
  
  export const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "Company XYZ",
      date: "Jan 2023 - Present",
      description: [
        "Developed and maintained web applications using React.js and Node.js.",
        "Implemented RESTful APIs for data retrieval and manipulation.",
        "Collaborated with cross-functional teams to deliver high-quality software solutions."
      ]
    },
    {
      id: 2,
      role: "Web Developer Intern",
      company: "Tech Solutions Inc.",
      date: "May 2022 - Dec 2022",
      description: [
        "Built responsive websites using HTML, CSS, and JavaScript.",
        "Assisted in developing frontend components using React.js.",
        "Participated in code reviews and testing procedures."
      ]
    },
    {
      id: 3,
      role: "Frontend Developer",
      company: "Web Innovations",
      date: "Jan 2022 - Apr 2022",
      description: [
        "Created user interfaces according to design specifications.",
        "Optimized application performance through code refactoring.",
        "Implemented modern CSS techniques for responsive layouts."
      ]
    }
  ];
  
  export const projects = [
    {
      id: 1,
      title: "E-Commerce Website",
      date: "Mar 2023",
      description:
        "A fully functional e-commerce platform with product listings, shopping cart, and payment integration.",
      image: "/assets/images/projects/ecommerce.jpg",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/username/project1",
      webapp: "https://project1.demo.com",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      date: "Jan 2023",
      description:
        "A comprehensive dashboard for social media analytics with real-time data visualization.",
      image: "/assets/images/projects/dashboard.jpg",
      tags: ["React", "Material UI", "Chart.js", "Firebase"],
      github: "https://github.com/username/project2",
      webapp: "https://project2.demo.com",
    },
    {
      id: 3,
      title: "Task Management App",
      date: "Dec 2022",
      description:
        "A productivity app for managing tasks with features like drag-and-drop, reminders, and categorization.",
      image: "/assets/images/projects/taskapp.jpg",
      tags: ["React", "Redux", "Node.js", "MongoDB"],
      github: "https://github.com/username/project3",
      webapp: "https://project3.demo.com",
    },
    {
      id: 4,
      title: "Weather Forecast App",
      date: "Oct 2022",
      description:
        "A weather application that provides real-time forecasts and historical weather data for any location.",
      image: "/assets/images/projects/weather.jpg",
      tags: ["React", "API Integration", "Styled Components"],
      github: "https://github.com/username/project4",
      webapp: "https://project4.demo.com",
    },
  ];