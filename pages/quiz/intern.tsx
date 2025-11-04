import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const allQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary client benefit of using Next.js for web applications?",
    options: [
      "Faster loading websites with better SEO and scalability",
      "Lower development costs",
      "Easier to learn than other frameworks",
      "Works only on mobile devices"
    ],
    correctAnswer: 0,
    explanation: "Next.js provides faster loading websites, better search engine ranking, and future-ready technology that handles high traffic smoothly.",
    category: "Web Technologies"
  },
  {
    id: 2,
    question: "Which platform offers 'lifetime hosting with high performance and auto-scaling'?",
    options: ["WordPress", "Vercel", "Wix", "Squarespace"],
    correctAnswer: 1,
    explanation: "Vercel is a global cloud hosting platform optimized for modern web applications with auto-scaling and zero downtime.",
    category: "Cloud Infrastructure"
  },
  {
    id: 3,
    question: "What is Firebase best positioned for in sales conversations?",
    options: [
      "Enterprise companies needing custom solutions",
      "Startups and small businesses needing to launch quickly",
      "Government organizations",
      "Non-profit organizations only"
    ],
    correctAnswer: 1,
    explanation: "Firebase is Google's backend-as-a-service platform ideal for startups and small businesses that need real-time data synchronization and fast deployment.",
    category: "Backend Services"
  },
  {
    id: 4,
    question: "What is the key selling point of Supabase over Firebase?",
    options: [
      "It's cheaper",
      "It's easier to use",
      "Full data ownership and no vendor lock-in",
      "It has more features"
    ],
    correctAnswer: 2,
    explanation: "Supabase is positioned as the enterprise-grade choice with full data ownership and no vendor lock-in, making it ideal for businesses wanting control of their data.",
    category: "Backend Services"
  },
  {
    id: 5,
    question: "Which database technology has a 'proven track record with Fortune 500 companies'?",
    options: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
    correctAnswer: 2,
    explanation: "PostgreSQL is an advanced open-source database system known for reliability and performance with Fortune 500 companies.",
    category: "Databases"
  },
  {
    id: 6,
    question: "What are the main benefits of JAMStack architecture?",
    options: [
      "Slower performance but easier maintenance",
      "Lightning-fast page loads, enhanced security, and easy maintenance",
      "Only works with JavaScript",
      "Requires expensive hosting"
    ],
    correctAnswer: 1,
    explanation: "JAMStack (JavaScript, APIs, Markup) provides lightning-fast page loads, globally distributed content, enhanced security, and easy maintenance.",
    category: "Web Architecture"
  },
  {
    id: 7,
    question: "When selling AWS, Azure, or Google Cloud, which benefit should you emphasize?",
    options: [
      "They're the cheapest option",
      "Global infrastructure, automated backups, 99.9% uptime, and unlimited scalability",
      "They only work with specific technologies",
      "They require minimal technical knowledge"
    ],
    correctAnswer: 1,
    explanation: "Cloud platforms offer global infrastructure, automated backups, 99.9% uptime, and unlimited scalability - these are key selling points.",
    category: "Cloud Infrastructure"
  },
  {
    id: 8,
    question: "What is the business outcome to emphasize when selling Docker & DevOps solutions?",
    options: [
      "More complex deployments",
      "Faster time to market and reduced operational costs",
      "Slower development cycle",
      "Increased manual work"
    ],
    correctAnswer: 1,
    explanation: "Docker & DevOps provide faster time to market and reduced operational costs through containerization and continuous deployment.",
    category: "DevOps"
  },
  {
    id: 9,
    question: "Why are APIs & Microservices perfect for growing businesses?",
    options: [
      "They're cheap",
      "They're easy to build",
      "Flexibility and future-proofing - easy scaling and seamless integrations",
      "They require less testing"
    ],
    correctAnswer: 2,
    explanation: "APIs & Microservices offer flexibility and future-proofing, allowing businesses to scale easily and integrate with third-party services without downtime.",
    category: "Architecture"
  },
  {
    id: 10,
    question: "What should you lead with when discussing SSL & Encryption with e-commerce clients?",
    options: [
      "Technical specifications",
      "Trust and compliance - protecting customer data and improving search rankings",
      "Cost savings",
      "Implementation difficulty"
    ],
    correctAnswer: 1,
    explanation: "For e-commerce and healthcare, lead with trust and compliance - SSL protects sensitive customer data, builds user trust, and improves search rankings.",
    category: "Cybersecurity"
  },
  {
    id: 11,
    question: "How should you create urgency when selling Firewalls & WAF?",
    options: [
      "Mention competitors using it",
      "Focus on the technology features",
      "Use industry statistics about the average cost of a data breach",
      "Offer discounts"
    ],
    correctAnswer: 2,
    explanation: "Use industry statistics about the average cost of a data breach to create urgency - this makes the threat real and immediate.",
    category: "Cybersecurity"
  },
  {
    id: 12,
    question: "Which organizations most need IAM (Identity and Access Management)?",
    options: [
      "Small local businesses",
      "Companies with remote teams or regulatory requirements",
      "Only tech companies",
      "Non-profits"
    ],
    correctAnswer: 1,
    explanation: "IAM is essential for companies with remote teams or regulatory requirements, providing granular access control and audit trails.",
    category: "Security"
  },
  {
    id: 13,
    question: "What is the best ROI pitch for AI solutions?",
    options: [
      "AI is the future",
      "Everyone else is using it",
      "AI saves time on repetitive tasks and uncovers revenue opportunities",
      "It looks impressive"
    ],
    correctAnswer: 2,
    explanation: "Focus on ROI - AI automates workflows, provides predictive insights, and saves time on repetitive tasks while uncovering new revenue opportunities.",
    category: "Emerging Tech"
  },
  {
    id: 14,
    question: "Which industries are best for Blockchain solutions?",
    options: [
      "Only cryptocurrency companies",
      "Finance, supply chain, and healthcare - industries requiring audit trails",
      "Retail only",
      "Entertainment industry"
    ],
    correctAnswer: 1,
    explanation: "Blockchain is best for industries requiring audit trails like finance, supply chain, and healthcare due to its tamper-proof records and transparency.",
    category: "Emerging Tech"
  },
  {
    id: 15,
    question: "What IoT use cases should you lead with for manufacturing clients?",
    options: [
      "Social media integration",
      "Real-time monitoring, predictive maintenance, and operational efficiency",
      "Marketing automation",
      "Customer service chatbots"
    ],
    correctAnswer: 1,
    explanation: "For manufacturing, logistics, and healthcare, lead with real-time monitoring, predictive maintenance, and operational efficiency benefits.",
    category: "Emerging Tech"
  },
  {
    id: 16,
    question: "What is the first sales strategy for 'Building Authority Through Content'?",
    options: [
      "Post daily on all social media",
      "Share success stories and case studies on LinkedIn to demonstrate expertise",
      "Create viral content",
      "Focus only on paid advertising"
    ],
    correctAnswer: 1,
    explanation: "Building authority starts with sharing success stories and case studies on LinkedIn to demonstrate real expertise and credibility.",
    category: "Sales Strategy"
  },
  {
    id: 17,
    question: "In Strategic Networking, what is the best approach?",
    options: [
      "Attend as many events as possible without follow-up",
      "Only network online",
      "Build relationships with complementary service providers for referrals",
      "Focus only on direct competitors"
    ],
    correctAnswer: 2,
    explanation: "Strategic networking involves building relationships with complementary service providers who can provide referrals and mutual business opportunities.",
    category: "Sales Strategy"
  },
  {
    id: 18,
    question: "What defines a 'Value-First Selling Approach'?",
    options: [
      "Offering the lowest prices",
      "Pushing products aggressively",
      "Lead with free consultations and provide actionable insights before asking for the sale",
      "Only working with enterprise clients"
    ],
    correctAnswer: 2,
    explanation: "Value-first selling means leading with free consultations, providing actionable insights, and focusing on solving business problems before asking for the sale.",
    category: "Sales Strategy"
  },
  {
    id: 19,
    question: "For Digital Presence Optimization, what should you prioritize?",
    options: [
      "Having accounts on every social platform",
      "Posting frequency over quality",
      "Optimize LinkedIn profile to attract inbound leads and share client testimonials",
      "Only using paid advertising"
    ],
    correctAnswer: 2,
    explanation: "Digital presence optimization focuses on optimizing LinkedIn to attract inbound leads, sharing testimonials, and creating educational content.",
    category: "Sales Strategy"
  },
  {
    id: 20,
    question: "What makes Next.js a 'competitive advantage' for clients?",
    options: [
      "It's the newest technology",
      "Faster sites convert better and rank higher on Google",
      "It's the easiest to learn",
      "It has the most developers"
    ],
    correctAnswer: 1,
    explanation: "Position Next.js as a competitive advantage because faster loading sites have better conversion rates and higher Google rankings.",
    category: "Web Technologies"
  },
  {
    id: 21,
    question: "Why should international businesses choose Vercel?",
    options: [
      "It's the cheapest option",
      "'Always-on' reliability and global reach - perfect for international markets",
      "It only works in specific countries",
      "It requires less maintenance"
    ],
    correctAnswer: 1,
    explanation: "Emphasize Vercel's 'always-on' reliability and global reach, making it perfect for businesses targeting international markets.",
    category: "Cloud Infrastructure"
  },
  {
    id: 22,
    question: "What credibility factor should you mention when selling Firebase?",
    options: [
      "It's open source",
      "It's the cheapest backend solution",
      "Google's infrastructure backing",
      "It has the most features"
    ],
    correctAnswer: 2,
    explanation: "Mention Google's infrastructure backing for credibility - this adds trust and reliability to the Firebase offering.",
    category: "Backend Services"
  },
  {
    id: 23,
    question: "How do you quantify value for prospects in a Value-First approach?",
    options: [
      "Show competitor prices",
      "Use ROI calculators to demonstrate potential returns",
      "Focus on features list",
      "Offer the lowest price"
    ],
    correctAnswer: 1,
    explanation: "Use ROI calculators to quantify value for prospects, showing them concrete numbers on potential returns and business impact.",
    category: "Sales Strategy"
  },
  {
    id: 24,
    question: "What type of content should you create for Digital Presence Optimization?",
    options: [
      "Only promotional content",
      "Educational video content explaining complex tech simply",
      "Only text-based posts",
      "Competitor comparisons"
    ],
    correctAnswer: 1,
    explanation: "Create educational video content that explains complex technology simply - this builds authority and helps prospects understand value.",
    category: "Sales Strategy"
  },
  {
    id: 25,
    question: "What is the key benefit of PostgreSQL for applications with high traffic?",
    options: [
      "It's free",
      "Efficiently manages structured data, handling thousands of users without slowdowns",
      "It's easy to install",
      "It works on all devices"
    ],
    correctAnswer: 1,
    explanation: "PostgreSQL efficiently manages structured data, enabling applications to handle thousands of users without performance slowdowns.",
    category: "Databases"
  },
  {
    id: 26,
    question: "What security benefit directly impacts conversion rates?",
    options: [
      "Complex passwords",
      "JAMStack's enhanced security and speed",
      "Multi-factor authentication",
      "Firewall rules"
    ],
    correctAnswer: 1,
    explanation: "JAMStack's speed and security benefits directly impact conversion rates and user trust, making it a strong selling point.",
    category: "Web Architecture"
  },
  {
    id: 27,
    question: "When should you match cloud platforms to client needs?",
    options: [
      "Always recommend the cheapest",
      "AWS for flexibility, Azure for Microsoft shops, GCP for data analytics",
      "Only sell one platform",
      "Let clients choose randomly"
    ],
    correctAnswer: 1,
    explanation: "Match platforms to client needs: AWS for flexibility, Azure for Microsoft ecosystem, GCP for data analytics and ML capabilities.",
    category: "Cloud Infrastructure"
  },
  {
    id: 28,
    question: "What business problem do APIs & Microservices solve?",
    options: [
      "Reducing code quality",
      "Making systems more complex",
      "Updating specific features without downtime and seamless third-party integrations",
      "Increasing costs"
    ],
    correctAnswer: 2,
    explanation: "APIs & Microservices allow businesses to update specific features without downtime and integrate seamlessly with third-party services.",
    category: "Architecture"
  },
  {
    id: 29,
    question: "Why is 24/7 automated threat detection valuable for clients?",
    options: [
      "It's cheaper than manual monitoring",
      "Peace of mind and protection from cyber threats while the business sleeps",
      "It's required by law",
      "It's a nice-to-have feature"
    ],
    correctAnswer: 1,
    explanation: "Firewalls & WAF provide 24/7 protection and automated threat detection, giving business owners peace of mind around the clock.",
    category: "Cybersecurity"
  },
  {
    id: 30,
    question: "What makes content marketing effective for authority building?",
    options: [
      "Posting as frequently as possible",
      "Creating helpful blog posts about industry trends clients care about",
      "Only sharing company news",
      "Copying competitor content"
    ],
    correctAnswer: 1,
    explanation: "Effective content marketing involves creating helpful blog posts about industry trends that your target clients actually care about.",
    category: "Sales Strategy"
  },
  {
    id: 31,
    question: "Where should you engage to position yourself as a trusted advisor?",
    options: [
      "Only on your own website",
      "In industry groups and forums where prospects gather",
      "Random social media platforms",
      "Only through paid ads"
    ],
    correctAnswer: 1,
    explanation: "Engage meaningfully in industry groups and forums where your prospects gather to position yourself as a trusted advisor, not just a vendor.",
    category: "Sales Strategy"
  },
  {
    id: 32,
    question: "What is the goal of Strategic Networking?",
    options: [
      "Collect as many business cards as possible",
      "Attend events only",
      "Connect with decision-makers and build referral partnerships",
      "Only network with direct competitors"
    ],
    correctAnswer: 2,
    explanation: "Strategic networking aims to connect with decision-makers and build relationships with complementary partners for referrals.",
    category: "Sales Strategy"
  },
  {
    id: 33,
    question: "How should you leverage existing clients in networking?",
    options: [
      "Never mention current clients",
      "Use their networks for warm introductions",
      "Only ask for testimonials",
      "Compete for their market share"
    ],
    correctAnswer: 1,
    explanation: "Leverage existing client networks for warm introductions - satisfied clients can open doors to similar businesses.",
    category: "Sales Strategy"
  },
  {
    id: 34,
    question: "What defines result-oriented professionals at Cehpoint?",
    options: [
      "Working long hours",
      "Measuring success by value created for clients, not time at a desk",
      "Following strict schedules",
      "Avoiding risks"
    ],
    correctAnswer: 1,
    explanation: "At Cehpoint, result-oriented professionals measure success by the value they create for clients, not the time spent working.",
    category: "Company Philosophy"
  },
  {
    id: 35,
    question: "What is Cehpoint's current marketing focus for cost efficiency?",
    options: [
      "High-budget TV advertising",
      "Low-cost or no-cost marketing strategies",
      "Billboards and print media",
      "Expensive trade shows"
    ],
    correctAnswer: 1,
    explanation: "Cehpoint is currently focusing on low-cost or no-cost marketing strategies to achieve huge growth efficiently.",
    category: "Company Strategy"
  },
  {
    id: 36,
    question: "What conversion benefit should you emphasize with speed optimizations?",
    options: [
      "Better looking websites",
      "Easier coding",
      "Faster sites have higher conversion rates and better user trust",
      "Lower hosting costs"
    ],
    correctAnswer: 2,
    explanation: "Speed directly impacts conversion rates - faster loading websites convert better and build more user trust.",
    category: "Web Technologies"
  },
  {
    id: 37,
    question: "What makes SSL certificates important for search rankings?",
    options: [
      "Google doesn't care about security",
      "SSL is required by law",
      "Google ranks secure (HTTPS) sites higher than non-secure sites",
      "SSL only affects mobile rankings"
    ],
    correctAnswer: 2,
    explanation: "Google ranks secure HTTPS sites higher in search results, making SSL certificates important for both security and SEO.",
    category: "Cybersecurity"
  },
  {
    id: 38,
    question: "What compliance benefit does IAM provide?",
    options: [
      "It eliminates all regulations",
      "Audit trails and compliance readiness for regulated industries",
      "It only helps with GDPR",
      "It replaces legal requirements"
    ],
    correctAnswer: 1,
    explanation: "IAM provides audit trails and compliance readiness, essential for companies in regulated industries with strict data access requirements.",
    category: "Security"
  },
  {
    id: 39,
    question: "How should you position yourself versus being 'just a vendor'?",
    options: [
      "Focus only on selling",
      "Position as a trusted advisor solving business problems",
      "Offer the cheapest prices",
      "Emphasize product features only"
    ],
    correctAnswer: 1,
    explanation: "Position yourself as a trusted advisor who solves specific business problems, not just a vendor pushing products.",
    category: "Sales Strategy"
  },
  {
    id: 40,
    question: "What should you optimize in your email signature?",
    options: [
      "Company logo only",
      "Links to valuable resources that help prospects",
      "Multiple social media icons",
      "Company address"
    ],
    correctAnswer: 1,
    explanation: "Use email signatures with links to valuable resources that help prospects - this provides value in every interaction.",
    category: "Sales Strategy"
  },
  {
    id: 41,
    question: "What type of AI benefit resonates most with business decision-makers?",
    options: [
      "Cool technology features",
      "Automated workflows and predictive insights leading to better decisions",
      "Complex algorithms",
      "Technical specifications"
    ],
    correctAnswer: 1,
    explanation: "Focus on business benefits: automated workflows, predictive insights, and data-driven decisions that directly impact the bottom line.",
    category: "Emerging Tech"
  },
  {
    id: 42,
    question: "Why is transparency important in supply chain Blockchain applications?",
    options: [
      "It's legally required",
      "Tamper-proof records and enhanced trust throughout the supply chain",
      "It reduces costs",
      "It speeds up shipping"
    ],
    correctAnswer: 1,
    explanation: "Blockchain provides tamper-proof records and enhanced trust, creating transparency throughout complex supply chains.",
    category: "Emerging Tech"
  },
  {
    id: 43,
    question: "What operational benefit should you emphasize for IoT in logistics?",
    options: [
      "Reduced staffing needs",
      "Real-time monitoring and predictive maintenance reducing downtime",
      "Cheaper vehicles",
      "Faster hiring"
    ],
    correctAnswer: 1,
    explanation: "For logistics, emphasize real-time monitoring and predictive maintenance that reduces unexpected downtime and improves efficiency.",
    category: "Emerging Tech"
  },
  {
    id: 44,
    question: "What is the key to successful case studies on LinkedIn?",
    options: [
      "Making them as long as possible",
      "Demonstrating real expertise through measurable client results",
      "Including technical jargon",
      "Focusing on your company history"
    ],
    correctAnswer: 1,
    explanation: "Successful case studies demonstrate real expertise by showing measurable results you achieved for actual clients.",
    category: "Sales Strategy"
  },
  {
    id: 45,
    question: "When joining business chambers and associations, what is the primary goal?",
    options: [
      "Collecting certificates",
      "Attending free events",
      "Building strategic partnerships and accessing decision-maker networks",
      "Getting discounts"
    ],
    correctAnswer: 2,
    explanation: "Join local business chambers and technology associations to build strategic partnerships and access networks of decision-makers.",
    category: "Sales Strategy"
  },
  {
    id: 46,
    question: "What makes a technology assessment 'value-first'?",
    options: [
      "Charging premium prices",
      "Providing actionable insights for free before asking for the sale",
      "Only showing product features",
      "Making it complicated"
    ],
    correctAnswer: 1,
    explanation: "Value-first means providing free technology assessments with actionable insights before asking for any commitment or sale.",
    category: "Sales Strategy"
  },
  {
    id: 47,
    question: "What type of LinkedIn profile optimization attracts inbound leads?",
    options: [
      "Listing all certifications",
      "Showcasing expertise, client results, and value you provide",
      "Adding maximum connections",
      "Posting company news only"
    ],
    correctAnswer: 1,
    explanation: "Optimize your LinkedIn profile to showcase your expertise, client results, and the specific value you provide to attract inbound leads.",
    category: "Sales Strategy"
  },
  {
    id: 48,
    question: "Why share client testimonials on social platforms?",
    options: [
      "To fill content calendar",
      "Build credibility and trust with prospects through social proof",
      "To compete with others",
      "Because it's trendy"
    ],
    correctAnswer: 1,
    explanation: "Client testimonials and results provide social proof that builds credibility and trust with potential clients.",
    category: "Sales Strategy"
  },
  {
    id: 49,
    question: "What makes Supabase 'enterprise-grade'?",
    options: [
      "Higher price point",
      "More marketing",
      "PostgreSQL foundation with full data ownership and no vendor lock-in",
      "Larger company"
    ],
    correctAnswer: 2,
    explanation: "Supabase is enterprise-grade because it's built on PostgreSQL, offers full data ownership, and avoids vendor lock-in issues.",
    category: "Backend Services"
  },
  {
    id: 50,
    question: "What is the main advantage of containerization with Docker?",
    options: [
      "Prettier interfaces",
      "Consistent environments eliminating 'works on my machine' problems",
      "Slower deployments",
      "More complex setups"
    ],
    correctAnswer: 1,
    explanation: "Docker containerization ensures consistent environments across development, testing, and production, eliminating deployment errors.",
    category: "DevOps"
  },
  {
    id: 51,
    question: "Why is future-proofing important when selling to growing businesses?",
    options: [
      "It sounds impressive",
      "Prevents costly rewrites and allows seamless scaling as the business grows",
      "It's more expensive",
      "It's required by law"
    ],
    correctAnswer: 1,
    explanation: "Future-proofing prevents costly technology rewrites and allows businesses to scale seamlessly as they grow.",
    category: "Architecture"
  },
  {
    id: 52,
    question: "What peace of mind does 99.9% uptime provide to clients?",
    options: [
      "Cheaper hosting",
      "Faster websites",
      "Reliable service ensuring their business is always accessible to customers",
      "Easier management"
    ],
    correctAnswer: 2,
    explanation: "99.9% uptime means reliable, always-accessible service, giving business owners peace of mind that customers can always reach them.",
    category: "Cloud Infrastructure"
  },
  {
    id: 53,
    question: "How do you demonstrate thought leadership in industry forums?",
    options: [
      "Post links to your products",
      "Share valuable insights and help solve others' problems without selling",
      "Argue with competitors",
      "Only promote your services"
    ],
    correctAnswer: 1,
    explanation: "Demonstrate thought leadership by sharing valuable insights and helping solve problems without immediately selling - build trust first.",
    category: "Sales Strategy"
  },
  {
    id: 54,
    question: "What makes webinars effective for strategic networking?",
    options: [
      "They're free to host",
      "Direct access to engaged decision-makers interested in your topic",
      "They require minimal preparation",
      "They're trending"
    ],
    correctAnswer: 1,
    explanation: "Webinars attract engaged decision-makers who are actively interested in your topic, providing high-quality networking opportunities.",
    category: "Sales Strategy"
  },
  {
    id: 55,
    question: "What does 'globally distributed content' mean for client experience?",
    options: [
      "Content in multiple languages",
      "Fast loading from anywhere in the world through edge networks",
      "Available on multiple devices",
      "Stored in multiple formats"
    ],
    correctAnswer: 1,
    explanation: "Globally distributed content via CDNs means fast loading times for users anywhere in the world, improving user experience globally.",
    category: "Web Architecture"
  }
];

