const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const SI = "https://cdn.simpleicons.org";

export const skills = [
    {
        title: "Backend",
        items: [
            { name: "Java 17/21/25", icon: `${DEV}/java/java-original.svg` },
            { name: "Spring Boot", icon: `${DEV}/spring/spring-original.svg` },
            { name: "Spring MVC", icon: `${DEV}/spring/spring-original.svg` },
            { name: "Spring Data JPA", icon: `${DEV}/spring/spring-original.svg` },
            { name: "Hibernate", icon: `${DEV}/hibernate/hibernate-original.svg` },
            { name: "jOOQ", icon: `${DEV}/java/java-original.svg` },
            { name: "Node.js", icon: `${DEV}/nodejs/nodejs-original.svg` },
            { name: "Express.js", icon: `${DEV}/express/express-original.svg` },
            { name: "TypeScript", icon: `${DEV}/typescript/typescript-original.svg` },
            { name: "Drools", icon: `${DEV}/java/java-original.svg` },
        ],
    },
    {
        title: "Databases",
        items: [
            { name: "MySQL", icon: `${DEV}/mysql/mysql-original.svg` },
            { name: "PostgreSQL", icon: `${DEV}/postgresql/postgresql-original.svg` },
            { name: "Redis", icon: `${DEV}/redis/redis-original.svg` },
            { name: "MariaDB (vector)", icon: `${DEV}/mariadb/mariadb-original.svg` },
            { name: "SQL & PL/SQL", icon: `${DEV}/oracle/oracle-original.svg` },
            { name: "Query Optimization", icon: `${DEV}/mysql/mysql-original.svg` },
            { name: "Indexing", icon: `${DEV}/postgresql/postgresql-original.svg` },
            { name: "Flyway", icon: `${SI}/flyway` },
        ],
    },
    {
        title: "Cloud and DevOps",
        items: [
            { name: "AWS (API Gateway, EC2, RDS, S3, ECR, SSM, IAM)", icon: `${DEV}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
            { name: "Terraform", icon: `${DEV}/terraform/terraform-original.svg` },
            { name: "Docker", icon: `${DEV}/docker/docker-original.svg` },
            { name: "GitHub Actions", icon: `${DEV}/githubactions/githubactions-original.svg` },
            { name: "Maven", icon: `${DEV}/maven/maven-original.svg` },
            { name: "Git", icon: `${DEV}/git/git-original.svg` },
            { name: "Linux", icon: `${DEV}/linux/linux-original.svg` },
        ],
    },
    {
        title: "Security and APIs",
        items: [
            { name: "Spring Security", icon: `${SI}/springsecurity` },
            { name: "Keycloak", icon: `${SI}/keycloak` },
            { name: "JWT", icon: `${SI}/jsonwebtokens/white` },
            { name: "OpenAPI 3.0 / Swagger", icon: `${DEV}/swagger/swagger-original.svg` },
            { name: "REST API Design", icon: `${DEV}/postman/postman-original.svg` },
        ],
    },
    {
        title: "Testing and Observability",
        items: [
            { name: "JUnit", icon: `${DEV}/junit/junit-original.svg` },
            { name: "Testcontainers", icon: `${DEV}/docker/docker-original.svg` },
            { name: "k6", icon: `${SI}/k6` },
            { name: "Prometheus", icon: `${DEV}/prometheus/prometheus-original.svg` },
            { name: "Grafana", icon: `${DEV}/grafana/grafana-original.svg` },
            { name: "Postman", icon: `${DEV}/postman/postman-original.svg` },
        ],
    },
    {
        title: "AI Engineering",
        items: [
            { name: "Spring AI", icon: `${DEV}/spring/spring-original.svg` },
            { name: "RAG", icon: `${DEV}/mariadb/mariadb-original.svg` },
            { name: "Model Context Protocol (MCP)", icon: `${SI}/modelcontextprotocol/white` },
            { name: "Ollama", icon: `${SI}/ollama/white` },
            { name: "Claude Code", icon: `${SI}/claude` },
            { name: "GitHub Copilot", icon: `${SI}/githubcopilot/white` },
        ],
    },
    {
        title: "System Design",
        items: [
            { name: "HLD & LLD", icon: `${DEV}/java/java-original.svg` },
            { name: "Microservices", icon: `${DEV}/spring/spring-original.svg` },
            { name: "Design Patterns", icon: `${DEV}/java/java-original.svg` },
            { name: "Concurrency", icon: `${DEV}/java/java-original.svg` },
            { name: "Caching", icon: `${DEV}/redis/redis-original.svg` },
            { name: "Idempotency & Rate Limiting", icon: `${DEV}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
        ],
    },
    {
        title: "Frontend",
        items: [
            { name: "Angular", icon: `${DEV}/angular/angular-original.svg` },
            { name: "JavaScript", icon: `${DEV}/javascript/javascript-original.svg` },
            { name: "HTML5", icon: `${DEV}/html5/html5-original.svg` },
            { name: "CSS3", icon: `${DEV}/css3/css3-original.svg` },
        ],
    },
];
