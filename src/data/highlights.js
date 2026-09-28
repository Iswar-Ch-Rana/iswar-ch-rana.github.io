// capability cards shown under the hero, and the problem-solving dashboard.
// capability numbers come from the resume; DSA numbers come from dsa-stats.json,
// which scripts/update-dsa-stats.mjs refreshes daily from the three profiles.
import dsaStats from "./dsa-stats.json";

const fmt = (n) => n.toLocaleString("en-IN");

export const stats = [
  {
    icon: "architecture",
    title: "Scalable Architecture",
    text: "With my team, designed the architecture and features of a real estate listing platform and its multi-tenant, metered Data API, built to scale: HLD, LLD, API contracts and throttling at AWS API Gateway.",
    value: "223K+",
    label: "lease records served through the Data API",
  },
  {
    icon: "build",
    title: "Backend Development",
    text: "Scalable Java and Spring Boot services, from schema and REST APIs to tests, CI and deployment; now leading a rebuild on Java 25 and Spring Boot 4.",
    value: "5K–10K",
    label: "users on a platform migrated to Spring Boot, 40% faster",
  },
  {
    icon: "performance",
    title: "Performance at Scale",
    text: "Systems that hold up under load: set-based SQL, composite indexes, denormalization and Redis on MySQL and PostgreSQL, measured before and after.",
    value: "83%",
    label: "faster queries, from 30s to under 5s",
  },
  {
    icon: "devops",
    title: "Cloud & DevOps",
    text: "Docker and GitHub Actions CI/CD with JUnit and Testcontainers quality gates, Flyway migrations shipped automatically, and AWS infrastructure as code with Terraform.",
    value: "3",
    label: "environments (dev, staging, prod) deployed automatically",
  },
  {
    icon: "reliability",
    title: "Secure & Reliable",
    text: "Spring Security and Keycloak auth, API keys whose secrets are never stored, column-level entitlements and SQL-injection guards, plus idempotent APIs and a charge-once billing ledger.",
    value: "143",
    label: "fields under per-customer access control",
  },
];

export const dsa = {
  heading: "Problem Solving",
  subtitle: "Data structures and algorithms practice across three platforms.",
  updatedAt: dsaStats.updatedAt,
  platforms: [
    {
      name: "GeeksforGeeks",
      solved: dsaStats.gfg.solved,
      detail: `Institute rank ${dsaStats.gfg.instituteRank} · ${dsaStats.gfg.longestStreak}-day longest streak`,
      url: "https://www.geeksforgeeks.org/profile/ranabitu227",
      icon: "gfg",
    },
    {
      name: "LeetCode",
      solved: dsaStats.leetcode.solved,
      detail: `${dsaStats.leetcode.easy} easy · ${dsaStats.leetcode.medium} medium · ${dsaStats.leetcode.hard} hard`,
      url: "https://leetcode.com/u/iswar_2000",
      icon: "leetcode",
    },
    {
      name: "takeUforward",
      solved: dsaStats.tuf.solved,
      detail: `Global rank ${fmt(dsaStats.tuf.globalRank)}`,
      url: "https://takeuforward.org/profile/iswar_2000",
      icon: "tuf",
    },
  ],
  activity: [
    { value: fmt(dsaStats.activity.contributions), label: "contributions in 12 months" },
    { value: fmt(dsaStats.activity.activeDays), label: "active days" },
    { value: fmt(dsaStats.activity.bestStreak), label: "day best streak" },
  ],
  repo: { label: "DSA solutions in Java, 18 topics", url: "https://github.com/Iswar-Ch-Rana/DSA_Java" },
};

