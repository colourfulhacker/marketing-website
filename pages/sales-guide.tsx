import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const SalesGuide: NextPage = () => {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const { from, job, type } = router.query;
  const fromQuestionnaire = from === 'questionnaire';

  const sections = [
    {
      title: "Modern Web Application Technologies",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      topics: [
        {
          name: "Next.js",
          description: "Modern web framework built on React for fast, SEO-friendly, and scalable applications",
          clientBenefit: "Faster loading websites, better search engine ranking, and future-ready technology that handles high traffic smoothly",
          salesTip: "Position this as a competitive advantage - faster sites convert better and rank higher on Google"
        },
        {
          name: "Vercel",
          description: "Global cloud hosting platform optimized for modern web applications",
          clientBenefit: "Lifetime hosting with high performance, auto-scaling, and zero downtime ensuring applications run smoothly worldwide",
          salesTip: "Emphasize the 'always-on' reliability and global reach - perfect for businesses targeting international markets"
        },
        {
          name: "Firebase",
          description: "Google's comprehensive backend-as-a-service platform",
          clientBenefit: "Real-time data synchronization, secure user authentication, and fast deployment - ideal for startups and small businesses",
          salesTip: "Great for clients who need to launch quickly. Mention Google's infrastructure backing for credibility"
        },
        {
          name: "Supabase",
          description: "Open-source alternative to Firebase with PostgreSQL foundation",
          clientBenefit: "Secure authentication, real-time database, and robust storage for scalable applications",
          salesTip: "Position as the enterprise-grade choice with full data ownership and no vendor lock-in"
        },
        {
          name: "PostgreSQL",
          description: "Advanced open-source database system known for reliability and performance",
          clientBenefit: "Efficiently manages structured data, enabling applications to handle thousands of users without slowdowns",
          salesTip: "Highlight proven track record with Fortune 500 companies - reliability sells"
        },
        {
          name: "JAMStack",
          description: "Modern architecture using JavaScript, APIs, and Markup for fast, secure applications",
          clientBenefit: "Lightning-fast page loads, globally distributed content, enhanced security, and easy maintenance",
          salesTip: "Focus on speed and security benefits - these directly impact conversion rates and user trust"
        }
      ]
    },
    {
      title: "Enterprise Cloud & Infrastructure",
      icon: "☁️",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      topics: [
        {
          name: "AWS, Azure, Google Cloud",
          description: "Leading cloud computing platforms for hosting, storage, and scaling",
          clientBenefit: "Global infrastructure, automated backups, 99.9% uptime, and unlimited scalability",
          salesTip: "Match the platform to client needs - AWS for flexibility, Azure for Microsoft shops, GCP for data analytics"
        },
        {
          name: "Docker & DevOps",
          description: "Containerization and continuous deployment for consistent application delivery",
          clientBenefit: "Faster project delivery, fewer deployment errors, seamless updates, and predictable environments",
          salesTip: "Translate technical benefits to business outcomes - 'faster time to market' and 'reduced operational costs'"
        },
        {
          name: "APIs & Microservices",
          description: "Modular architecture enabling system integration and scalability",
          clientBenefit: "Easy scaling, update specific features without downtime, and seamless third-party integrations",
          salesTip: "Perfect for growing businesses - emphasize flexibility and future-proofing"
        }
      ]
    },
    {
      title: "Cybersecurity & Data Protection",
      icon: "🔒",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      topics: [
        {
          name: "SSL & Encryption",
          description: "Security certificates that protect data transfer between users and websites",
          clientBenefit: "Protects sensitive customer data, builds user trust, and improves search rankings",
          salesTip: "Lead with trust and compliance - especially important for e-commerce and healthcare"
        },
        {
          name: "Firewalls & WAF",
          description: "Web Application Firewalls that block unauthorized access and attacks",
          clientBenefit: "24/7 protection from cyber threats, automated threat detection, and peace of mind",
          salesTip: "Use industry statistics - mention the average cost of a data breach to create urgency"
        },
        {
          name: "IAM & Access Control",
          description: "Identity and Access Management for secure team collaboration",
          clientBenefit: "Granular control over who accesses what, audit trails, and compliance readiness",
          salesTip: "Essential for companies with remote teams or regulatory requirements"
        }
      ]
    },
    {
      title: "Emerging Technologies & Innovation",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      topics: [
        {
          name: "Artificial Intelligence (AI)",
          description: "Intelligent automation and data analysis for enhanced decision-making",
          clientBenefit: "Automated workflows, predictive insights, personalized user experiences, and competitive advantage",
          salesTip: "Focus on ROI - AI saves time on repetitive tasks and uncovers revenue opportunities"
        },
        {
          name: "Blockchain",
          description: "Distributed ledger technology for secure, transparent transactions",
          clientBenefit: "Tamper-proof records, enhanced trust, transparency in supply chains, and digital asset management",
          salesTip: "Best for industries requiring audit trails - finance, supply chain, healthcare"
        },
        {
          name: "Internet of Things (IoT)",
          description: "Connected devices enabling data exchange and process automation",
          clientBenefit: "Real-time monitoring, predictive maintenance, operational efficiency, and data-driven decisions",
          salesTip: "Strong use cases in logistics, manufacturing, and healthcare - lead with industry-specific examples"
        }
      ]
    }
  ];

  const salesStrategies = [
    {
      title: "Build Authority Through Content",
      icon: "📝",
      strategies: [
        "Share success stories and case studies on LinkedIn to demonstrate expertise",
        "Create helpful blog posts about industry trends your clients care about",
        "Engage meaningfully in industry groups and forums where prospects gather",
        "Position yourself as a trusted advisor, not just a vendor"
      ]
    },
    {
      title: "Strategic Networking & Partnerships",
      icon: "🤝",
      strategies: [
        "Attend industry events and webinars to connect with decision-makers",
        "Build relationships with complementary service providers for referrals",
        "Join local business chambers and technology associations",
        "Leverage existing client networks for warm introductions"
      ]
    },
    {
      title: "Value-First Selling Approach",
      icon: "💎",
      strategies: [
        "Lead with free consultations and technology assessments",
        "Provide actionable insights before asking for the sale",
        "Focus on solving specific business problems, not pushing products",
        "Use ROI calculators to quantify value for prospects"
      ]
    },
    {
      title: "Digital Presence Optimization",
      icon: "🎯",
      strategies: [
        "Optimize your LinkedIn profile to attract inbound leads",
        "Share client testimonials and results on social platforms",
        "Create educational video content explaining complex tech simply",
        "Use email signatures with links to valuable resources"
      ]
    }
  ];

  return (
    <Layout>
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Head>
          <title>Sales Excellence Guide | Cehpoint Technology Sales Training</title>
          <meta name="description" content="Comprehensive guide for Cehpoint sales professionals covering modern technologies, sales strategies, and best practices for IT services." />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <main style={{ padding: "6rem 0" }}>
          <div className="container">
            {fromQuestionnaire && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)",
                  border: "2px solid rgba(236, 72, 153, 0.3)",
                  borderRadius: "16px",
                  padding: "2rem",
                  marginBottom: "3rem",
                  textAlign: "center"
                }}
              >
                <h2 style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "1rem"
                }}>
                  📚 Please Read This Guide First
                </h2>
                <p style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.7
                }}>
                  Before you can apply for the <strong>{job}</strong> position, we need you to understand the technologies and sales strategies we use at Cehpoint. Please read through this guide carefully.
                </p>
                <p style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.5rem"
                }}>
                  After reading, you can test your knowledge with our quiz or continue with your application.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <motion.button
                    onClick={() => router.push(`/quiz/${type === 'internship' ? 'intern' : 'employee'}?job=${encodeURIComponent(job as string)}&type=${type}`)}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem"
                    }}
                  >
                    Take Knowledge Quiz →
                  </motion.button>
                  <motion.button
                    onClick={() => router.push(`/questionnaire?job=${encodeURIComponent(job as string)}&type=${type}`)}
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem"
                    }}
                  >
                    Continue Application
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                style={{
                  display: "inline-block",
                  padding: "0.625rem 1.5rem",
                  background: "rgba(167, 139, 250, 0.1)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  borderRadius: "50px",
                  marginBottom: "2rem"
                }}
              >
                <span style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  🎓 Internal Training Resource
                </span>
              </motion.div>

              <h1 className="display-font gradient-text" style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em"
              }}>
                Sales Excellence Guide
              </h1>

              <p style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "var(--text-secondary)",
                maxWidth: "800px",
                margin: "0 auto 1rem",
                lineHeight: 1.6
              }}>
                Master the technologies we sell and the strategies that drive results
              </p>

              <p style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "var(--text-muted)",
                maxWidth: "700px",
                margin: "0 auto"
              }}>
                This guide empowers our sales team with deep technical knowledge and proven growth strategies
              </p>
            </motion.div>

            {/* Technology Knowledge Sections */}
            <div style={{ marginBottom: "5rem" }}>
              <h2 style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                marginBottom: "2.5rem",
                textAlign: "center",
                color: "var(--text)"
              }}>
                Technology Knowledge Base
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className="card"
                      style={{
                        background: "linear-gradient(135deg, rgba(23, 23, 35, 0.8) 0%, rgba(30, 30, 45, 0.7) 100%)",
                        cursor: "pointer"
                      }}
                      onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div style={{
                            fontSize: "2.5rem",
                            background: section.gradient,
                            padding: "1rem",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {section.icon}
                          </div>
                          <div>
                            <h3 style={{
                              fontSize: "1.5rem",
                              fontWeight: 700,
                              color: "var(--text)",
                              marginBottom: "0.25rem"
                            }}>
                              {section.title}
                            </h3>
                            <p style={{
                              fontSize: "0.9rem",
                              color: "var(--text-muted)",
                              margin: 0
                            }}>
                              {section.topics.length} technologies to master
                            </p>
                          </div>
                        </div>
                        <motion.svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          animate={{ rotate: expandedSection === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path d="M6 9l6 6 6-6" stroke="var(--primary-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </motion.svg>
                      </div>

                      {expandedSection === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ marginTop: "2rem" }}
                        >
                          <div style={{
                            display: "grid",
                            gap: "1.5rem"
                          }}>
                            {section.topics.map((topic, idx) => (
                              <div
                                key={idx}
                                style={{
                                  background: "rgba(255, 255, 255, 0.03)",
                                  borderRadius: "12px",
                                  padding: "1.5rem",
                                  border: "1px solid rgba(255, 255, 255, 0.08)"
                                }}
                              >
                                <h4 style={{
                                  fontSize: "1.25rem",
                                  fontWeight: 700,
                                  color: "var(--primary-light)",
                                  marginBottom: "0.75rem"
                                }}>
                                  {topic.name}
                                </h4>
                                
                                <div style={{ marginBottom: "1rem" }}>
                                  <p style={{
                                    fontSize: "0.85rem",
                                    color: "var(--text-muted)",
                                    marginBottom: "0.5rem",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em"
                                  }}>
                                    What it is:
                                  </p>
                                  <p style={{
                                    fontSize: "1rem",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.7,
                                    margin: 0
                                  }}>
                                    {topic.description}
                                  </p>
                                </div>

                                <div style={{ marginBottom: "1rem" }}>
                                  <p style={{
                                    fontSize: "0.85rem",
                                    color: "#10B981",
                                    marginBottom: "0.5rem",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em"
                                  }}>
                                    Client Benefits:
                                  </p>
                                  <p style={{
                                    fontSize: "1rem",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.7,
                                    margin: 0
                                  }}>
                                    {topic.clientBenefit}
                                  </p>
                                </div>

                                <div style={{
                                  background: "rgba(124, 58, 237, 0.1)",
                                  borderRadius: "8px",
                                  padding: "1rem",
                                  border: "1px solid rgba(124, 58, 237, 0.2)"
                                }}>
                                  <p style={{
                                    fontSize: "0.85rem",
                                    color: "var(--primary-light)",
                                    marginBottom: "0.5rem",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    letterSpacing: "0.05em"
                                  }}>
                                    💡 Sales Tip:
                                  </p>
                                  <p style={{
                                    fontSize: "0.95rem",
                                    color: "var(--text)",
                                    lineHeight: 1.7,
                                    margin: 0,
                                    fontStyle: "italic"
                                  }}>
                                    {topic.salesTip}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sales Strategies Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "3rem" }}
              >
                <h2 style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "var(--text)"
                }}>
                  Proven Growth Strategies
                </h2>
                <p style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  maxWidth: "700px",
                  margin: "0 auto"
                }}>
                  Result-oriented approaches that drive consistent business growth
                </p>
              </motion.div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "2rem"
              }}>
                {salesStrategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                    style={{
                      background: "linear-gradient(135deg, rgba(23, 23, 35, 0.8) 0%, rgba(30, 30, 45, 0.7) 100%)"
                    }}
                  >
                    <div style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem"
                    }}>
                      {strategy.icon}
                    </div>
                    <h3 style={{
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "1.5rem"
                    }}>
                      {strategy.title}
                    </h3>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem"
                    }}>
                      {strategy.strategies.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "0.95rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.7,
                            paddingLeft: "1.5rem",
                            position: "relative"
                          }}
                        >
                          <span style={{
                            position: "absolute",
                            left: 0,
                            top: "0.5rem",
                            width: "6px",
                            height: "6px",
                            background: "var(--primary-light)",
                            borderRadius: "50%"
                          }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                marginTop: "5rem",
                textAlign: "center",
                padding: "3rem 2rem",
                background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                borderRadius: "20px",
                border: "1px solid rgba(167, 139, 250, 0.2)"
              }}
            >
              <h3 style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "1rem"
              }}>
                Ready to Apply Your Knowledge?
              </h3>
              <p style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                maxWidth: "600px",
                margin: "0 auto 2rem"
              }}>
                Join our team and turn these strategies into real results
              </p>
              <motion.button
                onClick={() => router.push('/#positions')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)"
                }}
              >
                View Open Positions →
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default SalesGuide;