const InternQuiz: NextPage = () => {
  const router = useRouter();
  const { job, type } = router.query;
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const selectRandomQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  const startQuiz = () => {
    const questions = selectRandomQuestions();
    setSelectedQuestions(questions);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === selectedQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnsweredQuestions(answeredQuestions + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const progress = selectedQuestions.length > 0 ? ((answeredQuestions) / selectedQuestions.length) * 100 : 0;

  if (!router.isReady) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(167, 139, 250, 0.2)",
          borderTop: "3px solid #a78bfa",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / selectedQuestions.length) * 100;
    const passed = percentage >= 70;

    return (
      <Layout>
        <div style={{ minHeight: "100vh", padding: "6rem 1.5rem" }}>
          <Head>
            <title>Quiz Results | Cehpoint Intern Assessment</title>
          </Head>

          <div className="container" style={{ maxWidth: "700px" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium"
              style={{ padding: "3rem 2.5rem", textAlign: "center" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "0 auto 2rem",
                  background: passed 
                    ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem"
                }}
              >
                {passed ? "✓" : "📚"}
              </motion.div>

              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "var(--text)"
              }}>
                {passed ? "Excellent Work!" : "Good Effort!"}
              </h1>

              <p style={{
                fontSize: "1.25rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem"
              }}>
                You scored {score} out of {selectedQuestions.length} ({Math.round(percentage)}%)
              </p>

              <div style={{
                background: passed 
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(245, 158, 11, 0.1)",
                border: `1px solid ${passed ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem",
                textAlign: "left"
              }}>
                <p style={{ 
                  fontSize: "1rem", 
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {passed 
                    ? "Great job! You have a solid understanding of Cehpoint's technologies and sales strategies. You're ready to continue with your application."
                    : "You're on the right track! We recommend reviewing the Sales Excellence Guide again to strengthen your knowledge before continuing with your application."}
                </p>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <motion.button
                  onClick={() => router.push('/sales-guide')}
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: "0.875rem 1.75rem" }}
                >
                  Review Guide
                </motion.button>
                <motion.button
                  onClick={() => {
                    setQuizCompleted(false);
                    setQuizStarted(false);
                    setSelectedQuestions([]);
                    setScore(0);
                    setAnsweredQuestions(0);
                  }}
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: "0.875rem 1.75rem" }}
                >
                  Retake Quiz
                </motion.button>
                {job && type && (
                  <motion.button
                    onClick={() => router.push(`/questionnaire?job=${encodeURIComponent(job as string)}&type=${type}`)}
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: "0.875rem 1.75rem" }}
                  >
                    Continue Application →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!quizStarted) {
    return (
      <Layout>
        <div style={{ minHeight: "100vh", padding: "6rem 1.5rem" }}>
          <Head>
            <title>Intern Knowledge Quiz | Cehpoint</title>
            <meta name="description" content="Test your knowledge of Cehpoint technologies and sales strategies" />
          </Head>

          <div className="container" style={{ maxWidth: "800px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", marginBottom: "3rem" }}
            >
              <h1 className="display-font gradient-text" style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 700,
                marginBottom: "1rem"
              }}>
                Intern Knowledge Quiz
              </h1>
              <p style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Test your understanding of our technologies and sales strategies
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-premium"
              style={{ padding: "3rem 2.5rem" }}
            >
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "1.5rem"
                }}>
                  Quiz Overview
                </h2>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}>
                  {[
                    "10 randomly selected questions from our knowledge base",
                    "Questions cover technologies, sales strategies, and company philosophy",
                    "Instant feedback on each answer with explanations",
                    "70% passing score recommended before continuing application",
                    "You can retake the quiz as many times as you need"
                  ].map((item, index) => (
                    <li key={index} style={{
                      fontSize: "1.05rem",
                      color: "var(--text-secondary)",
                      paddingLeft: "1.75rem",
                      position: "relative"
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--primary-light)"
                      }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={startQuiz}
                className="btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "1.25rem",
                  fontSize: "1.15rem"
                }}
              >
                Start Quiz →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "6rem 1.5rem" }}>
        <Head>
          <title>Question {currentQuestionIndex + 1} of {selectedQuestions.length} | Intern Quiz</title>
        </Head>

        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Progress Bar */}
          <div style={{
            width: "100%",
            height: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
            marginBottom: "2rem",
            overflow: "hidden"
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)"
              }}
            />
          </div>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ 
              fontSize: "0.95rem", 
              color: "var(--text-muted)",
              marginBottom: "0.5rem"
            }}>
              Question {currentQuestionIndex + 1} of {selectedQuestions.length}
            </p>
            <span style={{
              display: "inline-block",
              padding: "0.375rem 0.875rem",
              background: "rgba(167, 139, 250, 0.15)",
              border: "1px solid rgba(167, 139, 250, 0.3)",
              borderRadius: "20px",
              fontSize: "0.85rem",
              color: "var(--primary-light)"
            }}>
              {currentQuestion.category}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="card-premium"
              style={{ padding: "3rem 2.5rem" }}
            >
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "2.5rem",
                lineHeight: 1.5
              }}>
                {currentQuestion.question}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const showCorrect = showFeedback && isCorrect;
                  const showIncorrect = showFeedback && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className="btn btn-secondary"
                      whileHover={{ scale: showFeedback ? 1 : 1.01, x: showFeedback ? 0 : 5 }}
                      whileTap={{ scale: showFeedback ? 1 : 0.99 }}
                      style={{
                        padding: "1.25rem 1.5rem",
                        fontSize: "1.05rem",
                        textAlign: "left",
                        background: showCorrect 
                          ? "rgba(16, 185, 129, 0.15)"
                          : showIncorrect 
                          ? "rgba(239, 68, 68, 0.15)"
                          : isSelected
                          ? "rgba(167, 139, 250, 0.15)"
                          : "rgba(255, 255, 255, 0.03)",
                        border: showCorrect
                          ? "1px solid rgba(16, 185, 129, 0.4)"
                          : showIncorrect
                          ? "1px solid rgba(239, 68, 68, 0.4)"
                          : isSelected
                          ? "1px solid rgba(167, 139, 250, 0.4)"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        cursor: showFeedback ? "default" : "pointer",
                        position: "relative",
                        paddingRight: "3rem"
                      }}
                    >
                      {option}
                      {showCorrect && (
                        <span style={{
                          position: "absolute",
                          right: "1.5rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "1.5rem",
                          color: "#10B981"
                        }}>✓</span>
                      )}
                      {showIncorrect && (
                        <span style={{
                          position: "absolute",
                          right: "1.5rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "1.5rem",
                          color: "#ef4444"
                        }}>✗</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: selectedAnswer === currentQuestion.correctAnswer
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                    border: selectedAnswer === currentQuestion.correctAnswer
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : "1px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    marginBottom: "1.5rem"
                  }}
                >
                  <p style={{
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    <strong style={{
                      color: selectedAnswer === currentQuestion.correctAnswer ? "#10B981" : "#F59E0B"
                    }}>
                      {selectedAnswer === currentQuestion.correctAnswer ? "Correct! " : "Not quite. "}
                    </strong>
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}

              {showFeedback && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleNext}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "1.15rem",
                    fontSize: "1.1rem"
                  }}
                >
                  {currentQuestionIndex < selectedQuestions.length - 1 ? "Next Question →" : "View Results →"}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default InternQuiz;
