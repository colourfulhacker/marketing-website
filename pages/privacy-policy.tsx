import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import Link from "next/link";

const PrivacyPolicy: NextPage = () => {
  return (
    <Layout>
      <div style={{ minHeight: "100vh", background: "#0A0A0F", position: "relative" }}>
        <Head>
          <title>Privacy Policy | Cehpoint</title>
          <meta name="viewport" content="width=1024" />
          <meta name="robots" content="index, follow" />
        </Head>

        <motion.div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
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
                background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "20px"
              }}
            >
              Privacy Policy
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
              <Section title="Our Commitment">
                <p>
                  At Cehpoint, we are committed to protecting your privacy and handling your personal 
                  information with the highest standards of security and transparency. This Privacy Policy 
                  explains how we collect, use, and safeguard your data when you interact with our recruitment platform.
                </p>
              </Section>

              <Section title="Information We Collect">
                <p><strong>Personal Information:</strong></p>
                <ul>
                  <li>Name, email address, and contact details</li>
                  <li>Professional experience and qualifications</li>
                  <li>Responses to questionnaire and assessment forms</li>
                  <li>Salary expectations and career preferences</li>
                </ul>
                <p style={{ marginTop: "15px" }}><strong>Technical Information:</strong></p>
                <ul>
                  <li>Device information and browser type</li>
                  <li>IP address and location data (country/state level)</li>
                  <li>Usage analytics and interaction patterns</li>
                </ul>
              </Section>

              <Section title="How We Use Your Information">
                <p>We use the collected information for the following purposes:</p>
                <ul>
                  <li><strong>Recruitment Processing:</strong> To evaluate your application and match you with suitable positions</li>
                  <li><strong>Communication:</strong> To contact you via WhatsApp or email regarding your application status</li>
                  <li><strong>Platform Improvement:</strong> To enhance user experience and optimize our services</li>
                  <li><strong>Compliance:</strong> To meet legal and regulatory requirements</li>
                </ul>
              </Section>

              <Section title="Data Security">
                <p>
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul>
                  <li>End-to-end encryption for sensitive data transmission</li>
                  <li>Secure base64 encoding for application data to prevent tampering</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                </ul>
              </Section>

              <Section title="Data Sharing">
                <p>
                  We <strong>do not sell</strong> your personal information to third parties. We may share 
                  your data only in the following circumstances:
                </p>
                <ul>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                </ul>
              </Section>

              <Section title="Your Rights">
                <p>You have the following rights regarding your personal data:</p>
                <ul>
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate data</li>
                  <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                  <li><strong>Objection:</strong> Opt-out of certain data processing activities</li>
                </ul>
              </Section>

              <Section title="Cookies and Tracking">
                <p>
                  Our platform uses minimal cookies for essential functionality. We do not use third-party 
                  tracking cookies for advertising purposes. You can control cookie settings through your browser preferences.
                </p>
              </Section>

              <Section title="Contact Us">
                <p>
                  If you have any questions or concerns about this Privacy Policy or how we handle your data, 
                  please contact us:
                </p>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    background: "rgba(124, 58, 237, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(124, 58, 237, 0.2)"
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

export default PrivacyPolicy;
