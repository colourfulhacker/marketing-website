import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import Link from "next/link";

const Terms: NextPage = () => {
  return (
    <Layout>
      <div style={{ minHeight: "100vh", background: "#0A0A0F", position: "relative" }}>
        <Head>
          <title>Terms & Conditions | Cehpoint</title>
          <meta name="viewport" content="width=1024" />
          <meta name="robots" content="index, follow" />
        </Head>

        <motion.div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
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

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 20px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              fontSize: "14px",
              marginBottom: "30px"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "48px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #EC4899 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "20px"
              }}
            >
              Terms & Conditions
            </h1>
            <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px", marginBottom: "40px" }}>
              Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                borderRadius: "16px",
                padding: "40px",
                backdropFilter: "blur(20px)"
              }}
            >
              <Section title="Agreement to Terms">
                <p>
                  By accessing and using the Cehpoint recruitment platform, you agree to be bound by these 
                  Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                </p>
              </Section>

              <Section title="Eligibility">
                <p>To use our recruitment services, you must:</p>
                <ul>
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into employment agreements</li>
                  <li>Provide accurate and truthful information in all applications</li>
                  <li>Demonstrate a commitment to results-driven performance and value creation</li>
                </ul>
              </Section>

              <Section title="Application Process">
                <p><strong>Submission:</strong></p>
                <p>
                  When you submit an application through our platform, you certify that all information 
                  provided is accurate, complete, and up-to-date. False or misleading information may 
                  result in immediate disqualification.
                </p>
                <p style={{ marginTop: "15px" }}><strong>Position-Specific Assessment:</strong></p>
                <p>
                  Each position has a tailored questionnaire designed to evaluate relevant skills and experience. 
                  Your answers are scored to determine your qualification level:
                </p>
                <ul style={{ marginTop: "10px", marginLeft: "20px" }}>
                  <li><strong>70%+ Score:</strong> Highly qualified – proceeds to direct hiring process</li>
                  <li><strong>40-69% Score:</strong> Moderate qualification – offered 15-day probation/internship period</li>
                  <li><strong>Below 40%:</strong> Not currently qualified for the position</li>
                </ul>
              </Section>

              <Section title="Probation & Internship Program">
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(245, 158, 11, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    marginBottom: "15px"
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "600", color: "#F59E0B" }}>
                    ⏱️ 15-Day Probation Period (Unpaid Training)
                  </p>
                </div>
                <p>
                  Candidates who demonstrate potential but lack complete qualifications may be offered a 
                  <strong> 15-day probation/internship period</strong>. This program is designed to:
                </p>
                <ul style={{ marginTop: "10px" }}>
                  <li>Provide intensive training in our products, services, and sales methodologies</li>
                  <li>Offer real-world experience working with actual clients and projects</li>
                  <li>Evaluate candidate performance and cultural fit</li>
                  <li>Bridge skill gaps through mentorship and hands-on learning</li>
                </ul>
                <p style={{ marginTop: "15px" }}><strong>Important Terms:</strong></p>
                <ul style={{ marginTop: "10px" }}>
                  <li><strong>Duration:</strong> 15 calendar days from start date</li>
                  <li><strong>Compensation:</strong> Unpaid training period (investment in your development)</li>
                  <li><strong>Evaluation:</strong> Performance assessed daily with final review on day 15</li>
                  <li><strong>Outcome:</strong> Successful candidates receive full-time employment offers with competitive salaries</li>
                  <li><strong>Voluntary:</strong> Participation is completely voluntary and can be declined</li>
                </ul>
                <p style={{ marginTop: "15px" }}>
                  This probation period is an opportunity for mutual evaluation. We invest time and resources 
                  in your training, while you demonstrate your ability to excel in a results-driven environment.
                </p>
              </Section>

              <Section title="Company Philosophy">
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(124, 58, 237, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    marginBottom: "15px"
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "600", color: "#7C3AED" }}>
                    ⚡ We Value Results, Not Hours
                  </p>
                  <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
                    Cehpoint is a results-driven organization. We seek individuals who come to 
                    <strong> sell products and services</strong>, not simply exchange time for money. 
                    Candidates focused solely on &quot;selling time&quot; will not align with our culture and values.
                  </p>
                </div>
              </Section>

              <Section title="Compensation Structure">
                <p>
                  Our compensation model is <strong>performance-based and target-driven</strong>:
                </p>
                <ul>
                  <li>Base salary + performance incentives</li>
                  <li>Rewards tied to sales targets and client acquisition</li>
                  <li>Growth opportunities based on demonstrated results</li>
                  <li>Transparent salary calculations based on your skills and achievements</li>
                </ul>
                <p style={{ marginTop: "15px" }}>
                  The salary calculator provides estimates based on industry standards and your qualifications. 
                  Final compensation is determined during the offer stage and may vary based on company requirements.
                </p>
              </Section>

              <Section title="Data Handling">
                <p>
                  All application data is transmitted securely using base64 encoding to prevent tampering. 
                  Your information is handled in accordance with our <Link href="/privacy-policy" style={{ color: "#7C3AED", textDecoration: "underline" }}>Privacy Policy</Link>.
                </p>
              </Section>

              <Section title="WhatsApp Communication">
                <p>
                  By submitting your application, you consent to receive communication via WhatsApp 
                  at the number +91 90911 56095. This may include:
                </p>
                <ul>
                  <li>Application status updates</li>
                  <li>Interview scheduling</li>
                  <li>Additional information requests</li>
                  <li>Offer letters and onboarding details</li>
                </ul>
              </Section>

              <Section title="Intellectual Property">
                <p>
                  All content on this platform, including design, text, graphics, and software, is the 
                  property of Cehpoint and protected by intellectual property laws. Unauthorized use, 
                  reproduction, or distribution is prohibited.
                </p>
              </Section>

              <Section title="Limitation of Liability">
                <p>
                  Cehpoint strives to maintain accurate information on this platform. However, we do not 
                  guarantee employment outcomes or specific salary offers. The salary calculator provides 
                  estimates only and should not be considered binding commitments.
                </p>
              </Section>

              <Section title="Termination">
                <p>
                  We reserve the right to reject applications or terminate access to our platform at our 
                  discretion, particularly in cases of:
                </p>
                <ul>
                  <li>Providing false or misleading information</li>
                  <li>Misalignment with our company values and culture</li>
                  <li>Violation of these terms and conditions</li>
                  <li>Inappropriate or unprofessional conduct</li>
                </ul>
              </Section>

              <Section title="Changes to Terms">
                <p>
                  We may update these Terms and Conditions periodically. Continued use of our platform 
                  after changes are posted constitutes acceptance of the modified terms.
                </p>
              </Section>

              <Section title="Governing Law">
                <p>
                  These Terms and Conditions are governed by the laws of India. Any disputes shall be 
                  subject to the exclusive jurisdiction of courts in West Bengal, India.
                </p>
              </Section>

              <Section title="Contact Information">
                <p>
                  For questions regarding these Terms and Conditions, please contact us:
                </p>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    background: "rgba(236, 72, 153, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(236, 72, 153, 0.2)"
                  }}
                >
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>WhatsApp:</strong> +91 90911 56095
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Location:</strong> West Bengal, India
                  </p>
                </div>
              </Section>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "35px" }}>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "24px",
          fontWeight: "600",
          color: "#fff",
          marginBottom: "15px"
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "15px",
          lineHeight: "1.8"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Terms;
