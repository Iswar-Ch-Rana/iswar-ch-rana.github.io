// src/App.jsx
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import { SkeletonGrid } from './components/ui/skeleton';
import './index.css';

const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Education = React.lazy(() => import('./components/Education'));
// const Certifications = React.lazy(() => import('./components/Certifications'));
const Contact = React.lazy(() => import('./components/Contact'));

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Helmet>
                {/* ---------------------- PAGE TITLE ---------------------- */}
                <title>Iswar Chandra Rana - Software Engineer | Spring Boot, Node.js, Microservices</title>

                {/* ---------------------- META DESCRIPTION ---------------------- */}
                <meta
                    name="description"
                    content="Portfolio of Iswar Chandra Rana, Software Engineer specializing in Spring Boot and Node.js microservices, REST APIs, Angular-integrated applications, database optimization, AI-assisted engineering, and CI/CD delivery."
                />

                {/* ---------------------- KEYWORDS ---------------------- */}
                <meta
                    name="keywords"
                    content="Iswar Chandra Rana, Software Engineer, Spring Boot Developer, Node.js Developer, Microservices Developer, Angular Developer, Database Optimization, AI-Assisted Engineering, CI/CD, REST API Developer, Portfolio"
                />

                <meta name="author" content="Iswar Chandra Rana" />

                {/* ---------------------- OPEN GRAPH (SOCIAL SHARING) ---------------------- */}
                <meta property="og:title" content="Iswar Chandra Rana - Spring Boot, Node.js and Microservices Engineer" />
                <meta
                    property="og:description"
                    content="Explore my projects and experience in Spring Boot and Node.js backend engineering, microservices development, Angular-integrated delivery, database optimization, AI-assisted engineering, and CI/CD practices."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://iswarchandra.com" />
                <meta property="og:image" content="https://iswarchandra.com/preview.png" /> {/* Optional preview image */}

                {/* ---------------------- TWITTER TAGS ---------------------- */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Iswar Chandra Rana - Software Engineer (Spring Boot, Node.js, Microservices)" />
                <meta
                    name="twitter:description"
                    content="Portfolio of Iswar Chandra Rana showcasing Spring Boot and Node.js microservices work, Angular-integrated projects, database optimization, AI-assisted engineering, and CI/CD delivery."
                />

                <link rel="canonical" href="https://iswarchandra.com" />

                {/* ---------------------- STRUCTURED DATA (SEO) ---------------------- */}
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Iswar Chandra Rana",
              "url": "https://iswarchandra.com",
              "sameAs": [
                "https://github.com/Iswar-Ch-Rana",
                "https://www.linkedin.com/in/iswar-ch-rana"
              ],
              "jobTitle": "Software Engineer",
              "description": "Software Engineer focused on Spring Boot and Node.js microservices, secure REST APIs, Angular-integrated solutions, database optimization, AI-assisted engineering, and CI/CD delivery."
            }
          `}
                </script>

                {/* Allow Google to index the site */}
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* ---------------------- HEADER ---------------------- */}
            <Header />

            {/* ---------------------- MAIN CONTENT ---------------------- */}
            <div className="main-content">
                <About />

                <Suspense
                    fallback={
                        <div className="container py-16">
                            <SkeletonGrid count={6} />
                        </div>
                    }
                >
                    <Experience />
                    <Projects />
                    <Skills />
                    <Education />
                    {/*<Certifications />*/}
                    <Contact />
                </Suspense>
            </div>

            {/* ---------------------- FOOTER ---------------------- */}
            <Footer />
        </div>
    );
}

export default App;
