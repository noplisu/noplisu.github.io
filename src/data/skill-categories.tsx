export default [
  {
    title: "Backend development",
    subcategories: [
      {
        title: "Server-side frameworks",
        technologies: [
          {
            name: "Ruby on Rails",
            image: "rails.svg",
            description: "Ruby on Rails is a web application framework written in the Ruby programming language. It emphasizes convention over configuration and enables developers to build robust and scalable applications rapidly."
          },
          {
            name: "Sinatra",
            image: "sinatra.svg",
            description: "Sinatra is a lightweight web application framework for Ruby. It prioritizes simplicity and minimalism, making it well-suited for small to medium-sized projects and APIs."
          },
          { 
            name: "Node.js",
            image: "nodejs.svg",
            description: "Node.js is a server-side JavaScript runtime environment. It enables the execution of JavaScript code outside a web browser. It allows for scalable and efficient development of networked applications."
          },
          { 
            name: "Apache kafka",
            image: "kafka.svg",
            description: "Apache Kafka is a distributed streaming platform. It facilitates the building of real-time data pipelines and streaming applications. It offers high-throughput, fault tolerance, and horizontal scalability."
          },
        ]
      },
      {
        title: "Database management",
        technologies: [
          {
            name: "MySQL",
            image: "mysql.svg",
            description: "MySQL is an open-source relational database management system (RDBMS). It efficiently stores and retrieves data. It is widely used for web applications and other software development projects."
          },
          {
            name: "Postgresql",
            image: "postgresql.svg",
            description: "PostgreSQL is a powerful open-source relational database management system (RDBMS) known for its extensibility, standards compliance, and advanced features. It makes it suitable for a wide range of applications."
          },
          {
            name: "SQLite",
            image: "sqlite.svg",
            description: "SQLite is a lightweight, self-contained, serverless, and open-source relational database management system (RDBMS). It is embedded directly into applications, making it suitable for local storage and small-scale deployments."
          },
        ]
      },
      {
        title: "Search engines",
        technologies: [
          { 
            name: "Apache Solr",
            image: "solr.svg",
            description: "Apache Solr is an open-source, highly scalable search platform built on Apache Lucene. It is designed to provide fast and efficient full-text search capabilities for large volumes of data."
          },
          { 
            name: "Elasticsearch",
            image: "elasticsearch.svg",
            description: "Elasticsearch is a distributed and scalable open-source search and analytics engine built on top of Apache Lucene. It is designed for high-performance full-text search, real-time data analysis, and centralized logging."
          },
          { 
            name: "OpenSearch",
            image: "opensearch.svg",
            description: "OpenSearch is an open-source search and analytics engine. It is a community-driven fork of Elasticsearch. It is designed to deliver high-performance full-text search and advanced analytics capabilities for various applications and use cases."
          },
        ]
      }
    ]
  },
  {
    title: "Frontend development",
    subcategories: [
      {
        title: "Frontend technologies",
        technologies: [
          {
            name: "HTML5",
            image: "html5.svg",
            description: "HTML5 is the latest version of the Hypertext Markup Language. It introduces new features and improvements, including native support for multimedia elements, enhanced semantic structure, and advanced APIs, to facilitate more dynamic and interactive web development."
          },
          {
            name: "CSS3",
            image: "css3.svg",
            description: "CSS3, the latest version of Cascading Style Sheets. It introduces advanced styling features and enhancements, including flexible box layout, grid layout, transitions, and animations, enabling more sophisticated and responsive web design."
          },
          {
            name: "Sass",
            image: "sass.svg",
            description: "Sass (Syntactically Awesome Stylesheets) is a CSS preprocessor. It extends the capabilities of CSS by providing features like variables, nested rules, and mixins. It facilitates more maintainable and modular stylesheet development."
          },
          {
            name: "Javascript",
            image: "js.svg",
            description: "JavaScript is a versatile and widely-used programming language. It enables dynamic, interactive, and client-side scripting in web browsers. It allows developers to create dynamic content, handle user input, and enhance the user experience on the web."
          },
          {
            name: "Typescript",
            image: "ts.svg",
            description: "TypeScript is a superset of JavaScript. It adds static typing, interfaces, and other advanced features to enhance developer productivity, code maintainability, and catch potential errors during development."
          },
        ]
      },
      {
        title: "Frontend frameworks",
        technologies: [
          {
            name: "Ember",
            image: "ember.svg",
            description: "Ember.js is a robust and opinionated JavaScript framework. It is used for building ambitious web applications, providing a convention-over-configuration approach, a powerful templating engine, and a set of tools to streamline development workflows."
          },
          {
            name: "React",
            image: "react.svg",
            description: "React is a declarative and efficient JavaScript library. It is used for building user interfaces, developed by Facebook. It allows developers to create reusable UI components and manage the state of applications with a virtual DOM for optimal performance."
          },
          {
            name: "Next.js",
            image: "nextjs.svg",
            description: "Next.js is a React framework that enables server-side rendering, automatic code splitting, and simplified routing, providing a seamless and efficient way to build static and dynamic web applications."
          },
        ]
      },
      {
        title: "CSS frameworks",
        technologies: [
          {
            name: "Bootstrap",
            image: "bootstrap.svg",
            description: "Bootstrap is a popular open-source front-end framework. It streamlines web development by providing a responsive grid system, pre-designed components, and styling, facilitating the creation of consistent and visually appealing websites."
          },
          {
            name: "Tailwind",
            image: "tailwind.svg",
            description: "Tailwind CSS is a utility-first CSS framework. It simplifies styling by providing low-level utility classes, allowing for a highly customizable and maintainable approach to building modern and responsive web interfaces."
          },
        ]
      }
    ]
  },
  {
    title: "VR/AR interactive experiences",
    subcategories: [
      {
        title: "Game Engines",
        technologies: [
          {
            name: "Unity",
            image: "unity.svg",
            description: "Unity is a cross-platform game development engine. It enables developers to create interactive 2D and 3D content, offering a comprehensive set of tools, a robust rendering engine, and support for various platforms and devices."
          },
          {
            name: "Three.js",
            image: "threejs.svg",
            description: "Three.js is a popular JavaScript library for creating 3D graphics on the web. It provides a high-level abstraction over WebGL and simplifying the development of interactive and visually stunning 3D applications."
          },
        ]
      },
      {
        title: "VR",
        technologies: [
          {
            name: "Meta Oculus",
            image: "meta.svg",
            description: "The Meta Oculus SDK (Software Development Kit) is a set of tools and libraries provided by Meta Platforms for developers. It is used to create virtual reality applications and experiences for Oculus VR devices."
          },
          {
            name: "XR Interaction Toolkit",
            image: "unity.svg",
            description: "The XR Interaction Toolkit is a Unity package that provides a framework and tools for developing immersive and interactive experiences in extended reality (XR) applications. It simplifies the implementation of common user interactions in virtual and augmented reality environments."
          }
        ]
      },
      {
        title: "AR",
        technologies: [
          {
            name: "Vuforia",
            image: "vuforia.png",
            description: "Vuforia is an augmented reality (AR) development platform. It enables the creation of interactive AR experiences by providing tools for image recognition, tracking, and 3D content integration."
          },
          {
            name: "AR foundation",
            image: "unity.svg",
            description: "AR Foundation is a cross-platform framework developed by Unity Technologies. It facilitates the creation of augmented reality (AR) applications, supporting both ARKit for iOS devices and ARCore for Android devices, allowing developers to build immersive AR experiences across multiple platforms using a unified codebase."
          },
          {
            name: "AR.js",
            image: "arjs.png",
            description: "AR.js is an open-source JavaScript library that enables the creation of augmented reality (AR) experiences directly in web browsers. It leverages WebXR standards and marker-based tracking to bring AR to a wide range of devices without the need for additional plugins or installations."
          },
          {
            name: "ARKit",
            image: "arkit.svg",
            description: "ARKit is Apple's augmented reality (AR) framework for iOS devices. It provides developers with tools and APIs to create immersive AR experiences by combining digital content with the real-world environment using features like motion tracking, environmental understanding, and light estimation."
          },
          {
            name: "ARCore",
            image: "arcore.svg",
            description: "ARCore is Google's augmented reality (AR) platform for Android devices. It offers developers tools and APIs to build AR applications that seamlessly integrate digital content with the physical world, leveraging features such as motion tracking and environmental understanding."
          },
        ]
      }
    ]
  },
  {
    title: "Mobile development",
    subcategories: [
      {
        title: "Mobile frameworks",
        technologies: [
          {
            name: "Apache cordova",
            image: "cordova.svg",
            description: "Apache Cordova is an open-source mobile development framework. It allows developers to build cross-platform mobile applications using web technologies such as HTML, CSS, and JavaScript."
          },
          {
            name: "React native",
            image: "react.svg",
            description: "React Native is a framework developed by Facebook. It enables the creation of native mobile applications for iOS and Android platforms using React and JavaScript. It allows for code reuse and efficient development across different operating systems."
          },
        ]
      }
    ]
  },
  {
    title: "Testing & code quality",
    subcategories: [
      {
        title: "Version control",
        technologies: [
          {
            name: "Git",
            image: "git.svg",
            description: "Git is a distributed version control system. It allows developers to track changes in source code during software development, facilitating collaboration, branching, and merging in a scalable and efficient manner."
          },
          {
            name: "Github",
            image: "github.svg",
            description: "GitHub is a web-based platform that utilizes Git for version control. It is providing developers with a collaborative environment to host, review, and manage code repositories. It offers project management tools and integration with various development workflows."
          },
          {
            name: "Bitbucket",
            image: "bitbucket.svg",
            description: "Bitbucket is a web-based platform for version control using Git and Mercurial. It offers source code repository hosting, collaboration features, and continuous integration capabilities for software development teams."
          },
          {
            name: "Gitlab",
            image: "gitlab.svg",
            description: "GitLab is a web-based DevOps lifecycle tool that provides a complete set of features for managing the software development process, including version control, continuous integration, and collaboration, all in a single integrated platform."
          },
        ]
      },
      {
        title: "Testing frameworks",
        technologies: [
          {
            name: "RSpec",
            image: "rspec.svg",
            description: "RSpec is a behavior-driven development (BDD) framework for the Ruby programming language. It allows developers to write specifications and tests in a natural language style, enhancing the readability and maintainability of code."
          },
          {
            name: "Minitest",
            image: "rails.svg",
            description: "Minitest is a minimalistic and flexible testing framework for the Ruby programming language. It offers a simple syntax and a comprehensive set of assertions for writing and running tests in a variety of contexts."
          },
          {
            name: "Jest",
            image: "jest.svg",
            description: "Jest is a JavaScript testing framework developed by Facebook. It provides a zero-config setup, fast test execution, and a comprehensive suite of utilities for testing React applications and other JavaScript projects."
          },
          {
            name: "Playwright",
            image: "playwright.svg",
            description: "Playwright is an open-source automation tool developed by Microsoft. It allows developers to script and run end-to-end tests for web applications across different browsers, providing browser automation capabilities, device emulation, and reliable cross-browser testing."
          },
          {
            name: "Selenium WebDriver",
            image: "selenium.svg",
            description: "Selenium is an open-source framework for automating web browsers. It provides a suite of tools and libraries for browser automation, including the ability to script interactions with web pages and perform automated testing of web applications."
          },
        ]
      },
      {
        title: "Linters & code formatters",
        technologies: [
          {
            name: "Rubocop",
            image: "rubocop.svg",
            description: "RuboCop is a static code analyzer and formatter for the Ruby programming language. It helps enforcing coding style conventions and identifying potential issues to enhance code quality and consistency."
          },
          {
            name: "ESLint",
            image: "eslint.svg",
            description: "ESLint is a static code analysis tool for JavaScript. It identifies and fixes code patterns, enforces coding standards, and helps developers write cleaner and more maintainable code."
          },
          {
            name: "Prettier",
            image: "prettier.svg",
            description: "Prettier is an opinionated code formatter. It automatically analyzes and formats code for various programming languages. It promotes consistent code styling and improving the readability of codebases."
          },
        ]
      }
    ]
  },
  {
    title: "DevOps",
    subcategories: [
      {
        title: "Operating systems",
        technologies: [
          {
            name: "MacOS",
            image: "macos.svg",
            description: "macOS is Apple's operating system for Macintosh computers. It is known for its user-friendly interface, Unix-based architecture, and provides a seamless integration with Apple's ecosystem of devices and services."
          },
          {
            name: "Linux",
            image: "ubuntu.svg",
            description: "Linux is an open-source, Unix-like operating system kernel. It serves as the foundation for various Linux distributions, providing a versatile and customizable platform for computer systems."
          },
          {
            name: "Windows",
            image: "windows.svg",
            description: "Windows is a widely used operating system developed by Microsoft. It is known for its user-friendly interface, broad software compatibility, and extensive use in personal computers worldwide."
          },
        ]
      },
      {
        title: "DevOps tools",
        technologies: [
          {
            name: "Github actions",
            image: "github-actions.svg",
            description: "GitHub Actions is an integrated continuous integration and continuous deployment (CI/CD) service provided by GitHub. It allows developers to automate workflows, build and test code, and deploy applications directly from their repositories."
          },
          {
            name: "Jenkins",
            image: "jenkins.svg",
            description: "Jenkins is an open-source automation server that facilitates continuous integration and continuous delivery (CI/CD) processes. It enables developers to automate building, testing, and deploying software."
          },
          {
            name: "Docker",
            image: "docker.svg",
            description: "Docker is a platform for developing, shipping, and running applications in containers. It provides a lightweight and efficient way to package software and its dependencies, ensuring consistency across different environments."
          },
          {
            name: "Terraform",
            image: "terraform.svg",
            description: "Terraform is an open-source infrastructure as code (IaC) tool. It enables developers to define and provision infrastructure resources across various cloud providers and on-premises environments. It ensures consistent and reproducible infrastructure deployment."
          },
        ]
      },
      {
        title: "Hosting services",
        technologies: [
          {
            name: "Google cloud",
            image: "google-cloud.svg",
            description: "Google Cloud is a comprehensive suite of cloud computing services and products offered by Google. It provides infrastructure, platform, and software services to support businesses in building, deploying, and scaling applications."
          },
          {
            name: "Heroku",
            image: "heroku.svg",
            description: "Heroku is a cloud platform as a service (PaaS) that simplifies application deployment, management, and scaling. It provides developers with an easy-to-use platform to build and deploy applications without worrying about underlying infrastructure."
          },
          {
            name: "Github pages",
            image: "github.svg",
            description: "GitHub Pages is a web hosting service provided by GitHub. It allows users to host static websites directly from their GitHub repositories with automatic deployment and free custom domain support."
          },
        ]
      }
    ]
  },
  {
    title: "Project Management",
    subcategories: [
      {
        title: "Project management methodologies",
        technologies: [
          {
            name: "Scrum",
            image: "scrum.svg",
            description: "Scrum is an agile project management framework characterized by iterative development, short time-boxed cycles called sprints. It focuses on collaboration, allowing teams to adapt to changing requirements and deliver valuable increments of a product."
          },
          {
            name: "Agile",
            image: "scrum.svg",
            description: "Agile is an iterative and flexible project management approach. It emphasizes collaboration, adaptability to change, and delivering incremental, customer-centric outcomes in software development and other industries."
          },
          {
            name: "PRINCE2",
            image: "prince2.svg",
            description: "PRINCE2 (PRojects IN Controlled Environments) is a structured project management methodology. It provides a systematic and scalable approach, emphasizing control, organization, and flexibility for effectively managing projects."
          },
        ]
      },
      {
        title: "Project management software",
        technologies: [
          {
            name: "Jira",
            image: "jira.svg",
            description: "Jira is a popular issue and project tracking software developed by Atlassian. It is widely used for agile project management, issue tracking, and team collaboration, providing a centralized platform for software development and project planning."
          },
          {
            name: "Trello",
            image: "trello.svg",
            description: "Trello is a web-based project management application. It uses boards, lists, and cards to help users organize tasks and projects in a visual and collaborative way, facilitating team coordination and task tracking."
          },
          {
            name: "Taiga",
            image: "taiga.svg",
            description: "Taiga is an open-source project management platform. It combines agile and traditional project management approaches, providing features such as user stories, sprints, and Kanban boards for efficient and collaborative project development."
          },
        ]
      }
    ]
  }
]
