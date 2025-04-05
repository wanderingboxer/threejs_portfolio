export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];

export const myProjects = [
  {
    title: 'Super Saiyan Scroll - Immersive Interactive Experience',
    desc: 'Super Saiyan Scroll is an interactive web experience that takes users on a journey through the Dragon Ball Z universe. It features a dynamic scroll-based interface that allows users to explore the world of Dragon Ball Z in a unique and engaging way.',
    subdesc:
      'Built with React.js, Gsap, and TailwindCSS, Super Saiyan Scroll combines cutting-edge technology with stunning visuals to create an immersive experience that will delight fans of the series.',
    href: 'https://super-saiyan-scroll-809zuz1ks-aditya-saxenas-projects-14f18c2d.vercel.app/',
    texture: '/textures/project/Project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: '/assets/JavaScript.png',
      },
      {
        id: 4,
        name: 'GSAP',
        path: '/assets/GSAP.png',
      },
    ],
  },
  {
    title: 'Imaginify - AI-Powered Image Processing Platform',
    desc: 'Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payment system, and a credits-based model.',
    subdesc:
      'Built with Next.js, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. ',
    href: 'https://imaginify-six-mu.vercel.app/',
    texture: '/textures/project/Project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Next.js',
        path: '/assets/nextjs.png',
      },
    ],
  },
  {
    title: 'Zenova - Immersive Interactive Experience',
    desc: 'Zenova is an interactive web experience inspired by Zentry. It features a dynamic scroll-based interface that allows users to explore the world of Zenova in a unique and engaging way.',
    subdesc:
      'Built with React.js, Gsap, and Tailwind CSS, Zenova combines cutting-edge technology with stunning visuals to create an immersive experience that will delight users.',
    href: 'https://awwward-winning-website-2kfh7e50t.vercel.app/',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: '/assets/JavaScript.png',
      },
      {
        id: 4,
        name: 'GSAP',
        path: '/assets/GSAP.png',
      },
    ],
  },
  {
    title: 'Xora - A modern SaaS Landing Page',
    desc: 'Xora is a modern SaaS landing page template that is designed to help software companies showcase their products and services in a professional and engaging way. It features a clean and minimalistic design that is easy to customize and adapt to your needs.',
    subdesc:
      'Built with React.js, TailwindCSS, and JavaScript, Xora combines cutting-edge technology with a user-centric approach to create a landing page that will help you attract and convert more customers.',
    href: 'https://xora-vert.vercel.app/',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: '/assets/JavaScript.png',
      },
      {
        id: 4,
        name: 'Next.js',
        path: '/assets/nextjs.png',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'DRDO',
    pos: 'Research Trainee at SSPL Lab',
    duration: 'Feb-April 2025',
    title: "Worked as a Research Trainee at DRDO's Solid State Physics Lab (SSPL). Designed a laser frequency stabilisation locking system using the Pound-Drever-Hall technique, simulating and analysing its performance in LTspice. Researched on laser frequency drift mechanisms and factors affecting frequency stabilisation to enhance stabilisation techniques.",
    icon: '/assets/DRDO.png',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Sangria by dotkonnekt',
    pos: 'UI Intern',
    duration: 'June-October 2024',
    title: "Delivered 7 production-ready tasks, optimising platform functionality and boosting SEO performance. Developed and integrated over 5 APIs using React.js and Next.js, enhancing feature scalability. Designed and implemented responsive, user-friendly interfaces with Tailwind CSS and Material-UI, improving user engagement and accessibility.",
    icon: '/assets/dotkonnekt.jpeg',
    animation: 'clapping',
  },
  // {
  //   id: 3,
  //   name: 'Notion',
  //   pos: 'Junior Web Developer',
  //   duration: '2019 - 2020',
  //   title: "Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.",
  //   icon: '/assets/notion.svg',
  //   animation: 'salute',
  // },
];
