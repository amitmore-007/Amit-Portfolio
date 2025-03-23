// src/assets/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #0f172a;
    --secondary-color: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent-color: #38bdf8;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--primary-color);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  section {
    padding: 80px 0;
  }

  .container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-primary);
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: 3rem;
  }

  .highlight {
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
    }
    .section-subtitle {
      font-size: 1rem;
    }
  }
`;