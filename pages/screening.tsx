import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

interface ScreeningQuestion {
  id: string;
  question: string;
  type: "yes-no" | "agree-disagree" | "select";
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

const Screening: NextPage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [position, setPosition] = useState("");
  const [isInternship, setIsInternship] = useState(false);
  const [partnershipType, setPartnershipType] = useState("");

  const getScreeningQuestions = (): ScreeningQuestion[] => {
    if (partnershipType) {
      return getPartnershipQuestions(partnershipType);
    } else if (position) {
      return getJobQuestions(position, isInternship);
    }
    return [];
  };

  const getPartnershipQuestions = (type: string): ScreeningQuestion[] => {
    const baseQuestions: ScreeningQuestion[] = [
      {
        id: "sales_mindset",
        question: "At Cehpoint, you will be selling our products and services to clients. Your earnings depend on successful deals. Do you understand and accept this?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "As a Cehpoint partner, you earn commissions/profit share by selling our IT/tech services to clients. This is not a traditional employment where you trade time for salary."
      },
      {
        id: "value_creation",
        question: "We believe in results over hours worked. Which statement aligns with your work philosophy?",
        type: "select",
        options: [
          "I want to create value for clients and earn based on results",
          "I want to work fixed hours and get a guaranteed monthly salary"
        ],
        correctAnswer: "I want to create value for clients and earn based on results",
        explanation: "Cehpoint partners are entrepreneurs who create value through client success, not employees trading time for salary."
      },
      {
        id: "understanding_role",
        question: "As a Cehpoint partner, you will independently find clients, pitch our services, and close deals. Are you prepared for this responsibility?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "Success requires proactive client acquisition, effective pitching, and deal closure skills."
      }
    ];

    if (type.includes("Freelancer")) {
      baseQuestions.push({
        id: "freelancer_commitment",
        question: "You must be available 10-15 hrs/week minimum. Can you commit to this?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "Freelancer partnership requires consistent availability to manage projects effectively."
      });
    } else if (type.includes("Commission-Based Agent")) {
      baseQuestions.push({
        id: "agent_commitment",
        question: "This role requires 20-30 hrs/week with monthly targets. Are you ready to meet performance goals?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "Commission-Based Agents work with structured targets and time commitments."
      });
    } else if (type.includes("Sales Partner")) {
      baseQuestions.push({
        id: "partner_commitment",
        question: "Sales Partners need full-time commitment and ability to close ₹10L+ deals. Do you have the experience and network for this?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "Sales Partnership is for established professionals with proven sales networks."
      });
    }

    return baseQuestions;
  };

  const getJobQuestions = (jobTitle: string, intern: boolean): ScreeningQuestion[] => {
    const baseQuestions: ScreeningQuestion[] = [
      {
        id: "sales_mindset",
        question: "At Cehpoint, all roles involve selling our technology services to clients. Your performance is measured by results (leads, deals, client acquisition). Do you understand and accept this?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "Cehpoint is a sales-focused company. Even marketing, PR, and strategy roles require driving client acquisition and revenue."
      },
      {
        id: "value_creation",
        question: "Which work philosophy resonates with you?",
        type: "select",
        options: [
          "I want to create tangible value and be rewarded based on results",
          "I want to work 9-5 and receive salary regardless of performance"
        ],
        correctAnswer: "I want to create tangible value and be rewarded based on results",
        explanation: "We value results and impact over time spent. Your success is tied to client success."
      },
      {
        id: "client_focus",
        question: "You will be selling products/services TO clients, not selling your time TO the company. Is this clear?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: "Your role is to help clients solve problems with our services, earning based on successful outcomes."
      }
    ];

    if (jobTitle.includes("Marketing") || jobTitle.includes("Digital")) {
      baseQuestions.push({
        id: "lead_generation",
        question: intern
          ? "As a Digital Marketing Intern, you're expected to contribute to 8-12 qualified leads monthly while learning. Can you commit to this goal?"
          : "As a Digital Marketing Lead, you're expected to generate 20-30 qualified leads monthly with 15%+ conversion rate. Can you commit to this goal?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: intern
          ? "Internships have real performance expectations. You'll learn while contributing measurably to lead generation."
          : "Your success is measured by qualified leads that convert to paying clients."
      });
    }

    if (jobTitle.includes("Business Development") || jobTitle.includes("Sales")) {
      baseQuestions.push({
        id: "sales_targets",
        question: intern
          ? "As a Business Development Intern, you're expected to support ₹2-3L in deal pipeline monthly. Can you handle this responsibility?"
          : "As a Business Development Executive, you're expected to close ₹5-8L in deals monthly with 3-5 new client meetings weekly. Can you meet these targets?",
        type: "yes-no",
        correctAnswer: "yes",
        explanation: intern
          ? "Even as an intern, you'll be involved in real deal pipelines and client interactions."
          : "Your compensation reflects the value you create through successful deals."
      });
    }

    return baseQuestions;
  };

