import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

interface CalculatorQuestion {
  id: string;
  question: string;
  type: "select" | "range" | "multi-select";
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
}

const calculatorQuestions: CalculatorQuestion[] = [
  {
    id: "experience_level",
    question: "What is your total professional experience?",
    type: "select",
    options: ["0-1 years (Fresher/Entry Level)", "1-3 years (Junior Professional)", "3-5 years (Mid-Level Professional)", "5-8 years (Senior Professional)", "8+ years (Expert/Lead Level)"]
  },
  {
    id: "education",
    question: "What is your highest educational qualification?",
    type: "select",
    options: ["12th Pass", "Bachelor's Degree", "Master's Degree", "MBA/PGDM", "Ph.D./Doctorate"]
  },
  {
    id: "tech_skills",
    question: "Rate your technology & digital marketing skills",
    type: "range",
    min: 1,
    max: 10,
    unit: "out of 10"
  },
  {
    id: "sales_experience",
    question: "Do you have proven sales/business development experience?",
    type: "select",
    options: ["No sales experience", "Basic sales experience (1-2 years)", "Moderate sales experience (2-4 years)", "Strong sales track record (4-6 years)", "Exceptional sales leader (6+ years)"]
  },
  {
    id: "industry_experience",
    question: "Select industries you have worked in (multi-select)",
    type: "multi-select",
    options: ["IT/Technology", "Cybersecurity", "Digital Marketing", "SaaS/Cloud Services", "E-commerce", "Consulting", "Startups", "Enterprise B2B"]
  },
  {
    id: "target_achievement",
    question: "How consistently have you met/exceeded sales targets?",
    type: "select",
    options: ["Never had targets", "Rarely achieved (< 50%)", "Sometimes achieved (50-70%)", "Frequently achieved (70-90%)", "Always exceeded (90-120%)", "Exceptional over-achiever (>120%)"]
  },
  {
    id: "client_handling",
    question: "How many clients can you handle simultaneously?",
    type: "select",
    options: ["0-5 clients", "5-10 clients", "10-20 clients", "20-50 clients", "50+ clients (Enterprise scale)"]
  },
  {
    id: "communication_skills",
    question: "Rate your communication & presentation skills",
    type: "range",
    min: 1,
    max: 10,
    unit: "out of 10"
  },
  {
    id: "language_proficiency",
    question: "Languages you are fluent in (multi-select)",
    type: "multi-select",
    options: ["English", "Hindi", "Bengali", "Regional Languages", "International Languages"]
  },
  {
    id: "work_mode",
    question: "Preferred work mode",
    type: "select",
    options: ["Work from Office only", "Hybrid", "Mostly Remote", "Fully Remote", "Flexible/Any"]
  },
  {
    id: "availability",
    question: "How soon can you start?",
    type: "select",
    options: ["Immediate (0-15 days)", "1 month notice", "2 months notice", "3 months notice"]
  },
  {
    id: "leadership",
    question: "Have you led teams or projects?",
    type: "select",
    options: ["No leadership experience", "Led small projects (2-3 people)", "Led teams (4-8 people)", "Led departments (8-15 people)", "Led large organizations (15+ people)"]
  }
];

