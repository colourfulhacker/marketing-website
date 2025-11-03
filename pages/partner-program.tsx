import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { services } from "../data/services";

const PartnerProgram: NextPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const partnerTypes = [
    {
      title: "Freelancer",
      icon: "💼",
      description: "Work independently on your own schedule",
      benefits: ["Flexible hours", "Choose your projects", "Work from anywhere", "No fixed targets"],
      earnings: "₹1,000 per project",
      fixedFeeOption: "Fixed monthly retainer available",
      eligibility: ["Basic sales experience preferred", "Good communication skills", "Self-motivated and organized", "Available 10-15 hrs/week minimum"]
    },
    {
      title: "Commission-Based Agent",
      icon: "🎯",
      description: "Dedicated sales role with performance rewards",
      benefits: ["Higher commission rates", "Performance bonuses", "Monthly targets with rewards", "Sales training & support"],
      earnings: "15-25% commission + bonuses",
      fixedFeeOption: null,
      eligibility: ["1+ years sales experience", "Proven track record in B2B sales", "Available 20-30 hrs/week", "Strong negotiation skills"]
    },
    {
      title: "Sales Partner",
      icon: "🤝",
      description: "Strategic partnership for bulk deals",
      benefits: ["Premium profit share structure", "Dedicated account manager", "Co-branding opportunities", "Priority support"],
      earnings: "Up to 20% profit share",
      fixedFeeOption: null,
      eligibility: ["Established sales network/agency", "3+ years in IT/tech sales", "Full-time commitment", "Ability to close ₹10L+ deals"]
    }
  ];

  const trainingModules = [
    {
      module: "Module 1",
      title: "Product Knowledge",
      duration: "45 minutes",
      topics: ["10 core services overview", "Pricing & positioning", "Client success stories", "Competitive advantages"]
    },
    {
      module: "Module 2",
      title: "Sales Techniques",
      duration: "60 minutes",
      topics: ["Identifying prospects", "Pitching strategies", "Objection handling", "Closing techniques"]
    },
    {
      module: "Module 3",
      title: "Tools & Systems",
      duration: "45 minutes",
      topics: ["CRM platform walkthrough", "Commission tracking", "Lead management", "Support & escalation"]
    },
    {
      module: "Module 4",
      title: "Quick Start Checklist",
      duration: "30 minutes",
      topics: ["First 5 prospects to contact", "Pitch deck templates", "Contract templates", "Same-day activation"]
    }
  ];

  return (
    <Layout>
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Head>
          <title>Partner Program - Become a Cehpoint Consultant | Earn High Commissions</title>
          <meta name="description" content="Join Cehpoint's partner program. Get 3-hour training and start earning the same day. Freelancers, agents, and sales partners welcome. Earn from ₹1,000 per project to 20% profit share." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {/* Hero Section */}
          <section style={{
            padding: "8rem 0 5rem",
            position: "relative",
            overflow: "hidden"
          }}>
            <motion.div
              style={{
                position: "absolute",
                top: "20%",
                left: "15%",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
                filter: "blur(100px)",
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

            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  style={{
                    display: "inline-block",
                    padding: "0.625rem 1.5rem",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "50px",
                    marginBottom: "2rem",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <span style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#10B981"
                  }}>
                    ⚡ Start Earning Today - Same Day Activation
                  </span>
                </motion.div>

                <h1
                  className="display-font"
                  style={{
                    fontSize: "clamp(2.5rem, 7vw, 5rem)",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    background: "linear-gradient(135deg, #10B981 0%, #7C3AED 50%, #EC4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Become a Cehpoint Consultant
                </h1>

                <p style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  color: "var(--text-secondary)",
                  marginBottom: "2rem",
                  lineHeight: 1.7
                }}>
                  Join our network of freelancers, agents & sales partners. Get 3-hour training, start selling the same day, and earn from ₹1,000 per project to 20% profit share.
                </p>

                <div style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "3rem"
                }}>
                  <div style={{
                    padding: "1.5rem 2rem",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "2px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "16px"
                  }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#10B981" }}>3 Hours</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Training Duration</div>
                  </div>
                  <div style={{
                    padding: "1.5rem 2rem",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "2px solid rgba(124, 58, 237, 0.3)",
                    borderRadius: "16px"
                  }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#7C3AED" }}>Same Day</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Start Earning</div>
                  </div>
                  <div style={{
                    padding: "1.5rem 2rem",
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "16px"
                  }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#EC4899" }}>Up to 20%</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Profit Share</div>
                  </div>
                </div>

                <motion.button
                  className="btn btn-primary"
                  onClick={() => router.push('/questionnaire?job=Partner Program&type=partner')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1.15rem", padding: "1.25rem 3rem" }}
                >
                  Apply for Partner Program →
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Partner Types */}
          <section style={{
            padding: "5rem 0",
            background: "linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.03) 50%, transparent 100%)"
          }}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "4rem" }}
              >
                <h2 className="display-font" style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  marginBottom: "1rem"
                }}>
                  Choose Your Partnership Model
                </h2>
                <p style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "var(--text-secondary)",
                  maxWidth: "700px",
                  margin: "0 auto"
                }}>
                  Flexible options for freelancers, agents, and sales partners
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                  gap: "2rem",
                  maxWidth: "1200px",
                  margin: "0 auto"
                }}
              >
                {partnerTypes.map((type) => (
                  <motion.div
                    key={type.title}
                    variants={itemVariants}
                    className="card"
                    style={{
                      padding: "2.5rem",
                      textAlign: "center"
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>{type.icon}</div>
                    <h3 style={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      marginBottom: "1rem",
                      color: "var(--text)"
                    }}>
                      {type.title}
                    </h3>
                    <p style={{
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                      marginBottom: "2rem",
                      lineHeight: 1.6
                    }}>
                      {type.description}
                    </p>
                    
                    <div style={{
                      background: "rgba(124, 58, 237, 0.08)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      marginBottom: "1.5rem",
                      border: "1px solid rgba(124, 58, 237, 0.15)"
                    }}>
                      <div style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "var(--primary-light)",
                        marginBottom: "0.5rem"
                      }}>
                        {type.earnings}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: type.fixedFeeOption ? "0.75rem" : "0" }}>Per successful deal</div>
                      
                      {type.fixedFeeOption && (
                        <div style={{
                          marginTop: "0.75rem",
                          paddingTop: "0.75rem",
                          borderTop: "1px solid rgba(167, 139, 250, 0.2)"
                        }}>
                          <div style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            background: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            borderRadius: "8px"
                          }}>
                            <span style={{ fontSize: "0.875rem", color: "#10B981", fontWeight: 600 }}>
                              💰 Fixed Fee Option
                            </span>
                          </div>
                          <div style={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "#10B981",
                            marginTop: "0.5rem"
                          }}>
                            {type.fixedFeeOption}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                            For consistent monthly income
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                      <div style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--primary-light)",
                        marginBottom: "1rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        Eligibility
                      </div>
                      <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem"
                      }}>
                        {type.eligibility.map((criterion, idx) => (
                          <li key={idx} style={{
                            fontSize: "0.9rem",
                            color: "var(--text-secondary)",
                            paddingLeft: "1.5rem",
                            position: "relative",
                            lineHeight: 1.5
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                              position: "absolute",
                              left: 0,
                              top: "0.25rem"
                            }}>
                              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <div style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--primary-light)",
                        marginBottom: "1rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        Benefits
                      </div>
                      <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem"
                      }}>
                        {type.benefits.map((benefit, idx) => (
                          <li key={idx} style={{
                            fontSize: "0.95rem",
                            color: "var(--text-secondary)",
                            paddingLeft: "1.5rem",
                            position: "relative"
                          }}>
                            <span style={{
                              position: "absolute",
                              left: 0,
                              top: "0.4rem",
                              width: "6px",
                              height: "6px",
                              background: "#10B981",
                              borderRadius: "50%"
                            }} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Training Program */}
          <section style={{ padding: "5rem 0" }}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "4rem" }}
              >
                <h2 className="display-font" style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  marginBottom: "1rem"
                }}>
                  3-Hour Training Program
                </h2>
                <p style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "var(--text-secondary)",
                  maxWidth: "700px",
                  margin: "0 auto"
                }}>
                  Comprehensive training to get you started immediately
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
                  gap: "2rem",
                  maxWidth: "1200px",
                  margin: "0 auto"
                }}
              >
                {trainingModules.map((module) => (
                  <motion.div
                    key={module.module}
                    variants={itemVariants}
                    className="card"
                    style={{ padding: "2rem" }}
                    whileHover={{ y: -5 }}
                  >
                    <div style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "white",
                      marginBottom: "1.5rem"
                    }}>
                      {module.module}
                    </div>

                    <h3 style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                      color: "var(--text)"
                    }}>
                      {module.title}
                    </h3>

                    <div style={{
                      fontSize: "0.9rem",
                      color: "var(--text-muted)",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {module.duration}
                    </div>

                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}>
                      {module.topics.map((topic, idx) => (
                        <li key={idx} style={{
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                          paddingLeft: "1.25rem",
                          position: "relative"
                        }}>
                          <span style={{
                            position: "absolute",
                            left: 0,
                            top: "0.4rem",
                            width: "5px",
                            height: "5px",
                            background: "var(--primary-light)",
                            borderRadius: "50%"
                          }} />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Service Pricing & Commission Calculator */}
          <section style={{
            padding: "5rem 0",
            background: "linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)"
          }}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "4rem" }}
              >
                <h2 className="display-font" style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  marginBottom: "1rem"
                }}>
                  Service Pricing & Your Earnings
                </h2>
                <p style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "var(--text-secondary)",
                  maxWidth: "700px",
                  margin: "0 auto"
                }}>
                  Transparent pricing with clear commission structure and monthly targets
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
                  gap: "2rem",
                  maxWidth: "1400px",
                  margin: "0 auto"
                }}
              >
                {services.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    className="card-premium"
                    style={{
                      padding: "2rem",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: service.gradient
                    }} />

                    <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                      <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>{service.icon}</div>
                      <h3 style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: "0.5rem"
                      }}>
                        {service.title}
                      </h3>
                    </div>

                    <div style={{
                      background: "rgba(16, 185, 129, 0.08)",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      marginBottom: "1rem",
                      border: "1px solid rgba(16, 185, 129, 0.15)"
                    }}>
                      <div style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#10B981",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        💰 Client Pricing
                      </div>
                      <div style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: "0.25rem"
                      }}>
                        {service.pricingRange}
                      </div>
                      <div style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)"
                      }}>
                        Avg deal: {service.avgDealSize}
                      </div>
                    </div>

                    <div style={{
                      background: "rgba(124, 58, 237, 0.08)",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      marginBottom: "1rem",
                      border: "1px solid rgba(124, 58, 237, 0.15)"
                    }}>
                      <div style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--primary-light)",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        🎯 Your Commission
                      </div>
                      <div style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--primary-light)",
                        marginBottom: "0.25rem"
                      }}>
                        {service.commissionRate}
                      </div>
                      <div style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)"
                      }}>
                        Per successful sale
                      </div>
                    </div>

                    <div style={{
                      background: "rgba(236, 72, 153, 0.08)",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      marginBottom: "1rem",
                      border: "1px solid rgba(236, 72, 153, 0.15)"
                    }}>
                      <div style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#EC4899",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        📈 Monthly Target
                      </div>
                      <div style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: "0.25rem"
                      }}>
                        {service.monthlyTarget}
                      </div>
                      <div style={{
                        fontSize: "0.85rem",
                        color: "var(--text-muted)"
                      }}>
                        Recommended goal
                      </div>
                    </div>

                    <div style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%)",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      border: "1px solid rgba(16, 185, 129, 0.2)"
                    }}>
                      <div style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#10B981",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        💸 Potential Monthly Income
                      </div>
                      <div style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--text)"
                      }}>
                        {service.potentialMonthlyEarning}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ padding: "5rem 0 7rem" }}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-premium"
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  maxWidth: "900px",
                  margin: "0 auto",
                  background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)"
                }}
              >
                <h2 className="display-font" style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 700,
                  marginBottom: "1.5rem"
                }}>
                  Ready to Start Earning?
                </h2>
                <p style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "var(--text-secondary)",
                  marginBottom: "2.5rem",
                  lineHeight: 1.7
                }}>
                  Complete the application form, attend our 3-hour training, and start selling the same day. 
                  Join hundreds of consultants already earning with Cehpoint.
                </p>

                <div style={{
                  display: "flex",
                  gap: "1.5rem",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}>
                  <motion.button
                    className="btn btn-primary"
                    onClick={() => router.push('/questionnaire?job=Partner Program&type=partner')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontSize: "1.15rem", padding: "1.25rem 3rem" }}
                  >
                    Apply Now - Start Today →
                  </motion.button>
                  <motion.button
                    className="btn btn-secondary"
                    onClick={() => router.push('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontSize: "1.15rem", padding: "1.25rem 3rem" }}
                  >
                    View Job Openings
                  </motion.button>
                </div>

                <p style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: "2rem",
                  fontStyle: "italic"
                }}>
                  No upfront costs. No monthly fees. Pay only when you earn.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default PartnerProgram;