  const getTermsAndExpectations = () => {
    if (partnershipType) {
      return getPartnershipTerms(partnershipType);
    } else {
      return getJobTerms(position, isInternship);
    }
  };

  const getPartnershipTerms = (type: string) => {
    let earnings = "₹1,000 per project";
    let commitment = "10-15 hrs/week minimum";
    let expectations = [
      "Find and pitch to potential clients independently",
      "Attend 3-hour training program and same-day activation",
      "Use provided sales materials, CRM, and support resources",
      "Maintain professional communication with clients and team",
      "Report sales activity and track commissions accurately"
    ];

    if (type.includes("Commission-Based Agent")) {
      earnings = "15-25% commission + bonuses";
      commitment = "20-30 hrs/week with monthly targets";
      expectations.push("Meet monthly sales targets for bonus eligibility");
    } else if (type.includes("Sales Partner")) {
      earnings = "Up to 20% profit share";
      commitment = "Full-time with ability to close ₹10L+ deals";
      expectations.push("Proven sales network and enterprise client relationships");
    }

    return {
      role: `${type} - Cehpoint Partner Program`,
      earnings,
      commitment,
      expectations,
      whatYouGet: [
        "Comprehensive 3-hour training on all 10 core services",
        "Sales materials, pitch decks, and contract templates",
        "CRM access for lead and commission tracking",
        "Dedicated support and escalation channels",
        "Same-day activation after training completion"
      ],
      whatWeExpect: [
        "Proactive client prospecting and outreach",
        "Professional representation of Cehpoint brand",
        "Honest and transparent client communication",
        "Continuous learning about our service offerings",
        "Results-driven approach to sales activities"
      ]
    };
  };

  const getJobTerms = (jobTitle: string, intern: boolean) => {
    const jobData: Record<string, any> = {
      "Digital Marketing Lead": {
        salary: intern ? "₹15K - ₹25K" : "₹50K - ₹80K",
        monthlyGoal: intern ? "8-12 qualified leads" : "20-30 qualified leads with 15%+ conversion",
        expectations: intern
          ? [
              "Assist in digital marketing campaigns across platforms",
              "Support SEO/SEM and content marketing initiatives",
              "Monitor campaign performance and contribute to reports",
              "Learn marketing tools while contributing to lead generation",
              "Promote our Website Development, Marketing Tech, and SaaS services"
            ]
          : [
              "Develop and execute comprehensive digital marketing campaigns",
              "Manage SEO/SEM, email marketing, social media, and content strategies",
              "Analyze performance and optimize ROI using data-driven insights",
              "Lead marketing team and coordinate with sales",
              "Showcase our technology services portfolio through compelling content"
            ]
      },
      "Business Development Executive": {
        salary: intern ? "₹12K - ₹20K" : "₹45K - ₹75K",
        monthlyGoal: intern ? "Support ₹2-3L deal pipeline" : "₹5-8L in closed deals, 3-5 new client meetings weekly",
        expectations: intern
          ? [
              "Assist in identifying and researching business opportunities",
              "Support senior executives in client meetings and presentations",
              "Learn to present our technology services under guidance",
              "Help maintain client communication and follow-ups",
              "Shadow deal negotiations and contribute to proposals"
            ]
          : [
              "Generate new business through networking and outreach",
              "Build relationships with key decision-makers",
              "Present our comprehensive technology services portfolio",
              "Negotiate contracts and close enterprise deals",
              "Collaborate with technical teams on client requirements"
            ]
      }
    };

    const data = jobData[jobTitle] || jobData["Business Development Executive"];

    return {
      role: `${jobTitle}${intern ? " (Internship)" : ""}`,
      earnings: data.salary + " per month",
      commitment: "Full commitment to performance goals and client success",
      expectations: data.expectations,
      whatYouGet: [
        "Training on our 10 core IT/tech services",
        "CRM access and sales support tools",
        "Mentorship from experienced team members",
        "Performance-based recognition and growth opportunities",
        intern ? "Real-world experience with measurable impact" : "Competitive salary tied to results"
      ],
      whatWeExpect: [
        `Achieve monthly goal: ${data.monthlyGoal}`,
        "Proactive approach to client acquisition and lead generation",
        "Professional communication and brand representation",
        "Data-driven decision making and continuous improvement",
        "Team collaboration and knowledge sharing"
      ]
    };
  };

