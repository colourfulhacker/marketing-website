import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Confirmation: NextPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    if (!router.isReady) return;
    
    const { message } = router.query;
    
    if (!message || typeof message !== 'string') {
      router.push('/');
      return;
    }
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const whatsappNumber = "919091156095";
          const encodedMessage = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
          window.location.href = whatsappUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [router.isReady, router.query, router]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Head>
        <title>Application Submitted | Cehpoint</title>
        <meta name="viewport" content="width=1024" />
        <meta name="robots" content="noindex" />
      </Head>

      <motion.div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none"
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <main style={{ 
        padding: "4rem 1.5rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 2
      }}>
        <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.2
            }}
            style={{ marginBottom: "2.5rem" }}
          >
            <div style={{
              width: "120px",
              height: "120px",
              margin: "0 auto",
              background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px rgba(124, 58, 237, 0.4), 0 0 80px rgba(236, 72, 153, 0.3)",
              position: "relative"
            }}>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  border: "3px solid rgba(167, 139, 250, 0.4)",
                  borderRadius: "50%"
                }}
              />
              <motion.svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.path 
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h1 className="display-font gradient-text" style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              letterSpacing: "-0.03em",
              lineHeight: 1.1
            }}>
              You&apos;re Almost Ready to Join Us!
            </h1>
            
            <p style={{
              fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 2.5rem"
            }}>
              Thank you for completing your application! We&apos;re excited about your interest in joining Cehpoint.
            </p>

            <div className="card-premium" style={{
              padding: "2.5rem",
              marginBottom: "2.5rem",
              maxWidth: "500px",
              margin: "0 auto 2.5rem"
            }}>
              <h2 style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "var(--text)"
              }}>
                Next Step
              </h2>
              <p style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: 1.7
              }}>
                You&apos;ll be redirected to WhatsApp to submit your application. Please send the pre-filled message to complete your application process.
              </p>
              
              <motion.div
                style={{
                  fontSize: "4rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "1rem"
                }}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {countdown}
              </motion.div>
              
              <p style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)"
              }}>
                Redirecting to WhatsApp...
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                fontSize: "0.95rem",
                color: "var(--text-muted)"
              }}
            >
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--success)"
              }} />
              Your application data is securely encoded
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;