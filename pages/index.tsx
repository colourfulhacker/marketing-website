import type { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { services } from "../data/services";
import { jobPositions } from "../data/jobs";

const Home: NextPage = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const handleApply = (jobTitle: string, isInternship: boolean = false) => {
    const applicationType = isInternship ? 'internship' : 'full-time';
    router.push(`/questionnaire?job=${encodeURIComponent(jobTitle)}&type=${applicationType}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <Layout>
      <div style={{ minHeight: "100vh", position: "relative" }}>
      <Head>
        <title>Cehpoint Jobs in West Bengal & India | Digital Marketing, Sales, Business Development Careers 2024</title>
        <meta name="description" content="Apply for top jobs in West Bengal, Kolkata, India at Cehpoint. Hiring Digital Marketing Lead, Growth Strategist, Business Development Executive, Sales Development Representative. Join India's leading technology solutions company." />
        <meta name="keywords" content="jobs in west bengal, jobs in kolkata, jobs in india, digital marketing jobs, sales jobs india, business development jobs, technology sales jobs, marketing jobs west bengal, cybersecurity sales jobs, IT sales jobs india, startup jobs india, work from home jobs india" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cehpoint" />
        <meta name="geo.region" content="IN-WB" />
        <meta name="geo.placename" content="West Bengal" />
        <meta name="geo.position" content="22.5726;88.3639" />
        <meta name="ICBM" content="22.5726, 88.3639" />
        
        <meta property="og:title" content="Cehpoint Jobs - Digital Marketing, Sales & Business Development in West Bengal & India" />
        <meta property="og:description" content="Join Cehpoint's elite team. Apply for Digital Marketing Lead, Sales Development, Business Development positions. Technology sales & marketing careers in India." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Cehpoint Careers" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cehpoint Jobs in West Bengal & India | Apply Now" />
        <meta name="twitter:description" content="Premium technology sales & marketing careers. Digital Marketing, Business Development, Sales positions available." />
        
        <link rel="canonical" href="https://marketing-jobs.cehpoint.co.in" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Multiple Positions Available",
            "description": "Cehpoint is hiring for Digital Marketing Lead, Growth Strategist, Business Development Executive, Sales Development Representative, and more positions in West Bengal and across India.",
            "datePosted": "2024-05-29",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Cehpoint",
              "sameAs": "https://marketing-jobs.cehpoint.co.in",
              "logo": "https://marketing-jobs.cehpoint.co.in/favicon.ico"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "West Bengal",
                "addressCountry": "IN"
              }
            },
            "employmentType": "FULL_TIME",
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": 35000,
                "maxValue": 90000,
                "unitText": "MONTH"
              }
            }
          })}
        </script>
      </Head>

      <main>
        {/* Hero Section */}
        <section style={{ 
          padding: "8rem 0 6rem",
          position: "relative",
          overflow: "hidden"
        }}>
          <motion.div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            style={{
              position: "absolute",
              top: "40%",
              right: "10%",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
              filter: "blur(90px)",
              pointerEvents: "none"
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "inline-block",
                  padding: "0.625rem 1.5rem",
                  background: "rgba(167, 139, 250, 0.1)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  borderRadius: "50px",
                  marginBottom: "2.5rem",
                  backdropFilter: "blur(10px)"
                }}
              >
                <span style={{ 
                  fontSize: "0.875rem", 
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  🚀 We&apos;re Hiring Top Talent
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="display-font gradient-text gradient-text-animated"
                style={{
                  fontSize: "clamp(2.75rem, 8vw, 6rem)",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05
                }}
              >
                CEHPOINT
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                  fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                  lineHeight: 1.65,
                  fontWeight: 400
                }}
              >
                Empowering Businesses Through Results-Driven Innovation
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.35rem)",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                  lineHeight: 1.7
                }}
              >
                Join India&apos;s Most Ambitious Technology Company — Where Value Creators Thrive
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "3.5rem",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "10px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#10B981", fontSize: "14px", fontWeight: "600" }}>
                    Verified Employer
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    borderRadius: "10px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#7C3AED", fontSize: "14px", fontWeight: "600" }}>
                    Performance-Based Growth
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "1px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "10px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#EC4899", fontSize: "14px", fontWeight: "600" }}>
                    Elite Team
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{ 
                  display: "flex", 
                  gap: "1.25rem", 
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
              >
                <motion.button
                  className="btn btn-primary"
                  onClick={() => {
                    document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1.1rem" }}
                >
                  Explore Opportunities →
                </motion.button>
                <motion.button
                  className="btn btn-secondary"
                  onClick={() => router.push('/salary-calculator')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1.1rem" }}
                >
                  💰 Salary Calculator
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section 
          style={{ 
            padding: "6rem 0",
            position: "relative",
            background: "linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.03) 50%, transparent 100%)"
          }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <h2 
                className="display-font"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.03em",
                  color: "var(--text)"
                }}
              >
                Our Services
              </h2>
              <p style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                color: "var(--text-secondary)",
                maxWidth: "800px",
                margin: "0 auto 1rem"
              }}>
                Comprehensive technology solutions powering businesses across industries
              </p>
              <p style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "var(--text-muted)",
                maxWidth: "700px",
                margin: "0 auto"
              }}>
                Every role at Cehpoint directly contributes to delivering these cutting-edge services
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "1.75rem",
                maxWidth: "1400px",
                margin: "0 auto"
              }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  style={{
                    background: "linear-gradient(135deg, rgba(23, 23, 35, 0.8) 0%, rgba(30, 30, 45, 0.7) 100%)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "2rem",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  whileHover={{ y: -8, borderColor: "rgba(167, 139, 250, 0.25)" }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: service.gradient,
                      opacity: 0,
                      transition: "opacity 0.4s"
                    }}
                    animate={{
                      opacity: hoveredService === index ? 0.05 : 0
                    }}
                  />
                  
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px"
                    }}>
                      {service.icon}
                    </div>
                    
                    <h3 style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                      color: "var(--text)",
                      textAlign: "center",
                      lineHeight: 1.3
                    }}>
                      {service.title}
                    </h3>
                    
                    <p style={{
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      marginBottom: "1rem",
                      lineHeight: 1.6,
                      textAlign: "center",
                      minHeight: "60px"
                    }}>
                      {service.description}
                    </p>
                    
                    <div style={{
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "1rem",
                      marginTop: "1rem",
                      marginBottom: "1rem"
                    }}>
                      <p style={{
                        fontSize: "0.85rem",
                        color: "var(--primary-light)",
                        fontWeight: 600,
                        textAlign: "center",
                        lineHeight: 1.5,
                        marginBottom: "1rem"
                      }}>
                        {service.selling}
                      </p>
                      
                      <div style={{
                        background: "rgba(124, 58, 237, 0.08)",
                        borderRadius: "10px",
                        padding: "1rem",
                        border: "1px solid rgba(124, 58, 237, 0.15)",
                        marginBottom: "0.75rem"
                      }}>
                        <div style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "var(--primary-light)",
                          marginBottom: "0.5rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem"
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Who Can Sell
                        </div>
                        <p style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                          margin: 0
                        }}>
                          {service.whoCanSell}
                        </p>
                      </div>
                      
                      <div style={{
                        background: "rgba(16, 185, 129, 0.08)",
                        borderRadius: "10px",
                        padding: "1rem",
                        border: "1px solid rgba(16, 185, 129, 0.15)",
                        marginBottom: "0.75rem"
                      }}>
                        <div style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#10B981",
                          marginBottom: "0.5rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem"
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          How to Sell
                        </div>
                        <p style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                          margin: 0
                        }}>
                          {service.howToSell}
                        </p>
                      </div>
                      
                      <div style={{
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%)",
                        borderRadius: "10px",
                        padding: "1rem",
                        border: "1px solid rgba(236, 72, 153, 0.2)"
                      }}>
                        <div style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#EC4899",
                          marginBottom: "0.5rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem"
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Earning Potential
                        </div>
                        <p style={{
                          fontSize: "0.9rem",
                          color: "var(--text)",
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 700
                        }}>
                          {service.earnings}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Jobs Section */}
        <section 
          id="positions"
          style={{ 
            padding: "5rem 0 7rem",
            position: "relative"
          }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <h2 
                className="display-font"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.03em",
                  color: "var(--text)"
                }}
              >
                Open Positions
              </h2>
              <p style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                color: "var(--text-secondary)",
                maxWidth: "700px",
                margin: "0 auto"
              }}>
                Discover your next career move with opportunities designed for ambitious professionals
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                gap: "2rem",
                maxWidth: "1400px",
                margin: "0 auto"
              }}
            >
              {jobPositions.map((job, index) => (
                <motion.div
                  key={job.title}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="card"
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                      opacity: 0,
                      transition: "opacity 0.4s",
                      borderRadius: "24px"
                    }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                  />
                  
                  <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "flex-start",
                      marginBottom: "1.5rem"
                    }}>
                      <span style={{
                        padding: "0.5rem 1rem",
                        background: "rgba(167, 139, 250, 0.1)",
                        border: "1px solid rgba(167, 139, 250, 0.2)",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--primary-light)"
                      }}>
                        {job.category}
                      </span>
                      
                      {job.badge && (
                        <span style={{
                          padding: "0.375rem 0.875rem",
                          background: job.badge === "Hot" 
                            ? "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)"
                            : job.badge === "Featured"
                            ? "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)"
                            : "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "white",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {job.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 style={{
                      fontSize: "1.65rem",
                      fontWeight: 700,
                      marginBottom: "1rem",
                      color: "var(--text)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3
                    }}>
                      {job.title}
                    </h3>
                    
                    <p style={{
                      fontSize: "1.05rem",
                      color: "var(--text-secondary)",
                      marginBottom: "1.25rem",
                      lineHeight: 1.7
                    }}>
                      {job.description}
                    </p>
                    
                    <div style={{
                      background: "rgba(124, 58, 237, 0.08)",
                      borderRadius: "12px",
                      padding: "1rem",
                      marginBottom: "1.5rem",
                      border: "1px solid rgba(124, 58, 237, 0.15)"
                    }}>
                      <div style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--primary-light)",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        Services You&apos;ll Promote
                      </div>
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.75rem"
                      }}>
                        {job.servicesPromoted.map((service, idx) => (
                          <span key={idx} style={{
                            fontSize: "0.75rem",
                            padding: "0.35rem 0.75rem",
                            background: "rgba(167, 139, 250, 0.15)",
                            border: "1px solid rgba(167, 139, 250, 0.25)",
                            borderRadius: "6px",
                            color: "var(--text)",
                            fontWeight: 500
                          }}>
                            {service}
                          </span>
                        ))}
                      </div>
                      <p style={{
                        fontSize: "0.875rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.6
                      }}>
                        {job.serviceDescription}
                      </p>
                    </div>
                    
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedJob(expandedJob === index ? null : index);
                      }}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        background: "rgba(30, 30, 45, 0.6)",
                        border: "1px solid rgba(167, 139, 250, 0.2)",
                        borderRadius: "10px",
                        color: "var(--text)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        marginBottom: "1rem",
                        transition: "all 0.3s"
                      }}
                      whileHover={{ background: "rgba(40, 40, 55, 0.8)" }}
                    >
                      {expandedJob === index ? "Hide" : "View"} Roles & Responsibilities
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ rotate: expandedJob === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedJob === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden", marginBottom: "1.5rem" }}
                        >
                          <div style={{
                            background: "rgba(23, 23, 35, 0.8)",
                            borderRadius: "12px",
                            padding: "1.25rem",
                            border: "1px solid rgba(255, 255, 255, 0.08)"
                          }}>
                            <h4 style={{
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "var(--primary-light)",
                              marginBottom: "1rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em"
                            }}>
                              Key Responsibilities
                            </h4>
                            <ul style={{
                              listStyle: "none",
                              padding: 0,
                              margin: 0,
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.75rem"
                            }}>
                              {job.responsibilities.map((responsibility, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  style={{
                                    fontSize: "0.9rem",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.7,
                                    paddingLeft: "1.5rem",
                                    position: "relative"
                                  }}
                                >
                                  <span style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "0.35rem",
                                    width: "6px",
                                    height: "6px",
                                    background: "var(--primary-light)",
                                    borderRadius: "50%"
                                  }} />
                                  {responsibility}
                                </motion.li>
                              ))}
                            </ul>
                            
                            <div style={{
                              marginTop: "1.5rem",
                              paddingTop: "1.25rem",
                              borderTop: "1px solid rgba(167, 139, 250, 0.15)"
                            }}>
                              <h4 style={{
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                color: "var(--primary-light)",
                                marginBottom: "0.75rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                              }}>
                                What Success Looks Like
                              </h4>
                              <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.65rem"
                              }}>
                                <div style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.5rem"
                                }}>
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: "2px" }}>
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p style={{
                                    fontSize: "0.875rem",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.6,
                                    margin: 0
                                  }}>
                                    {job.performanceExpectations}
                                  </p>
                                </div>
                                <div style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.5rem"
                                }}>
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: "2px" }}>
                                    <path d="M13 7H7C5.89543 7 5 7.89543 5 9V17C5 18.1046 5.89543 19 7 19H15C16.1046 19 17 18.1046 17 17V11M14 3L21 3M21 3V10M21 3L10 14" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <p style={{
                                    fontSize: "0.875rem",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.6,
                                    margin: 0
                                  }}>
                                    <strong style={{ color: "var(--primary-light)" }}>Monthly benchmark:</strong> {job.monthlyGoal}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "1.5rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      marginTop: "auto",
                      marginBottom: "1rem"
                    }}>
                      <span style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--primary-light)"
                      }}>
                        {job.salary}/month
                      </span>
                    </div>

                    <div style={{
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap"
                    }}>
                      <motion.button
                        onClick={() => handleApply(job.title, false)}
                        style={{
                          flex: 1,
                          minWidth: "140px",
                          padding: "0.875rem 1.25rem",
                          background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                          border: "none",
                          borderRadius: "10px",
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)"
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Apply Now →
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleApply(job.title, true)}
                        style={{
                          flex: 1,
                          minWidth: "140px",
                          padding: "0.875rem 1.25rem",
                          background: "rgba(30, 30, 45, 0.8)",
                          border: "2px solid rgba(236, 72, 153, 0.3)",
                          borderRadius: "10px",
                          color: "var(--text)",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                        whileHover={{ 
                          background: "rgba(45, 45, 65, 0.9)",
                          borderColor: "rgba(236, 72, 153, 0.5)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-9 3l9 5 9-5M3 10l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Internship
                      </motion.button>
                    </div>

                    <p style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textAlign: "center",
                      marginTop: "0.75rem",
                      fontStyle: "italic"
                    }}>
                      Not ready yet? Start with an internship to build your skills!
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
};

export default Home;