  useEffect(() => {
    if (!router.isReady) return;
    
    const { position: pos, isInternship: intern, partnershipType: partner, message } = router.query;
    
    if (!pos && !partner) {
      router.push('/');
      return;
    }

    if (pos) {
      setPosition(pos as string);
      setIsInternship(intern === "true");
    }
    
    if (partner) {
      setPartnershipType(partner as string);
    }
  }, [router.isReady, router.query]);

  const handleAnswer = (answer: string) => {
    const questions = getScreeningQuestions();
    const currentQ = questions[currentQuestion];
    
    setAnswers({ ...answers, [currentQ.id]: answer });

    if (currentQ.correctAnswer && answer !== currentQ.correctAnswer) {
      setRejectionReason(currentQ.explanation || "Your response indicates a misalignment with our business model.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowTerms(true);
    }
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
      alert("Please review and accept the terms to proceed with your application.");
      return;
    }

    const { message } = router.query;
    router.push(`/confirmation?message=${message}`);
  };

  const questions = getScreeningQuestions();
  const terms = getTermsAndExpectations();

  if (rejectionReason) {
    return (
      <Layout>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <Head>
            <title>Application Not Proceeding - Cehpoint Careers</title>
          </Head>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ maxWidth: "600px", textAlign: "center" }}
          >
            <div style={{ fontSize: "64px", marginBottom: "1.5rem" }}>⚠️</div>
            <h1 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: "700",
              marginBottom: "1.5rem",
              color: "var(--text)"
            }}>
              Application Cannot Proceed
            </h1>
            <p style={{ 
              fontSize: "1.125rem", 
              color: "var(--text-secondary)", 
              marginBottom: "2rem", 
              lineHeight: "1.7" 
            }}>
              {rejectionReason}
            </p>
            <div style={{
              padding: "1.5rem",
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "12px",
              marginBottom: "2rem"
            }}>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                <strong style={{ color: "var(--primary)" }}>Why this matters:</strong><br />
                At Cehpoint, we operate on a results-driven, value-creation model. Our team members sell products and services to clients - not their time to the company. If you're looking for a traditional 9-5 job with fixed salary regardless of performance, this might not be the right fit.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => router.push('/')}
                className="btn btn-secondary"
              >
                Back to Careers
              </button>
              <button
                onClick={() => router.push('/sales-guide')}
                className="btn btn-ghost"
              >
                Learn About Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (showTerms) {
    return (
      <Layout>
        <div style={{ minHeight: "100vh", padding: "6rem 2rem 4rem" }}>
          <Head>
            <title>Review Terms - Cehpoint Careers</title>
          </Head>

          <div className="container" style={{ maxWidth: "900px" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: "800",
                marginBottom: "1rem",
                textAlign: "center",
                background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Review Your Role & Expectations
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "var(--text-secondary)",
                textAlign: "center",
                marginBottom: "3rem"
              }}>
                Please read carefully and confirm your understanding
              </p>

              <div className="card" style={{ marginBottom: "2rem" }}>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem", color: "var(--primary)" }}>
                    {terms.role}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div style={{
                      padding: "1rem",
                      background: "rgba(124, 58, 237, 0.1)",
                      borderRadius: "12px",
                      border: "1px solid rgba(124, 58, 237, 0.2)"
                    }}>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Earnings</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--primary)" }}>{terms.earnings}</div>
                    </div>
                    <div style={{
                      padding: "1rem",
                      background: "rgba(236, 72, 153, 0.1)",
                      borderRadius: "12px",
                      border: "1px solid rgba(236, 72, 153, 0.2)"
                    }}>
                      <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Commitment</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--secondary)" }}>{terms.commitment}</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "1rem", color: "var(--text)" }}>
                    📋 Your Responsibilities
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {terms.expectations.map((exp: string, idx: number) => (
                      <li key={idx} style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(167, 139, 250, 0.05)",
                        borderRadius: "8px",
                        borderLeft: "3px solid var(--primary)",
                        color: "var(--text-secondary)"
                      }}>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "1rem", color: "var(--text)" }}>
                    ✅ What You'll Get
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {terms.whatYouGet.map((item: string, idx: number) => (
                      <li key={idx} style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(16, 185, 129, 0.05)",
                        borderRadius: "8px",
                        borderLeft: "3px solid #10B981",
                        color: "var(--text-secondary)"
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "1rem", color: "var(--text)" }}>
                    🎯 What We Expect
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {terms.whatWeExpect.map((item: string, idx: number) => (
                      <li key={idx} style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(236, 72, 153, 0.05)",
                        borderRadius: "8px",
                        borderLeft: "3px solid var(--secondary)",
                        color: "var(--text-secondary)"
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  padding: "1.5rem",
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "2px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "12px",
                  marginBottom: "2rem"
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <input
                      type="checkbox"
                      id="termsAccept"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ marginTop: "0.25rem", width: "20px", height: "20px", cursor: "pointer" }}
                    />
                    <label htmlFor="termsAccept" style={{ fontSize: "1rem", color: "var(--text)", lineHeight: "1.6", cursor: "pointer" }}>
                      <strong>I have read and understood all responsibilities and expectations.</strong> I confirm that I understand this is a results-driven role focused on selling Cehpoint's products and services to clients. I agree to the performance goals and commit to creating value for clients.
                    </label>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => router.push('/')}
                    className="btn btn-ghost"
                  >
                    Cancel Application
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    disabled={!termsAccepted}
                    style={!termsAccepted ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                  >
                    I Accept - Proceed to Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <Head>
          <title>Application Screening - Cehpoint Careers</title>
        </Head>

        <div className="container" style={{ maxWidth: "800px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: "800",
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Application Screening
              </h1>
              <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)" }}>
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <div style={{
                width: "100%",
                height: "6px",
                background: "rgba(124, 58, 237, 0.2)",
                borderRadius: "3px",
                marginTop: "1rem",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)",
                  transition: "width 0.3s ease"
                }} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card"
              >
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  marginBottom: "2rem",
                  color: "var(--text)",
                  lineHeight: "1.4"
                }}>
                  {questions[currentQuestion]?.question}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {questions[currentQuestion]?.type === "yes-no" && (
                    <>
                      <button
                        onClick={() => handleAnswer("yes")}
                        className="btn btn-secondary"
                        style={{ justifyContent: "center", fontSize: "1.125rem", padding: "1.25rem" }}
                      >
                        ✓ Yes, I understand and accept
                      </button>
                      <button
                        onClick={() => handleAnswer("no")}
                        className="btn btn-ghost"
                        style={{ justifyContent: "center", fontSize: "1.125rem", padding: "1.25rem" }}
                      >
                        ✗ No, this doesn't align with me
                      </button>
                    </>
                  )}

                  {questions[currentQuestion]?.type === "select" && questions[currentQuestion]?.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="btn btn-secondary"
                      style={{ justifyContent: "flex-start", textAlign: "left", fontSize: "1rem", padding: "1.25rem", whiteSpace: "normal", height: "auto", minHeight: "60px" }}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {questions[currentQuestion]?.explanation && (
                  <div style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    background: "rgba(20, 184, 166, 0.1)",
                    border: "1px solid rgba(20, 184, 166, 0.3)",
                    borderRadius: "12px"
                  }}>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                      <strong style={{ color: "var(--accent)" }}>💡 Why we ask:</strong> {questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Screening;
