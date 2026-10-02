// public GitHub projects only, so every card has code a visitor can open.
// work projects (Arealytics, AreaDocs, the Data API) live in experience.js.
import heatmaps from "./heatmaps.json";
import { profile } from "./profile";

export const projects = [
    {
        title: "JewelCart - Multi-Vendor Jewellery E-Commerce Backend",
        period: "Personal project",
        bullets: [
            "Built 7 domain modules (auth, vendor, category, product, inventory, order, payment) on Java 21 and Spring Boot, with Razorpay payments and webhooks.",
            "Secured the API with JWT, BCrypt and role-based access; versioned the PostgreSQL schema with 16 Flyway migrations.",
            "Provisioned AWS with Terraform modules for EC2, ECR, RDS, IAM, SSM Parameter Store, security groups and monitoring: one terraform apply creates it all.",
            "GitHub Actions builds, tests and pushes Docker images to ECR; Prometheus and Grafana track API latency, errors and JVM metrics.",
            "Seeded realistic load with k6 scripts, and documented every engineering decision (schema, locking, security, order flow) in design notes.",
        ],
        links: { code: "https://github.com/Iswar-Ch-Rana/jewelCart", demo: null },
        tags: ["Java 21", "Spring Boot", "PostgreSQL", "Terraform", "AWS", "Docker", "GitHub Actions", "Razorpay", "Prometheus", "k6"],
    },
    {
        title: "MySQL MCP Server",
        period: "Open source",
        bullets: [
            "Read-only Model Context Protocol server that gives AI assistants (Claude, Copilot, Cursor) a safe, senior-DBA toolkit for a real MySQL database.",
            "28 tools, diagnostic-first: EXPLAIN ANALYZE with parsed bottlenecks, session profiling, slow-query digests and index-health checks.",
            "Dual-layer SQL injection protection (AST parsing plus regex); only SELECT, SHOW, DESCRIBE and EXPLAIN can run.",
            "Multi-connection with SSH tunnelling, stdio or HTTP transport, JSONL audit logging and schema filtering.",
            "Clean Architecture in strict TypeScript, tested with Vitest.",
        ],
        links: { code: "https://github.com/Iswar-Ch-Rana/mysql-mcp-server", demo: null },
        tags: ["TypeScript", "Node.js", "MCP", "MySQL", "Express", "Zod", "Vitest"],
    },
    {
        title: "Spring AI - Chat, RAG and Tool Calling",
        period: "Personal project",
        bullets: [
            "Five Spring Boot services that build up from a chat client to retrieval-augmented generation.",
            "Chat API with prompt templates and JDBC-backed chat memory, running on OpenAI or local Ollama models.",
            "RAG on a MariaDB vector store; the advanced version ingests PDF and JSON documents through a loader and transformer pipeline.",
            "Tool calling that lets the model invoke Java methods, plus a token-usage advisor and a global exception handler.",
        ],
        links: { code: "https://github.com/Iswar-Ch-Rana/Spring-AI", demo: null },
        tags: ["Java", "Spring Boot", "Spring AI", "RAG", "OpenAI", "Ollama", "MariaDB Vector"],
    },
    {
        title: "System Design - HLD and LLD",
        period: "Learning repository",
        bullets: [
            "22 design patterns implemented in Java: 5 creational, 7 structural and 10 behavioural, from Singleton and Builder to Visitor and Chain of Responsibility.",
            "Concurrency in practice: thread pools and executors, locks, deadlock prevention, thread safety and the producer-consumer problem.",
            "LLD fundamentals: dependency injection, API design, database design and resilient error handling, plus a guide to approaching LLD interviews.",
            "HLD notes on what breaks under traffic, vertical vs horizontal scaling, load-balancing algorithms, transactions and dual writes, and caching with Redis.",
        ],
        links: { code: "https://github.com/Iswar-Ch-Rana/System-Design", demo: null },
        tags: ["Java", "Design Patterns", "LLD", "HLD", "Concurrency", "Redis"],
    },
];

// the contribution calendar under the cards: the page fetches it live from a public
// CORS-enabled mirror of GitHub's calendar, and shows the copy that
// scripts/update-dsa-stats.mjs saves daily until then, or if that fetch fails
export const github = {
    title: "GitHub contributions",
    days: heatmaps.github ?? {},
    liveUrl: "https://github-contributions-api.jogruber.de/v4/Iswar-Ch-Rana?y=last",
    url: profile.social.github,
};