const SalaryCalculator: NextPage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(1);

  const question = calculatorQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / calculatorQuestions.length) * 100;

  const getPerformanceFactor = (answers: any) => {
    let performanceScore = 0;
    const targetAch = answers.target_achievement;
    if (targetAch?.includes("Never")) performanceScore += 0;
    else if (targetAch?.includes("Rarely")) performanceScore += 1;
    else if (targetAch?.includes("Sometimes")) performanceScore += 2;
    else if (targetAch?.includes("Frequently")) performanceScore += 3;
    else if (targetAch?.includes("Always exceeded")) performanceScore += 4;
    else if (targetAch?.includes("Exceptional")) performanceScore += 5;

    const clients = answers.client_handling;
    if (clients?.includes("0-5")) performanceScore += 0;
    else if (clients?.includes("5-10")) performanceScore += 1;
    else if (clients?.includes("10-20")) performanceScore += 2;
    else if (clients?.includes("20-50")) performanceScore += 3;
    else if (clients?.includes("50+")) performanceScore += 4;

    return performanceScore;
  };

  const getSkillFactor = (answers: any) => {
    let skillScore = 0;
    const techSkills = answers.tech_skills || 5;
    skillScore += (techSkills / 10) * 5; // Scale to a max of 5

    const industries = answers.industry_experience || [];
    skillScore += Math.min(industries.length, 5); // Max 5 points for industry experience

    const commSkills = answers.communication_skills || 5;
    skillScore += (commSkills / 10) * 5; // Scale to a max of 5

    const leadership = answers.leadership;
    if (leadership?.includes("No leadership")) skillScore += 0;
    else if (leadership?.includes("small projects")) skillScore += 1;
    else if (leadership?.includes("teams")) skillScore += 2;
    else if (leadership?.includes("departments")) skillScore += 3;
    else if (leadership?.includes("large organizations")) skillScore += 4;

    return skillScore;
  };

  const calculateSalary = () => {
    let baseSalary = 30000;
    let multiplier = 1.0;
    let isInternship = false;
    let stipend = 0;

    // Check for zero experience for internship
    const expLevel = answers.experience_level;
    if (expLevel?.includes("0-1 years")) {
      isInternship = true;
      stipend = 5000;
      return { estimatedSalary: 0, minRange: 0, maxRange: 0, isInternship, stipend };
    }

    // Experience Level Impact (30% weight)
    if (expLevel?.includes("1-3 years")) multiplier += 0.2;
    else if (expLevel?.includes("3-5 years")) multiplier += 0.4;
    else if (expLevel?.includes("5-8 years")) multiplier += 0.7;
    else if (expLevel?.includes("8+ years")) multiplier += 1.2;

    // Education Impact (15% weight)
    const edu = answers.education;
    if (edu?.includes("12th")) multiplier += 0;
    else if (edu?.includes("Bachelor")) multiplier += 0.15;
    else if (edu?.includes("Master")) multiplier += 0.3;
    else if (edu?.includes("MBA")) multiplier += 0.45;
    else if (edu?.includes("Ph.D")) multiplier += 0.55;

    // Tech Skills Impact (10% weight)
    const techSkills = answers.tech_skills || 5;
    multiplier += (techSkills / 10) * 0.4;

    // Sales Experience Impact (25% weight)
    const salesExp = answers.sales_experience;
    if (salesExp?.includes("No sales")) multiplier += 0;
    else if (salesExp?.includes("Basic")) multiplier += 0.2;
    else if (salesExp?.includes("Moderate")) multiplier += 0.4;
    else if (salesExp?.includes("Strong")) multiplier += 0.8;
    else if (salesExp?.includes("Exceptional")) multiplier += 1.3;

    // Industry Experience Bonus (5% per industry, max 25%)
    const industries = answers.industry_experience || [];
    const industryBonus = Math.min(industries.length * 0.08, 0.4);
    multiplier += industryBonus;

    // Target Achievement Impact (20% weight)
    const targetAch = answers.target_achievement;
    if (targetAch?.includes("Never")) multiplier += 0;
    else if (targetAch?.includes("Rarely")) multiplier += 0.05;
    else if (targetAch?.includes("Sometimes")) multiplier += 0.2;
    else if (targetAch?.includes("Frequently")) multiplier += 0.5;
    else if (targetAch?.includes("Always exceeded")) multiplier += 0.9;
    else if (targetAch?.includes("Exceptional")) multiplier += 1.2;

    // Client Handling Capacity (10% weight)
    const clients = answers.client_handling;
    if (clients?.includes("0-5")) multiplier += 0;
    else if (clients?.includes("5-10")) multiplier += 0.15;
    else if (clients?.includes("10-20")) multiplier += 0.3;
    else if (clients?.includes("20-50")) multiplier += 0.5;
    else if (clients?.includes("50+")) multiplier += 0.7;

    // Communication Skills (10% weight)
    const commSkills = answers.communication_skills || 5;
    multiplier += (commSkills / 10) * 0.4;

    // Language Proficiency (5% weight)
    const languages = answers.language_proficiency || [];
    multiplier += languages.length * 0.06;

    // Leadership Experience (15% weight)
    const leadership = answers.leadership;
    if (leadership?.includes("No leadership")) multiplier += 0;
    else if (leadership?.includes("small projects")) multiplier += 0.25;
    else if (leadership?.includes("teams")) multiplier += 0.5;
    else if (leadership?.includes("departments")) multiplier += 0.8;
    else if (leadership?.includes("large organizations")) multiplier += 1.1;

    // Availability Bonus (quicker joiners get slight preference)
    const availability = answers.availability;
    if (availability?.includes("Immediate")) multiplier += 0.1;
    else if (availability?.includes("1 month")) multiplier += 0.05;

    let estimatedSalary = Math.round(baseSalary * multiplier);

    // Apply minimum salary tiers based on estimatedSalary
    if (estimatedSalary < 10000) {
      estimatedSalary = 10000;
    } else if (estimatedSalary < 15000) {
      estimatedSalary = 15000;
    } else if (estimatedSalary < 25000) {
      estimatedSalary = 25000;
    }

    const minRange = Math.round(estimatedSalary * 0.9);
    const maxRange = Math.round(estimatedSalary * 1.15);

    const year2Salary = isInternship ? estimatedSalary : Math.round(estimatedSalary * 1.20); // 20% growth for year 2
    const year3Salary = isInternship ? estimatedSalary : Math.round(year2Salary * 1.25); // 25% growth for year 3
    const year2GrowthPercentage = isInternship ? 0 : 0.20;
    const year3GrowthPercentage = isInternship ? 0 : 0.25;

    return { estimatedSalary, minRange, maxRange, isInternship, stipend, year2Salary, year3Salary, year2GrowthPercentage, year3GrowthPercentage };
  };

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [question.id]: answer });
    
    if (currentQuestion < calculatorQuestions.length - 1) {
      setDirection(1);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleMultiSelect = (option: string) => {
    const current = answers[question.id] || [];
    const newValue = current.includes(option)
      ? current.filter((item: string) => item !== option)
      : [...current, option];
    setAnswers({ ...answers, [question.id]: newValue });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.95
    })
  };

  const { estimatedSalary, minRange, maxRange, isInternship, stipend, year2Salary, year3Salary, year2GrowthPercentage, year3GrowthPercentage } = showResult ? calculateSalary() : { estimatedSalary: 0, minRange: 0, maxRange: 0, isInternship: false, stipend: 0, year2Salary: 0, year3Salary: 0, year2GrowthPercentage: 0, year3GrowthPercentage: 0 };

  const performanceFactor = getPerformanceFactor(answers);
  const skillFactor = getSkillFactor(answers);
  const totalFactor = performanceFactor + skillFactor; // Max possible: 5 (performance) + 5 (tech) + 5 (industry) + 5 (comm) + 4 (leadership) = 24



  if (showResult) {
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <Head>
          <title>Salary Estimate | Cehpoint</title>
          <meta name="viewport" content="width=1024" />
          <meta name="robots" content="noindex" />
        </Head>

        <main style={{ 
          padding: "6rem 1.5rem 4rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <h1 className="display-font gradient-text" style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                marginBottom: "1rem",
                letterSpacing: "-0.03em"
              }}>
                Your Estimated Salary at Cehpoint
              </h1>
              <p style={{
                fontSize: "1.15rem",
                color: "var(--text-secondary)"
              }}>
                Based on your profile and experience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="card-premium"
              style={{
                padding: "4rem 3rem",
                textAlign: "center",
                marginBottom: "3rem"
              }}
            >
              <div style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
                Estimated Monthly Salary
              </div>
              
              {isInternship ? (
                <p className="text-2xl font-bold text-green-600">Internship Stipend: ₹{stipend.toLocaleString('en-IN')}</p>
              ) : (
                <p className="text-2xl font-bold text-green-600">₹{minRange.toLocaleString('en-IN')} - ₹{maxRange.toLocaleString('en-IN')}</p>
              )}
              
              <div style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                marginBottom: "3rem"
              }}>
                Salary Range: ₹{minRange.toLocaleString('en-IN')} - ₹{maxRange.toLocaleString('en-IN')}
              </div>

              <div style={{
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(167, 139, 250, 0.2)",
                borderRadius: "16px",
                padding: "2rem",
                marginBottom: "2rem"
              }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "var(--text)"
                }}>
                  What This Means
                </h3>
                <p style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7
                }}>
                  This is a target-based salary estimate. At Cehpoint, we&apos;re a results-driven startup. Your actual earnings can be <strong style={{ color: "var(--primary-light)" }}>significantly higher</strong> based on:
                </p>
                <ul style={{
                  marginTop: "1.5rem",
                  textAlign: "left",
                  listStyle: "none",
                  padding: 0
                }}>
                  {[
                    "Sales targets achieved & exceeded",
                    "Number of clients successfully onboarded",
                    "Revenue generated for the company",
                    "Performance bonuses & incentives",
                    "Team leadership & mentorship"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      style={{
                        fontSize: "1rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.75rem",
                        paddingLeft: "1.5rem",
                        position: "relative"
                      }}
                    >
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--success)"
                      }}>✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                borderRadius: "16px",
                padding: "2rem"
              }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  color: "var(--text)"
                }}>
                  📈 Your Growth Journey at Cehpoint
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "0.5rem" }}>Year 1</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#10B981" }}>
                      {isInternship ? `₹${stipend.toLocaleString('en-IN')}` : `₹${estimatedSalary.toLocaleString('en-IN')}`}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "0.5rem" }}>Base + Targets</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "0.5rem" }}>Year 2</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#10B981" }}>
                      {isInternship ? `₹${stipend.toLocaleString('en-IN')}` : `₹${year2Salary.toLocaleString('en-IN')}`}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "0.5rem" }}>+{Math.round(year2GrowthPercentage * 100)}% Growth</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginBottom: "0.5rem" }}>Year 3</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: "#10B981" }}>
                      {isInternship ? `₹${stipend.toLocaleString('en-IN')}` : `₹${year3Salary.toLocaleString('en-IN')}`}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "0.5rem" }}>+{Math.round(year3GrowthPercentage * 100)}% Growth</div>
                  </div>
                </div>
                <p style={{
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.6,
                  textAlign: "center"
                }}>
                  As you excel and hit targets, you grow with Cehpoint. Top performers can grow <strong style={{ color: "#10B981" }}>their company&apos;s revenue by ₹50L-₹2Cr</strong> annually while earning exponentially more.
                </p>
              </div>
              {isInternship ? (
                <p style={{
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.6,
                  textAlign: "center",
                  marginTop: "2rem"
                }}>
                  Starting as an intern with a stipend of ₹{stipend.toLocaleString('en-IN')}, you have a clear path to growth. By demonstrating strong performance and developing your skills, you can transition into a full-time role with a competitive salary and continue to grow significantly year-on-year. Your dedication to achieving targets and handling clients will directly impact your future earnings at Cehpoint.
                </p>
              ) : (
                <p style={{
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.6,
                  textAlign: "center",
                  marginTop: "2rem"
                }}>
                  Your growth at Cehpoint is directly tied to your performance, skill development, and contribution to the company&apos;s success. By consistently exceeding targets, enhancing your tech and leadership skills, and effectively managing client relationships, you can achieve substantial year-on-year salary increases. We believe in rewarding top performers who drive significant revenue growth.
                </p>
              )}
            </div>

              <div style={{
                display: "flex",
                gap: "1.25rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "2.5rem"
              }}>
                <motion.button
                  className="btn btn-primary"
                  onClick={() => router.push('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1.1rem" }}
                >
                  Apply Now →
                </motion.button>
                <motion.button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: "1.1rem" }}
                >
                  Recalculate
                </motion.button>
              </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Head>
        <title>Salary Calculator | Cehpoint Careers</title>
        <meta name="description" content="Calculate your potential salary at Cehpoint based on your experience, skills, and qualifications. Advanced target-based compensation calculator." />
        <meta name="viewport" content="width=1024" />
      </Head>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "rgba(255, 255, 255, 0.05)",
          zIndex: 100
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #7c3aed 0%, #ec4899 50%, #14b8a6 100%)",
            transformOrigin: "left",
            boxShadow: "0 0 20px rgba(167, 139, 250, 0.6)"
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      <main style={{ 
        padding: "6rem 1.5rem 4rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <h1 className="display-font gradient-text gradient-text-animated" style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              letterSpacing: "-0.03em"
            }}>
              Advanced Salary Calculator
            </h1>
            <p style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)"
            }}>
              Answer a few questions to estimate your potential earnings at Cehpoint
            </p>
          </motion.div>

          <div className="card-premium" style={{
            padding: "3.5rem",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "3rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
              }}>
                <div>
                  <div style={{
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.375rem"
                  }}>
                    Question {currentQuestion + 1} of {calculatorQuestions.length}
                  </div>
                  <div style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)"
                  }}>
                    {Math.round(progress)}% Complete
                  </div>
                </div>

                <div style={{
                  padding: "0.75rem 1.5rem",
                  background: "rgba(124, 58, 237, 0.15)",
                  border: "1px solid rgba(167, 139, 250, 0.25)",
                  borderRadius: "12px",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--primary-light)"
                }}>
                  {currentQuestion + 1}/{calculatorQuestions.length}
                </div>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestion}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 250, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                >
                  <h2 style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 700,
                    marginBottom: "2.5rem",
                    lineHeight: 1.45,
                    color: "var(--text)",
                    letterSpacing: "-0.02em"
                  }}>
                    {question.question}
                  </h2>

                  {question.type === "select" && question.options && (
                    <div style={{ display: "grid", gap: "1rem" }}>
                      {question.options.map((option) => (
                        <motion.button
                          key={option}
                          className="btn btn-secondary"
                          style={{
                            padding: "1.5rem 2rem",
                            textAlign: "left",
                            justifyContent: "flex-start",
                            fontSize: "1.05rem"
                          }}
                          onClick={() => handleAnswer(option)}
                          whileHover={{ scale: 1.02, x: 8 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span style={{
                            marginRight: "1rem",
                            color: "var(--primary-light)",
                            fontSize: "1.25rem"
                          }}>→</span>
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {question.type === "range" && (
                    <div>
                      <div style={{
                        fontSize: "3rem",
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: "2rem",
                        color: "var(--primary-light)"
                      }}>
                        {answers[question.id] || question.min} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>/ {question.max}</span>
                      </div>
                      <input
                        type="range"
                        min={question.min}
                        max={question.max}
                        value={answers[question.id] || question.min}
                        onChange={(e) => setAnswers({ ...answers, [question.id]: parseInt(e.target.value) })}
                        style={{
                          width: "100%",
                          height: "8px",
                          borderRadius: "4px",
                          background: "var(--surface-light)",
                          outline: "none",
                          marginBottom: "2rem"
                        }}
                      />
                      <motion.button
                        className="btn btn-primary"
                        style={{ width: "100%", padding: "1.5rem" }}
                        onClick={() => handleAnswer(answers[question.id] || question.min)}
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue →
                      </motion.button>
                    </div>
                  )}

                  {question.type === "multi-select" && question.options && (
                    <div>
                      <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                        {question.options.map((option) => {
                          const isSelected = (answers[question.id] || []).includes(option);
                          return (
                            <motion.button
                              key={option}
                              className="btn btn-secondary"
                              style={{
                                padding: "1.5rem 2rem",
                                textAlign: "left",
                                justifyContent: "flex-start",
                                fontSize: "1.05rem",
                                background: isSelected ? "rgba(124, 58, 237, 0.2)" : undefined,
                                borderColor: isSelected ? "rgba(167, 139, 250, 0.5)" : undefined
                              }}
                              onClick={() => handleMultiSelect(option)}
                              whileHover={{ scale: 1.02, x: 8 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span style={{
                                marginRight: "1rem",
                                color: "var(--primary-light)",
                                fontSize: "1.25rem"
                              }}>
                                {isSelected ? "✓" : "○"}
                              </span>
                              {option}
                            </motion.button>
                          );
                        })}
                      </div>
                      <motion.button
                        className="btn btn-primary"
                        style={{ width: "100%", padding: "1.5rem" }}
                        onClick={() => handleAnswer(answers[question.id] || [])}
                        disabled={!(answers[question.id] || []).length}
                        whileHover={{
                          scale: (answers[question.id] || []).length ? 1.02 : 1,
                          y: (answers[question.id] || []).length ? -3 : 0
                        }}
                        whileTap={{ scale: (answers[question.id] || []).length ? 0.98 : 1 }}
                      >
                        Continue ({(answers[question.id] || []).length} selected) →
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {currentQuestion > 0 && (
              <motion.button
                className="btn btn-ghost"
                style={{ marginTop: "2.5rem", padding: "1.25rem" }}
                onClick={handleBack}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                ← Back
              </motion.button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: "2.5rem",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap"
            }}
          >
            {calculatorQuestions.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: index <= currentQuestion
                    ? "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)"
                    : "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  boxShadow: index === currentQuestion
                    ? "0 0 20px rgba(167, 139, 250, 0.6)"
                    : "none"
                }}
              />
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SalaryCalculator;