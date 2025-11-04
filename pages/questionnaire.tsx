import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Question {
  id: string;
  question: string;
  type: "yes-no" | "text" | "select" | "salary" | "experience";
  options?: string[];
  scoreWeight?: number;
}

const positionQuestions: Record<string, Question[]> = {
  "Digital Marketing Lead": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "nextjs_knowledge",
      question: "What is the primary client benefit of using Next.js for web applications?",
      type: "select",
      options: [
        "Faster loading websites with better SEO and scalability",
        "Lower development costs",
        "Easier to learn than other frameworks",
        "Works only on mobile devices"
      ],
      scoreWeight: 2
    },
    {
      id: "sales_guide_familiarity",
      question: "Have you reviewed our Sales Excellence Guide to understand the technologies we offer?",
      type: "yes-no",
      scoreWeight: 1
    },
    {
      id: "digital_campaigns",
      question: "Have you successfully managed paid digital marketing campaigns (Google Ads, Facebook Ads, LinkedIn Ads) with measurable ROI?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "lead_generation",
      question: "Do you have proven experience in B2B lead generation through digital channels?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "seo_sem",
      question: "Are you proficient in SEO and SEM strategies that drive organic and paid traffic?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "content_strategy",
      question: "Have you developed and executed content marketing strategies that generated business results?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "analytics",
      question: "Are you experienced with Google Analytics, conversion tracking, and data-driven decision making?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "marketing_experience",
      question: "How many years of digital marketing experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "campaign_results",
      question: "Describe your most successful digital marketing campaign and the results you achieved.",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ],
  "Business Development Executive": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "tech_knowledge",
      question: "Which technology would you recommend to a client who needs secure, real-time database with full data ownership?",
      type: "select",
      options: [
        "Supabase with PostgreSQL",
        "Microsoft Excel",
        "Google Docs",
        "WordPress"
      ],
      scoreWeight: 2
    },
    {
      id: "sales_guide_familiarity",
      question: "Have you reviewed our Sales Excellence Guide to understand the technologies and sales strategies we use?",
      type: "yes-no",
      scoreWeight: 1
    },
    {
      id: "b2b_sales",
      question: "Do you have hands-on experience in B2B technology sales and closing deals?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "client_acquisition",
      question: "Have you successfully acquired and onboarded enterprise clients?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "pipeline_management",
      question: "Are you experienced in managing sales pipelines and forecasting revenue?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "cold_outreach",
      question: "Are you comfortable with cold calling, cold emailing, and prospecting new clients?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "negotiation",
      question: "Do you have proven negotiation skills and experience closing high-value contracts?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "sales_experience",
      question: "How many years of B2B sales experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "sales_achievement",
      question: "Describe your biggest sales win and the revenue it generated.",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ],
  "Sales Development Representative": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "tech_sales_knowledge",
      question: "Do you have knowledge about information technology sales (software development, web/app services, cybersecurity)?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "outbound_prospecting",
      question: "Have you successfully generated qualified leads through outbound prospecting (calls, emails, LinkedIn)?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "crm_experience",
      question: "Are you experienced with CRM tools (HubSpot, Salesforce, Zoho) for lead management?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "target_achievement",
      question: "Have you consistently met or exceeded monthly sales targets in previous roles?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "tech_understanding",
      question: "Can you confidently discuss technology solutions like cloud hosting, cybersecurity, or software development with prospects?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "sales_experience",
      question: "How many years of sales/business development experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "motivation",
      question: "Why are you passionate about technology sales and what motivates you to succeed?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ],
  "Growth Strategist": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "growth_hacking",
      question: "Have you implemented growth hacking strategies that resulted in measurable business growth?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "data_analysis",
      question: "Are you proficient in analyzing data and metrics to identify growth opportunities?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "funnel_optimization",
      question: "Do you have experience optimizing conversion funnels and improving customer acquisition costs?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "ab_testing",
      question: "Have you conducted A/B testing and experimentation to drive growth?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "cross_functional",
      question: "Are you experienced in working cross-functionally with marketing, sales, and product teams?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "strategy_experience",
      question: "How many years of growth strategy or growth marketing experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "growth_case_study",
      question: "Describe a growth initiative you led and the impact it had on the business.",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ],
  "Social Media Analyst": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "social_analytics",
      question: "Are you proficient in social media analytics tools (Facebook Insights, Twitter Analytics, LinkedIn Analytics)?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "content_performance",
      question: "Have you analyzed and optimized social media content performance to increase engagement and reach?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "reporting",
      question: "Can you create comprehensive reports and dashboards to track social media KPIs?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "trend_analysis",
      question: "Do you stay updated with social media trends and algorithm changes?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "campaign_tracking",
      question: "Have you tracked and measured the ROI of social media campaigns?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "analyst_experience",
      question: "How many years of social media analysis experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "insights_example",
      question: "Share an example of insights you discovered that led to improved social media performance.",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ],
  "Market R&D Engineer": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "market_research",
      question: "Have you conducted comprehensive market research to identify opportunities and competitive advantages?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "competitor_analysis",
      question: "Are you experienced in competitive analysis and market positioning strategies?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "customer_insights",
      question: "Do you have experience gathering customer insights through surveys, interviews, and data analysis?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "trend_forecasting",
      question: "Can you identify and analyze market trends to inform business strategy?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "product_development",
      question: "Have you contributed to product development based on market research findings?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "research_experience",
      question: "How many years of market research and analysis experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "research_project",
      question: "Describe a market research project you led and how it impacted business decisions.",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ],
  "PR Representative": [
    {
      id: "purpose",
      question: "What do you come here to sell?",
      type: "select",
      options: [
        "I come here to sell products and services to clients",
        "I come here to sell my time to the company"
      ],
      scoreWeight: 0
    },
    {
      id: "media_relations",
      question: "Do you have experience building and maintaining relationships with media professionals and journalists?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "press_releases",
      question: "Have you written and distributed press releases that resulted in media coverage?",
      type: "yes-no",
      scoreWeight: 3
    },
    {
      id: "crisis_management",
      question: "Are you experienced in Crisis communication and reputation management?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "brand_storytelling",
      question: "Can you craft compelling brand stories and messaging for different audiences?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "event_coordination",
      question: "Have you coordinated PR events, media briefings, or press conferences?",
      type: "yes-no",
      scoreWeight: 2
    },
    {
      id: "pr_experience",
      question: "How many years of public relations experience do you have?",
      type: "experience",
      options: ["0-1 years", "1-2 years", "2-4 years", "4+ years"],
      scoreWeight: 3
    },
    {
      id: "pr_success",
      question: "Share your most successful PR campaign and the media coverage it generated.",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "salary_expectation",
      question: "What is your monthly salary expectation (in INR)?",
      type: "salary",
      scoreWeight: 0
    },
    {
      id: "name",
      question: "What is your full name?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "text",
      scoreWeight: 0
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "text",
      scoreWeight: 0
    }
  ]
};

