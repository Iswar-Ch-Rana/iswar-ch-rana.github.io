export const projects = [
    {
        title: "Arealytics - Real Estate Platform",
        period: "June 2024 - Present",
        bullets: [
            "Migrated a legacy Node.js and stored procedure-based platform to Spring Boot with a clean layered architecture and 40% performance improvement.",
            "Introduced a centralized Drools Rules Engine for 30+ business rules, enabling updates without code redeployment.",
            "Optimized query and procedure performance from 30 seconds to under 5 seconds and improved retrieval by 95% with denormalization.",
            "Standardized database changes with Flyway and improved deployment reliability using containerized workflows.",
            "Implemented blue-green deployment for Keycloak with Redis-backed user state management.",
        ],
        links: {
            code: null,
            demo: null,
        },
        tags: ["Spring Boot", "Node.js", "MySQL", "Drools", "Flyway", "Keycloak", "Docker", "Redis"],
    },
    {
        title: "AreaDocs - Land and Building Document Management",
        period: "June 2024 - Present",
        bullets: [
            "Built RESTful APIs following OpenAPI 3.0 with Spring Security, robust exception handling, and pagination.",
            "Designed an atomic ledger system using double-entry principles to ensure data integrity and full auditability.",
            "Integrated external SERV API and AWS S3 for secure document management.",
            "Dockerized the Spring Boot service for consistent deployments across environments.",
            "Implemented modular service-oriented design with clear separation of concerns for microservices readiness.",
        ],
        links: {
            code: null,
            demo: null,
        },
        tags: ["Spring Boot", "PostgreSQL", "AWS S3", "OpenAPI 3.0", "Docker", "Keycloak"],
    },
    {
        title: "DineFlow - Restaurant Automation System",
        period: "Academic and Personal Project",
        bullets: [
            "Built a full-stack application using Spring Boot and Angular for order management, customer feedback, and reporting.",
            "Optimized data access with Spring Data JPA entity design and query tuning, improving performance by 20%.",
            "Implemented secure RBAC with Spring Security and validated API contracts using Postman.",
            "Applied clean service layering and maintainable API design patterns for extensible feature growth.",
        ],
        links: {
            code: null,
            demo: null,
        },
        tags: ["Spring Boot", "Angular", "Spring Data JPA", "Hibernate", "MySQL", "Spring Security"],
    },
    {
        title: "Achievements and Recognition",
        period: "Career Highlights",
        bullets: [
            "Achieved 83% query time reduction and 95% data retrieval gain through denormalization and query redesign.",
            "Delivered 40% system performance improvement after migrating legacy backend modules to Spring Boot.",
            "Solved 300+ problems on LeetCode and 350+ problems on GeeksforGeeks, strengthening problem-solving depth.",
        ],
        links: {
            code: null,
            demo: null,
        },
        tags: ["Performance Optimization", "Backend Engineering", "Problem Solving"],
    },
];
