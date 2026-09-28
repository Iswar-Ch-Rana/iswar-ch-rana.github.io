export const experience = [
    {
        title: "Software Engineer II",
        company: "Zessta Software Services, Hyderabad, India",
        period: "July 2026 - Present",
        project: "Arealytics Data API: metered B2B Data-as-a-Service",
        bullets: [
            "Co-authored the HLD, LLD, API contract and engineering standards for a per-record-metered REST API over 223K+ commercial lease records; redesigned auth and throttling from in-app OAuth2/JWT onto AWS API Gateway (API keys, usage plans).",
            "Built a multi-tenant entitlement engine on a 9-table MySQL control plane: tiered access to a type-safe 143-field allowlist plus state-level scoping. Denied columns never reach the SQL, and out-of-scope records return 404 to prevent enumeration.",
            "Designed a record-level billing ledger where a unique key enforces one charge per record per month through idempotent upserts, replacing a drift-prone counter.",
            "Designed idempotent API-key provisioning (DB-first writes, Idempotency-Key checks, secrets never stored) and a reconciler that keeps AWS in sync with the database.",
            "Leading the rebuild from Node.js/TypeScript to Java 25 + Spring Boot 4, with JUnit and Testcontainers tests gating CI.",
        ],
        tags: ["Java 25", "Spring Boot 4", "jOOQ", "Spring Data JPA", "MySQL", "Flyway", "AWS API Gateway", "System Design"],
    },
    {
        title: "Software Engineer",
        company: "Zessta Software Services, Hyderabad, India",
        period: "June 2024 - July 2026",
        project: "Arealytics real estate analytics platform, and AreaDocs document management",
        bullets: [
            "Migrated a legacy Node.js and stored-procedure system serving 5K–10K users to Spring Boot, improving performance by 40% with a layered, modular architecture.",
            "Optimized stored procedures with set-based operations, composite indexing and denormalization, cutting query time from 30s to under 5s (83%) and improving data retrieval by 95%.",
            "Centralised 30+ business rules in a Drools rules engine, so rule changes need no redeployment; automated stored-procedure deployments with Flyway and GitHub Actions across dev, staging and production.",
            "Integrated Keycloak with a semi-stateless design, using Redis for user deactivation and locking without session state.",
            "Built LIT, an internal listing tool: DB schema, multi-stage validation workflow and controlled promotion to client-facing listings.",
            "AreaDocs: owned the backend end to end; built OpenAPI 3.0 REST APIs with Spring Security, integrated the SERV Victoria API and AWS S3, and designed an atomic double-entry ledger with a full audit trail.",
        ],
        tags: ["Java 17", "Spring Boot", "MySQL", "PostgreSQL", "Drools", "Flyway", "Keycloak", "Redis", "AWS S3", "Docker"],
    },
    {
        title: "Software Developer Intern",
        company: "Zessta Software Services, Hyderabad, India",
        period: "December 2023 - May 2024",
        bullets: [
            "Completed six months of training in Spring Boot, Spring MVC, Spring Security, Docker and enterprise development patterns.",
            "Built 3 applications with a Spring Boot backend and Angular frontend, using REST APIs, JPA/Hibernate and MySQL schema design.",
            "Wrote JUnit 5 and Mockito tests and worked in Agile sprints with code reviews and Git.",
        ],
        tags: ["Spring Boot", "Angular", "JPA", "MySQL", "JUnit"],
    },
];