const Questionnaire: NextPage = () => {
  const router = useRouter();
  const { job, type } = router.query;
  const applicationType = (type as string) || 'full-time';
  const isInternship = applicationType === 'internship';
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [textInput, setTextInput] = useState("");
  const [direction, setDirection] = useState(1);
  const [isRejected, setIsRejected] = useState(false);
  const [isProbation, setIsProbation] = useState(false);
  const [candidateScore, setCandidateScore] = useState(0);

  const questions = job && positionQuestions[job as string] ? positionQuestions[job as string] : [];
  const question = questions[currentQuestion];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const calculateScore = (allAnswers: Record<string, any>) => {
    let totalScore = 0;
    let maxScore = 0;

    const correctAnswers: Record<string, string> = {
      "nextjs_knowledge": "Faster loading websites with better SEO and scalability",
      "tech_knowledge": "Supabase with PostgreSQL"
    };

    questions.forEach((q) => {
      if (q.scoreWeight && q.scoreWeight > 0) {
        maxScore += q.scoreWeight;
        const answer = allAnswers[q.id];

        if (q.type === "yes-no") {
          if (answer === "Yes") {
            totalScore += q.scoreWeight;
          }
        } else if (q.type === "experience") {
          const expValue = answer;
          if (expValue === "4+ years") totalScore += q.scoreWeight;
          else if (expValue === "2-4 years") totalScore += q.scoreWeight * 0.75;
          else if (expValue === "1-2 years") totalScore += q.scoreWeight * 0.5;
          else if (expValue === "0-1 years") totalScore += q.scoreWeight * 0.25;
        } else if (q.type === "select" && correctAnswers[q.id]) {
          // Check if the answer matches the correct answer for knowledge questions
          if (answer === correctAnswers[q.id]) {
            totalScore += q.scoreWeight;
          }
        }
      }
    });

    const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    return scorePercentage;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);
    setValidationErrors({}); // Clear validation errors when an answer is provided

    if (question.id === "purpose" && answer === "I come here to sell my time to the company") {
      setTimeout(() => {
        setIsRejected(true);
      }, 300);
      return;
    }

    // Check if user answered "No" to sales_guide_familiarity
    if (question.id === "sales_guide_familiarity" && answer === "No") {
      // Redirect to sales guide with a message
      router.push('/sales-guide?from=questionnaire&job=' + encodeURIComponent(job as string) + '&type=' + applicationType);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTextInput(""); // Clear text input after answering
      }, 300);
    } else {
      const score = calculateScore(newAnswers);
      setCandidateScore(score);

      if (score >= 70) {
        completeQuestionnaire(newAnswers);
      } else if (score >= 40) {
        // Validate before showing probation screen
        if (!validateForm(newAnswers)) {
          // Scroll to top to show errors
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        setTimeout(() => {
          setIsProbation(true);
        }, 300);
      } else {
        setTimeout(() => {
          setIsRejected(true);
        }, 300);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
      setTextInput(answers[questions[currentQuestion - 1].id] || "");
      setValidationErrors({}); // Clear validation errors when going back
    }
  };

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (answers: Record<string, any>) => {
    const errors: Record<string, string> = {};

    if (!answers.name || answers.name.trim() === "") {
      errors.name = "Name is required.";
    }

    if (!answers.email || answers.email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
      errors.email = "Invalid email format.";
    }

    if (!answers.phone || answers.phone.trim() === "") {
      errors.phone = "Phone number is required.";
    } else if (!/^[0-9]+$/.test(answers.phone)) {
      errors.phone = "Phone number must contain only digits.";
    }

    if (!answers.salary_expectation || isNaN(Number(answers.salary_expectation)) || Number(answers.salary_expectation) <= 0) {
      errors.salary_expectation = "Salary expectation must be a positive number.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const completeQuestionnaire = async (finalAnswers: Record<string, any>) => {
    if (!validateForm(finalAnswers)) {
      return;
    }
    const applicationData = {
      job: job as string,
      applicationType: applicationType,
      answers: finalAnswers,
      score: candidateScore,
      timestamp: new Date().toISOString()
    };

    const jsonData = JSON.stringify(applicationData);
    const base64Data = btoa(unescape(encodeURIComponent(jsonData)));

    // Send data to WhatsApp API endpoint
    try {
      await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64Data }),
      });
      console.log('Application data sent to WhatsApp system.');
    } catch (error) {
      console.error('Failed to send application data to WhatsApp system:', error);
    }
    
    const message = `*New ${isInternship ? 'Internship' : 'Job'} Application - Cehpoint*

*Position:* ${job} (${isInternship ? 'Internship' : 'Full-Time'})
*Name:* ${finalAnswers.name}
*Email:* ${finalAnswers.email}
*Phone:* ${finalAnswers.phone}
*${isInternship ? 'Stipend' : 'Salary'} Expectation:* ₹${finalAnswers.salary_expectation} per month

---
*Application Data (DO NOT MODIFY):*
${base64Data}`;

    router.push(`/confirmation?message=${encodeURIComponent(message)}`);
  };

  const acceptProbation = () => {
    const applicationData = {
      job: job as string,
      applicationType: applicationType,
      answers,
      score: candidateScore,
      probationAccepted: true,
      timestamp: new Date().toISOString()
    };

    const jsonData = JSON.stringify(applicationData);
    const base64Data = btoa(unescape(encodeURIComponent(jsonData)));
    
    const message = `*Probation Application - Cehpoint*

*Position:* ${job} (${isInternship ? 'Internship' : 'Full-Time'})
*Name:* ${answers.name}
*Email:* ${answers.email}
*Phone:* ${answers.phone}

*Status:* PROBATION/INTERNSHIP REQUEST

The candidate has moderate qualifications and has accepted the 15-day unpaid probation period for training and evaluation.

*Salary Expectation:* ₹${answers.salary_expectation} per month (after probation)

---
*Application Data:*
${base64Data}`;

    router.push(`/confirmation?message=${encodeURIComponent(message)}`);
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

  if (!router.isReady || !job || !positionQuestions[job as string]) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(167, 139, 250, 0.2)",
          borderTop: "3px solid #a78bfa",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div style={{ minHeight: "100vh", position: "relative", background: "#0A0A0F" }}>
        <Head>
          <title>Application Update | Cehpoint</title>
          <meta name="viewport" content="width=1024" />
        </Head>

        <motion.div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
            filter: "blur(120px)",
            pointerEvents: "none"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "80px 20px", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(236, 72, 153, 0.2)",
              borderRadius: "20px",
              padding: "50px 40px",
              textAlign: "center",
              backdropFilter: "blur(20px)"
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 30px",
                background: "linear-gradient(135deg, #EC4899 0%, #7C3AED 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "32px",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "20px"
              }}
            >
              Not the Right Fit
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: "1.7",
                marginBottom: "30px"
              }}
            >
              Thank you for your interest in Cehpoint. However, this position requires professionals who are passionate about <strong style={{ color: "#EC4899" }}>selling products and services to clients</strong> with proven experience and results-driven mindset.
            </p>

            <div
              style={{
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "30px",
                textAlign: "left"
              }}
            >
              <h3
                style={{
                  fontFamily: "&apos;Space Grotesk&apos;, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "15px"
                }}
              >
                💡 Our Philosophy
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.7", margin: 0 }}>
                At Cehpoint, we believe in <strong style={{ color: "#7C3AED" }}>results over hours</strong>. We&apos;re building a team of entrepreneurial professionals who measure success by the value they create for clients, not the time they spend at a desk.
              </p>
            </div>

            <div
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "35px",
                textAlign: "left"
              }}
            >
              <h3
                style={{
                  fontFamily: "&apos;Space Grotesk&apos;, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "15px"
                }}
              >
                ✨ What We&apos;re Looking For
              </h3>
              <ul style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.9", margin: 0, paddingLeft: "20px" }}>
                <li>Value creators who focus on client success</li>
                <li>Professionals with proven track records</li>
                <li>Team members driven by targets and achievements</li>
                <li>Individuals who grow as the company grows</li>
              </ul>
            </div>

            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              Return to Homepage
            </motion.button>

            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)", marginTop: "25px", lineHeight: "1.6" }}>
              We appreciate your time and encourage you to explore opportunities that align better with your current experience level and career goals.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isProbation) {
    return (
      <div style={{ minHeight: "100vh", position: "relative", background: "#0A0A0F" }}>
        <Head>
          <title>Internship Opportunity | Cehpoint</title>
          <meta name="viewport" content="width=1024" />
        </Head>

        <motion.div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            filter: "blur(120px)",
            pointerEvents: "none"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "80px 20px", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              borderRadius: "20px",
              padding: "50px 40px",
              textAlign: "center",
              backdropFilter: "blur(20px)"
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 30px",
                background: "linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6v6l4 2m6-2c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "32px",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "15px"
              }}
            >
              We See Potential! 🌟
            </h1>
            
            <div
              style={{
                display: "inline-block",
                padding: "8px 16px",
                background: "rgba(124, 58, 237, 0.2)",
                border: "1px solid rgba(124, 58, 237, 0.4)",
                borderRadius: "8px",
                marginBottom: "25px"
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#A78BFA" }}>
                Qualification Score: {Math.round(candidateScore)}%
              </span>
            </div>

            <p
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: "1.7",
                marginBottom: "35px"
              }}
            >
              Based on your profile, you have potential but need additional training to excel in this role. 
              We&apos;d like to offer you a <strong style={{ color: "#7C3AED" }}>15-day probation/internship period</strong> to help you grow!
            </p>

            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "16px",
                padding: "30px",
                marginBottom: "30px",
                textAlign: "left"
              }}
            >
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: "20px",
                  textAlign: "center"
                }}
              >
                📚 15-Day Probation Program
              </h3>
              
              <div style={{ display: "grid", gap: "15px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                  <span style={{ fontSize: "24px" }}>✓</span>
                  <div>
                    <strong style={{ color: "#F59E0B", fontSize: "15px" }}>Intensive Training:</strong>
                    <p style={{ margin: "5px 0 0 0", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", lineHeight: "1.6" }}>
                      Learn industry best practices, our products/services, and proven sales techniques from experienced mentors.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                  <span style={{ fontSize: "24px" }}>✓</span>
                  <div>
                    <strong style={{ color: "#F59E0B", fontSize: "15px" }}>Real-World Experience:</strong>
                    <p style={{ margin: "5px 0 0 0", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", lineHeight: "1.6" }}>
                      Work on actual projects, interact with clients, and build practical skills that matter.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                  <span style={{ fontSize: "24px" }}>✓</span>
                  <div>
                    <strong style={{ color: "#F59E0B", fontSize: "15px" }}>Performance Evaluation:</strong>
                    <p style={{ margin: "5px 0 0 0", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", lineHeight: "1.6" }}>
                      At the end of 15 days, we&apos;ll assess your progress. Top performers will receive full-time offers with competitive salaries.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
                  <span style={{ fontSize: "24px" }}>✓</span>
                  <div>
                    <strong style={{ color: "#F59E0B", fontSize: "15px" }}>Unpaid Training Period:</strong>
                    <p style={{ margin: "5px 0 0 0", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", lineHeight: "1.6" }}>
                      This is an investment in your growth. Successful candidates will start earning immediately after probation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "35px",
                textAlign: "left"
              }}
            >
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "15px"
                }}
              >
                🎯 After Successful Probation
              </h3>
              <ul style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.9", margin: 0, paddingLeft: "20px" }}>
                <li>Full-time employment with competitive salary package</li>
                <li>Performance-based incentives and bonuses</li>
                <li>Career growth opportunities within Cehpoint</li>
                <li>Continuous learning and skill development</li>
              </ul>
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                onClick={acceptProbation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "16px 36px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
              >
                Yes, I Accept the Probation Period →
              </motion.button>
              
              <motion.button
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "16px 36px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif"
                }}
              >
                No, Thanks
              </motion.button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.4)", marginTop: "25px", lineHeight: "1.6" }}>
              This is your opportunity to learn, grow, and prove yourself. We invest in potential—will you invest in yours?
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Head>
        <title>Application for {job} | Cehpoint</title>
        <meta name="description" content="Apply for {job} position at Cehpoint. Fill out the questionnaire to submit your application." />
        <meta name="keywords" content="{job} application, Cehpoint careers, job questionnaire, apply online" />
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
          zIndex: 100,
          overflow: "hidden"
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

      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none"
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none"
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <main style={{ 
        padding: "6rem 1.5rem 4rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              marginBottom: "3rem"
            }}
          >
            <h1 className="display-font gradient-text" style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em"
            }}>
              {job}
            </h1>
            <p style={{
              fontSize: "1rem",
              color: "var(--text-secondary)"
            }}>
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </motion.div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <div className="card-premium" style={{ padding: "3rem 2.5rem" }}>
                <h2 style={{
                  fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
                  fontWeight: 600,
                  marginBottom: "2.5rem",
                  color: "var(--text)",
                  lineHeight: 1.4
                }}>
                  {question.id === 'salary_expectation' && isInternship 
                    ? question.question.replace('salary', 'stipend')
                    : question.question}
                </h2>

                {question.type === "yes-no" && (
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {["Yes", "No"].map((option) => (
                      <motion.button
                        key={option}
                        className="btn btn-secondary"
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          minWidth: "150px",
                          padding: "1.25rem 2rem",
                          fontSize: "1.1rem",
                          background: answers[question.id] === option 
                            ? "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)"
                            : "rgba(255, 255, 255, 0.03)",
                          border: answers[question.id] === option
                            ? "1px solid rgba(167, 139, 250, 0.4)"
                            : "1px solid rgba(255, 255, 255, 0.08)"
                        }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {(question.type === "select" || question.type === "experience") && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {question.options?.map((option) => (
                      <motion.button
                        key={option}
                        className="btn btn-secondary"
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.01, x: 5 }}
                        whileTap={{ scale: 0.99 }}
                        style={{
                          padding: "1.15rem 1.75rem",
                          fontSize: "1.05rem",
                          textAlign: "left",
                          background: answers[question.id] === option 
                            ? "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)"
                            : "rgba(255, 255, 255, 0.03)",
                          border: answers[question.id] === option
                            ? "1px solid rgba(167, 139, 250, 0.4)"
                            : "1px solid rgba(255, 255, 255, 0.08)"
                        }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <div>
                    <textarea
                      value={textInput}
                      onChange={(e) => {
                        setTextInput(e.target.value);
                        setValidationErrors({}); // Clear validation errors on typing
                      }}
                      placeholder="Type your answer here..."
                      style={{
                        width: "100%",
                        minHeight: "150px",
                        padding: "1.25rem",
                        fontSize: "1.05rem",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: validationErrors[question.id] ? "1px solid #ef4444" : "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        color: "var(--text)",
                        marginBottom: "0.5rem",
                        resize: "vertical",
                        fontFamily: "inherit",
                        lineHeight: 1.6
                      }}
                    />
                    {validationErrors[question.id] && (
                      <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                        {validationErrors[question.id]}
                      </p>
                    )}
                    <motion.button
                      className="btn btn-primary"
                      onClick={() => textInput.trim() && handleAnswer(textInput)}
                      disabled={!textInput.trim()}
                      whileHover={{ scale: textInput.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: textInput.trim() ? 0.98 : 1 }}
                      style={{
                        width: "100%",
                        padding: "1.15rem",
                        fontSize: "1.1rem",
                        opacity: textInput.trim() ? 1 : 0.5,
                        cursor: textInput.trim() ? "pointer" : "not-allowed"
                      }}
                    >
                      Continue →
                    </motion.button>
                  </div>
                )}

                {question.type === "salary" && (
                  <div>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute",
                        left: "1.25rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "1.15rem",
                        color: "var(--text-muted)"
                      }}>
                        ₹
                      </span>
                      <input
                        type="number"
                        value={textInput}
                        onChange={(e) => {
                          setTextInput(e.target.value);
                          setValidationErrors({}); // Clear validation errors on typing
                        }}
                        placeholder="50000"
                        style={{
                          width: "100%",
                          padding: "1.15rem 1.25rem 1.15rem 2.5rem",
                          fontSize: "1.15rem",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: validationErrors[question.id] ? "1px solid #ef4444" : "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "12px",
                          color: "var(--text)",
                          marginBottom: "0.5rem"
                        }}
                      />
                    </div>
                    <motion.button
                      className="btn btn-primary"
                      onClick={() => textInput.trim() && handleAnswer(textInput)}
                      disabled={!textInput.trim()}
                      whileHover={{ scale: textInput.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: textInput.trim() ? 0.98 : 1 }}
                      style={{
                        width: "100%",
                        padding: "1.15rem",
                        fontSize: "1.1rem",
                        opacity: textInput.trim() ? 1 : 0.5,
                        cursor: textInput.trim() ? "pointer" : "not-allowed"
                      }}
                    >
                      Continue →
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {currentQuestion > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleBack}
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: "1.5rem",
                width: "100%",
                padding: "1rem",
                fontSize: "1rem"
              }}
            >
              ← Back
            </motion.button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Questionnaire;
