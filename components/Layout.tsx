import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer
        style={{
          background: "linear-gradient(180deg, rgba(15, 15, 20, 0.8) 0%, rgba(10, 10, 15, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(124, 58, 237, 0.2)",
          padding: "60px 20px 30px",
          marginTop: "auto"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
              marginBottom: "40px"
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "24px",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "15px"
                }}
              >
                Cehpoint
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                Empowering professionals to transform their careers through innovation, 
                results-driven performance, and genuine value creation.
              </p>
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    background: "rgba(124, 58, 237, 0.1)",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    borderRadius: "8px"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#7C3AED", fontSize: "13px", fontWeight: "600" }}>
                    Trusted Platform
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "20px"
                }}
              >
                Quick Links
              </h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}>
                  Careers
                </Link>
                <Link 
                  href="/sales-guide" 
                  style={{ 
                    color: "rgba(255, 255, 255, 0.6)", 
                    fontSize: "14px", 
                    textDecoration: "none", 
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  🎓 Sales Excellence Guide
                </Link>
                <Link 
                  href="/partner-program" 
                  style={{ 
                    color: "rgba(255, 255, 255, 0.6)", 
                    fontSize: "14px", 
                    textDecoration: "none", 
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  🤝 Partner Program
                  <span style={{
                    fontSize: "10px",
                    padding: "2px 6px",
                    background: "linear-gradient(135deg, #10B981 0%, #7C3AED 100%)",
                    borderRadius: "4px",
                    color: "white",
                    fontWeight: "700"
                  }}>
                    NEW
                  </span>
                </Link>
                <Link href="/salary-calculator" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}>
                  Salary Calculator
                </Link>
                <a 
                  href="https://outreach-ai.cehpoint.co.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: "rgba(255, 255, 255, 0.6)", 
                    fontSize: "14px", 
                    textDecoration: "none", 
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  OutreachAI
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link href="/privacy-policy" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}>
                  Privacy Policy
                </Link>
                <Link href="/terms" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}>
                  Terms & Conditions
                </Link>
              </nav>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "20px"
                }}
              >
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href="https://wa.me/919091156095"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "14px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "12px", margin: 0 }}>
                  📍 West Bengal, India
                </p>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "20px"
                }}
              >
                Our Mission
              </h4>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "13px", lineHeight: "1.6" }}>
                We believe in results over hours. Join a team that values 
                <strong style={{ color: "#7C3AED" }}> value creation</strong> and 
                <strong style={{ color: "#EC4899" }}> entrepreneurial spirit</strong>.
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "30px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "13px", margin: 0 }}>
              © {currentYear} Cehpoint. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255, 255, 255, 0.3)",
                  padding: "6px 12px",
                  background: "rgba(124, 58, 237, 0.1)",
                  borderRadius: "6px",
                  border: "1px solid rgba(124, 58, 237, 0.2)"
                }}
              >
                🔒 Secure Platform
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255, 255, 255, 0.3)",
                  padding: "6px 12px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "6px",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}
              >
                ✓ Verified Employer
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
