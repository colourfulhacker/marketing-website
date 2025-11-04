import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

interface QuizQuestion {
  id: number;
  question?: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const allQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: "A potential client runs an e-commerce store with 50,000+ monthly visitors. Their current website loads slowly and they're losing sales.",
    question: "What's your recommended approach to win this client?",
    options: [
      "Offer them the cheapest hosting solution to compete on price",
      "Recommend Next.js with Vercel hosting, emphasizing faster load times lead to higher conversion rates and better Google rankings",
      "Suggest they stick with their current setup",
      "Tell them to hire more developers"
    ],
    correctAnswer: 1,
    explanation: "Position Next.js + Vercel as a competitive advantage: faster sites convert better and rank higher. Link the technology to their business goal (more sales) rather than just features.",
    category: "Sales Scenario"
  },
  {
    id: 2,
    scenario: "A healthcare startup needs to store patient data securely and wants full control over their database.",
    question: "Which solution should you recommend and why?",
    options: [
      "Firebase because it's from Google",
      "Excel spreadsheets for simplicity",
      "Supabase with PostgreSQL - emphasize enterprise-grade security, full data ownership, and HIPAA compliance readiness",
      "Any cheap database solution"
    ],
    correctAnswer: 2,
    explanation: "Healthcare requires enterprise-grade security and compliance. Supabase offers full data ownership, no vendor lock-in, and can be configured for HIPAA compliance - perfect for healthcare.",
    category: "Sales Scenario"
  },
  {
    id: 3,
    scenario: "A prospect says 'We don't have budget for expensive tech solutions right now.'",
    question: "How do you handle this objection?",
    options: [
      "Offer a big discount immediately",
      "Walk away - they're not qualified",
      "Use a value-first approach: Offer a free technology assessment, show ROI calculator demonstrating cost of NOT upgrading vs investment",
      "Tell them to come back when they have budget"
    ],
    correctAnswer: 2,
    explanation: "Never compete on price alone. Quantify the cost of inaction (lost sales, security risks, downtime) vs the investment. Offer free assessment to demonstrate value first.",
    category: "Objection Handling"
  },
  {
    id: 4,
    scenario: "A manufacturing company wants to reduce equipment downtime but doesn't understand IoT technology.",
    question: "How do you position IoT to this prospect?",
    options: [
      "Explain all the technical details of IoT sensors",
      "Send them technical documentation",
      "Focus on business outcomes: 'Imagine getting alerts before equipment fails, reducing unexpected downtime by 40% and saving $X per year'",
      "Tell them it's too complex for them"
    ],
    correctAnswer: 2,
    explanation: "Lead with industry-specific outcomes. Manufacturing cares about uptime and cost savings. Translate technical features into measurable business benefits they understand.",
    category: "Consultative Selling"
  },
  {
    id: 5,
    scenario: "You're in a meeting with a CFO who only cares about ROI. They ask 'Why should we invest in cloud migration?'",
    question: "What's your best response?",
    options: [
      "Cloud is the future, everyone's doing it",
      "It's more secure and scalable",
      "Quantify it: 'Companies typically see 30% reduction in IT costs, eliminate hardware refresh cycles, and enable remote work. Based on your current infrastructure, we estimate $X savings in year one.'",
      "Recommend they research it themselves"
    ],
    correctAnswer: 2,
    explanation: "CFOs speak in numbers. Quantify savings (infrastructure costs, maintenance, downtime), show ROI timeline, and tie it to strategic goals like remote work capabilities.",
    category: "C-Level Communication"
  },
  {
    id: 6,
    scenario: "A prospect has been researching for months and is overwhelmed with options. They're experiencing analysis paralysis.",
    question: "What's your strategy to move them forward?",
    options: [
      "Add more options to consider",
      "Pressure them to decide quickly",
      "Simplify the decision: Focus on their top 3 business priorities, recommend ONE clear solution path, offer a small pilot project to reduce risk",
      "Tell them to take their time"
    ],
    correctAnswer: 2,
    explanation: "Analysis paralysis needs simplification. Identify their core priorities, recommend a focused solution, and offer a low-risk way to start (pilot project or phased approach).",
    category: "Sales Psychology"
  },
  {
    id: 7,
    scenario: "A client's website was hacked last month. They need a security solution but don't know where to start.",
    question: "How do you approach this hot prospect?",
    options: [
      "Sell them the most expensive security package",
      "Conduct a free security audit, identify specific vulnerabilities, then recommend layered security: SSL, WAF, regular backups, and IAM",
      "Send them a generic proposal",
      "Tell them about all security technologies"
    ],
    correctAnswer: 1,
    explanation: "A recent breach creates urgency. Lead with a free security audit (value-first), identify their specific vulnerabilities, then prescribe a comprehensive solution. Use the breach cost to justify investment.",
    category: "Consultative Selling"
  },
  {
    id: 8,
    scenario: "You're presenting to a team of 5 decision-makers with different priorities: CEO (growth), CTO (technology), CFO (costs), CMO (marketing), and COO (operations).",
    question: "How do you structure your presentation?",
    options: [
      "Focus only on the CEO since they make final decisions",
      "Present only technical features",
      "Address each stakeholder: CEO - growth enablement, CTO - scalability, CFO - ROI, CMO - better digital marketing, COO - operational efficiency",
      "Keep it generic to appeal to everyone"
    ],
    correctAnswer: 2,
    explanation: "Multi-stakeholder deals require addressing each person's priorities. Build consensus by showing how your solution benefits each role specifically - everyone needs a win.",
    category: "Complex Sales"
  },
  {
    id: 9,
    scenario: "A prospect is comparing your Next.js solution to a competitor's WordPress solution that's $5000 cheaper.",
    question: "How do you compete without dropping your price?",
    options: [
      "Match their price immediately",
      "Bad-mouth the competitor",
      "Emphasize long-term value: faster performance, better SEO, lower maintenance costs, and scalability. Show 3-year TCO where Next.js comes out ahead",
      "Say price doesn't matter"
    ],
    correctAnswer: 2,
    explanation: "Compete on value, not price. Show Total Cost of Ownership (TCO) over 3 years including maintenance, plugins, security updates. Position Next.js as an investment that pays back through performance and lower ongoing costs.",
    category: "Competitive Positioning"
  },
  {
    id: 10,
    scenario: "A SaaS startup's growth has stalled. They're stuck at 1,000 users and can't scale their marketing.",
    question: "How do you position our services to help them break through?",
    options: [
      "Offer generic digital marketing services",
      "Tell them to hire more salespeople",
      "Diagnose the bottleneck: Is it product-market fit, conversion funnel, or reach? Then prescribe targeted solution: SEO for reach, conversion optimization for funnel, or analytics for insights",
      "Sell them everything at once"
    ],
    correctAnswer: 2,
    explanation: "Growth stagnation needs diagnosis first. Ask questions to find the real bottleneck, then prescribe a focused solution. Avoid one-size-fits-all - show you understand their specific challenge.",
    category: "Growth Strategy"
  },
  {
    id: 11,
    scenario: "During discovery, you learn the prospect had a bad experience with a previous agency that overpromised and underdelivered.",
    question: "How do you rebuild trust?",
    options: [
      "Promise you're different",
      "Offer the lowest price to win them over",
      "Set realistic expectations upfront, show case studies with measurable results, offer milestone-based deliverables with clear KPIs",
      "Criticize the previous agency"
    ],
    correctAnswer: 2,
    explanation: "Trust is rebuilt through transparency and proof. Set conservative expectations, show verifiable results from past clients, and structure the engagement to prove value incrementally.",
    category: "Trust Building"
  },
  {
    id: 12,
    scenario: "A prospect asks for references from companies in their exact industry and size. You don't have an exact match.",
    question: "How do you handle this?",
    options: [
      "Make up a similar reference",
      "Say you can't help them",
      "Share relevant case studies from adjacent industries with similar challenges, explain transferable solutions, and offer to do a small pilot to prove value",
      "Tell them references don't matter"
    ],
    correctAnswer: 2,
    explanation: "Focus on problem similarity, not industry. A retail company solving inventory management is relevant to a manufacturer with the same challenge. Offer a pilot to build confidence.",
    category: "Proof Building"
  },
  {
    id: 13,
    scenario: "You're at a networking event and meet a potential high-value client. They seem interested but are talking to several vendors.",
    question: "What's your follow-up strategy?",
    options: [
      "Send a generic email next week",
      "Wait for them to contact you",
      "Send personalized follow-up within 24 hours referencing your conversation, share one valuable resource (not a pitch), and propose specific next step",
      "Add them on LinkedIn and wait"
    ],
    correctAnswer: 2,
    explanation: "Timing and value matter in follow-up. Personalize based on your conversation, provide immediate value (article, case study, insight), and propose a clear, low-commitment next step (call, coffee, demo).",
    category: "Networking & Follow-up"
  },
  {
    id: 14,
    scenario: "A client wants to launch a mobile app, website, and backend system all at once within 3 months on a limited budget.",
    question: "How do you manage their expectations?",
    options: [
      "Say yes to everything to win the deal",
      "Tell them it's impossible and walk away",
      "Recommend phased approach: MVP web app first (month 1-2), then mobile (month 3-4), showing this reduces risk and allows learning from users",
      "Refer them to a cheaper competitor"
    ],
    correctAnswer: 2,
    explanation: "Unrealistic expectations lead to failed projects. Educate on MVP approach: launch core features fast, gather user feedback, iterate. This actually serves the client better and builds long-term trust.",
    category: "Project Scoping"
  },
  {
    id: 15,
    scenario: "You're on a sales call and the prospect keeps bringing up features your competitor has that you don't offer.",
    question: "What's your best response?",
    options: [
      "Promise to build those features soon",
      "Argue that those features aren't important",
      "Redirect to outcomes: 'That's a valid feature. What business problem are you trying to solve with it? Let me show how we achieve that outcome differently.'",
      "End the call - they're not a good fit"
    ],
    correctAnswer: 2,
    explanation: "Shift from feature comparison to outcome achievement. Often competitors' specific features are solving a problem you solve differently (possibly better). Focus on the desired outcome, not feature checkbox.",
    category: "Competitive Handling"
  },
  {
    id: 16,
    scenario: "A prospect's decision-making process has dragged on for 4 months. You need to create urgency without being pushy.",
    question: "What's an effective approach?",
    options: [
      "Threaten to raise prices",
      "Tell them the opportunity expires tomorrow",
      "Quantify cost of delay: 'Every month of delay means X lost revenue/efficiency. Competitors moving faster are gaining advantage. Here's a 30-day fast-track plan.'",
      "Keep following up without changing tactics"
    ],
    correctAnswer: 2,
    explanation: "Create urgency through education, not pressure. Quantify the opportunity cost of inaction, reference competitive threats, and offer a concrete plan to accelerate implementation.",
    category: "Deal Acceleration"
  },
  {
    id: 17,
    scenario: "A client is happy with their current solution but it's outdated technology that will cause problems in 1-2 years.",
    question: "How do you position the need for change?",
    options: [
      "Tell them their current solution is terrible",
      "Wait until they have problems and reach out",
      "Show the future gap: 'Your current solution works today, but here are 3 risks in 12-24 months [scalability, security, talent]. Here's a migration path that minimizes disruption.'",
      "Offer a huge discount to switch now"
    ],
    correctAnswer: 2,
    explanation: "Acknowledge what's working, then paint the future risk (technical debt, security, hiring challenges). Position yourself as helping them avoid a crisis, not creating one.",
    category: "Change Management"
  },
  {
    id: 18,
    scenario: "You lost a deal to a competitor 6 months ago. You just heard they're unhappy with the results.",
    question: "How do you re-engage?",
    options: [
      "Say 'I told you so'",
      "Pitch them again with the same approach",
      "Reach out with empathy: 'I heard you might be facing challenges. I'd like to understand what happened and see if we can help turn things around - no pressure to commit.'",
      "Wait for them to come crawling back"
    ],
    correctAnswer: 2,
    explanation: "Lost-then-unhappy prospects are high-value opportunities. Lead with empathy (not smugness), offer to help diagnose problems, position as a rescue mission. They're pre-qualified and educated on the need.",
    category: "Win-Back Strategy"
  },
  {
    id: 19,
    scenario: "A prospect says 'We need to think about it' at the end of your presentation.",
    question: "What's your next move?",
    options: [
      "Say 'Okay, let me know' and wait",
      "Pressure them to decide now",
      "Uncover the real concern: 'That's completely fair. Help me understand - what specific aspects do you need to think about? Budget, timing, technical fit, or something else?'",
      "Send them more information and hope for the best"
    ],
    correctAnswer: 2,
    explanation: "'Think about it' is often code for an unspoken objection. Politely dig deeper to uncover the real concern (budget, authority, fit, timing), then address it specifically.",
    category: "Objection Handling"
  },
  {
    id: 20,
    scenario: "You're presenting to a very technical CTO who keeps drilling into implementation details and edge cases.",
    question: "How do you handle this conversation?",
    options: [
      "Fake knowledge you don't have",
      "Tell them they're overthinking it",
      "Acknowledge their expertise: 'Those are great technical questions. Let me connect you with our technical architect for a deep dive, while we align on business outcomes.'",
      "Try to answer every technical detail yourself"
    ],
    correctAnswer: 2,
    explanation: "Know when to bring in technical expertise. Acknowledge their expertise, commit to thorough technical review with the right resource, while you stay focused on business value and decision-making process.",
    category: "Technical Selling"
  },
  {
    id: 21,
    scenario: "A small business owner says 'I don't understand all this technical stuff, I just want something that works.'",
    question: "How do you communicate with this prospect?",
    options: [
      "Explain all the technical details so they understand",
      "Tell them to hire someone technical",
      "Translate to business language: 'Think of it like this - you'll get more customers finding you online, your site will load faster, and you'll spend less time on maintenance.'",
      "Send them documentation to read"
    ],
    correctAnswer: 2,
    explanation: "Match your communication to their level. Small business owners care about results, not architecture. Use analogies, focus on business outcomes, and simplify without being condescending.",
    category: "Communication Adaptation"
  },
  {
    id: 22,
    scenario: "During implementation, scope creep is happening - the client keeps adding 'small' requests outside the original agreement.",
    question: "How do you handle this professionally?",
    options: [
      "Do all the extra work to keep them happy",
      "Refuse everything firmly",
      "Document each request, explain impact on timeline/budget, offer choices: 'We can do this as change order, defer to Phase 2, or find a simpler alternative.'",
      "Complain about the client to your team"
    ],
    correctAnswer: 2,
    explanation: "Scope creep kills projects. Be professional but firm: acknowledge the request, show the impact, offer options. This protects both parties and maintains trust through transparency.",
    category: "Client Management"
  },
  {
    id: 23,
    scenario: "A prospect found your LinkedIn article about cybersecurity and reached out. This is an inbound lead.",
    question: "What's your discovery approach?",
    options: [
      "Immediately pitch your cybersecurity services",
      "Send them pricing and wait",
      "Ask about their specific cybersecurity concerns, what prompted them to reach out now, and understand their current state before recommending anything",
      "Schedule a demo right away"
    ],
    correctAnswer: 2,
    explanation: "Inbound leads are warmer but still need discovery. Understand what triggered their search, their specific pain, budget, and timeline before prescribing. They came to you - learn why.",
    category: "Inbound Sales"
  },
  {
    id: 24,
    scenario: "You're in the final stages of a deal. The prospect asks 'Can you throw in this extra service for free to close the deal?'",
    question: "How do you respond?",
    options: [
      "Say yes to close the deal",
      "Say no firmly and risk losing the deal",
      "Reframe value: 'I want to make sure you're successful. That service is worth $X and takes significant resources. How about we include it at a reduced rate or phase it into month 2?'",
      "Get frustrated with them"
    ],
    correctAnswer: 2,
    explanation: "Protect your value while staying collaborative. Don't give away services free (sets bad precedent), but offer creative alternatives that work for both sides. Trade value for value.",
    category: "Negotiation"
  },
  {
    id: 25,
    scenario: "A client's project is going well, but you notice they could benefit from an additional service you offer. You want to upsell.",
    question: "What's the best approach?",
    options: [
      "Send them a sales pitch immediately",
      "Wait until the current project is done",
      "Frame it as their success: 'Based on your results so far, I see an opportunity to amplify them. Have you considered [service]? Here's how it builds on what's working.'",
      "Add it to their bill without asking"
    ],
    correctAnswer: 2,
    explanation: "Best upsells come from client success. Show how additional service amplifies current results, use data from existing work, and position as natural next step in their growth journey.",
    category: "Account Growth"
  },
  {
    id: 26,
    scenario: "A competitor is spreading negative information about your company in the market.",
    question: "How do you respond?",
    options: [
      "Spread negative information about them",
      "Ignore it completely",
      "Focus on your strengths: Let your client results speak for themselves, address concerns proactively with prospects, and take the high road professionally",
      "Confront them publicly"
    ],
    correctAnswer: 2,
    explanation: "Negative tactics backfire. Stay professional, let results speak, address concerns factually when asked, and focus on building your reputation through great work and client advocacy.",
    category: "Reputation Management"
  },
  {
    id: 27,
    scenario: "You're working on a deal with a 6-month sales cycle. How do you stay engaged without being annoying?",
    options: [
      "Call them every week to check in",
      "Go silent until they're ready",
      "Nurture strategically: Share relevant content monthly, comment on their company news, provide industry insights, and check in quarterly on their decision timeline",
      "Send the same follow-up email repeatedly"
    ],
    correctAnswer: 2,
    explanation: "Long sales cycles need strategic nurture. Add value with each touchpoint (insights, articles, introductions), stay visible without being pushy, and respect their timeline while remaining top-of-mind.",
    category: "Pipeline Management"
  },
  {
    id: 28,
    scenario: "A prospect says 'Your competitor quoted us 40% less.' You know the competitor cuts corners on quality.",
    question: "What's your response?",
    options: [
      "Match their price immediately",
      "Tell them the competitor is terrible",
      "Educate on value difference: 'Price differences usually reflect scope or quality differences. Let's compare exactly what's included, support levels, and long-term costs.'",
      "Walk away from the deal"
    ],
    correctAnswer: 2,
    explanation: "Don't compete on price or trash competitors. Educate on what drives price differences: scope, quality, support, experience. Help them make an informed decision on value, not just cost.",
    category: "Price Objections"
  },
  {
    id: 29,
    scenario: "A client completed a successful project with you 6 months ago but hasn't needed additional services. You want to maintain the relationship.",
    question: "What's your approach?",
    options: [
      "Only reach out when you want to sell something",
      "Stop contacting them",
      "Maintain relationship: Check in on how their results are going, share relevant insights for their business, make introductions to helpful contacts, be genuinely helpful",
      "Add them to a generic newsletter"
    ],
    correctAnswer: 2,
    explanation: "Best clients come from strong relationships. Stay in touch with genuine value: check their success, share relevant insights, make helpful intros. When they need services again, you're top-of-mind.",
    category: "Relationship Management"
  },
  {
    id: 30,
    scenario: "You're on a discovery call and realize your service isn't the right fit for this prospect's needs.",
    question: "What's the ethical approach?",
    options: [
      "Sell to them anyway - you need the revenue",
      "Just end the call abruptly",
      "Be honest: 'Based on what you've shared, I don't think we're the best fit. Here's why, and here's who I'd recommend instead.' Build long-term reputation.",
      "Keep them on the hook just in case"
    ],
    correctAnswer: 2,
    explanation: "Honesty builds reputation. If you're not the right fit, say so and refer them to someone who is. They'll remember your integrity and may refer others or come back when they are ready.",
    category: "Professional Ethics"
  },
  {
    id: 31,
    scenario: "You need to cold email a VP of Marketing at a target company. You have one chance to get their attention.",
    question: "What's your email strategy?",
    options: [
      "Generic template about your services",
      "Long email explaining everything you do",
      "Personalized value: Reference their specific challenge (from research), show how you solved it for similar company, ask one question to start dialogue. Keep it under 75 words.",
      "Ask for 30 minutes of their time"
    ],
    correctAnswer: 2,
    explanation: "Cold emails need extreme personalization and brevity. Research their specific challenges, show relevant proof, and make it easy to respond with one clear question. Respect their time.",
    category: "Outbound Prospecting"
  },
  {
    id: 32,
    scenario: "During a presentation, you realize you made an error in the ROI calculation you're showing.",
    question: "How do you handle it?",
    options: [
      "Hope they don't notice and continue",
      "Ignore it and correct it later in email",
      "Address it immediately: 'I need to correct something - this number should be X, not Y. Let me recalculate to give you accurate information.'",
      "Blame it on your team"
    ],
    correctAnswer: 2,
    explanation: "Credibility comes from honesty. Admitting mistakes immediately builds more trust than hoping they won't notice. Correct it, move forward professionally, and they'll respect your integrity.",
    category: "Professional Integrity"
  },
  {
    id: 33,
    scenario: "A client is frustrated because a project milestone was delayed by 2 weeks due to their late feedback. They're blaming your team.",
    question: "How do you address this?",
    options: [
      "Blame them for the late feedback",
      "Apologize for everything even though it wasn't your fault",
      "Acknowledge their frustration, review the timeline objectively showing the dependency, focus on solution: 'Let's get back on track. Here's updated timeline if we get feedback by Friday.'",
      "Argue about who's at fault"
    ],
    correctAnswer: 2,
    explanation: "Defuse emotion with facts and solutions. Acknowledge frustration (shows empathy), review facts objectively (shows it's a partnership), focus on moving forward (shows problem-solving).",
    category: "Conflict Resolution"
  },
  {
    id: 34,
    scenario: "You're presenting at a webinar with 100 attendees. Three people are dominating Q&A with very technical questions that aren't relevant to most attendees.",
    question: "How do you manage this?",
    options: [
      "Answer every detailed question to show expertise",
      "Ignore them completely",
      "Acknowledge briefly: 'Great technical question - let's take that offline after the webinar to respect everyone's time. Email me at [email].' Continue with general Q&A.",
      "Tell them they're asking wrong questions"
    ],
    correctAnswer: 2,
    explanation: "Respect everyone's time. Acknowledge technical questions, offer to go deep offline, keep the group focused on broadly relevant content. Follow through with those individuals after.",
    category: "Group Facilitation"
  },
  {
    id: 35,
    scenario: "A prospect mentions they have a tight deadline - they need to launch in 6 weeks. Your typical timeline is 10-12 weeks.",
    question: "How do you respond?",
    options: [
      "Promise 6 weeks to win the deal",
      "Tell them it's impossible and walk away",
      "Offer options: 'Typical timeline is 10-12 weeks for full scope. We could do 6 weeks with reduced scope (MVP) or 8 weeks with accelerated resources at premium rate. What's driving the deadline?'",
      "Refer them to a faster competitor"
    ],
    correctAnswer: 2,
    explanation: "Understand the constraint, offer creative solutions. Maybe an MVP works, maybe they have budget for premium timeline, or maybe the deadline is flexible when you understand the driver. Options create dialogue.",
    category: "Constraints & Trade-offs"
  },
  {
    id: 36,
    scenario: "You're building a business case for a $100K annual contract. The decision committee needs to see ROI to approve.",
    question: "How do you structure the ROI argument?",
    options: [
      "Just show that your service is valuable",
      "Focus on features and deliverables",
      "Quantify impact: Current cost of problem ($X), Expected improvement (Y%), ROI timeline (payback in Z months), Risk of inaction. Make it specific to their numbers.",
      "Tell them to trust that it's worth it"
    ],
    correctAnswer: 2,
    explanation: "Business cases need specifics. Quantify current costs (downtime, inefficiency, lost sales), expected gains, payback period, and opportunity cost of waiting. Use their data when possible.",
    category: "Business Case Building"
  },
  {
    id: 37,
    scenario: "A client asks you to sign an NDA before discussing their project. It's a standard request.",
    question: "What's your approach?",
    options: [
      "Sign it immediately without reading",
      "Refuse to sign any NDAs",
      "Review it professionally: Check for unreasonable terms (too broad scope, excessive duration), consult legal if needed, and sign if reasonable. Show you take their confidentiality seriously.",
      "Tell them NDAs aren't necessary"
    ],
    correctAnswer: 2,
    explanation: "NDAs are common and professional. Review for unreasonable terms (overly broad, perpetual duration), have a lawyer review if complex, and sign if standard. Shows you respect their confidentiality.",
    category: "Legal & Contracts"
  },
  {
    id: 38,
    scenario: "You're in month 3 of a 6-month project. The client wants to add significant new features without extending timeline or budget.",
    question: "What's your response?",
    options: [
      "Say yes to keep the client happy",
      "Refuse immediately",
      "Reset expectations: 'I want to deliver these features. Adding them means we adjust timeline or budget, or deprioritize existing features. Let's review priorities and decide together.'",
      "Work nights and weekends to make it happen"
    ],
    correctAnswer: 2,
    explanation: "Protect project health and your team. Show willingness but explain reality: scope, time, and budget are connected. Empower client to make informed trade-off decisions.",
    category: "Project Management"
  },
  {
    id: 39,
    scenario: "A client's industry is being disrupted by new technology. They don't see it coming yet, but you do.",
    question: "How do you position yourself as a trusted advisor?",
    options: [
      "Wait until they figure it out themselves",
      "Use scare tactics to pressure them",
      "Educate proactively: 'I've been watching trends in your industry. [Disruption] is emerging. Here's what leading companies are doing to prepare. Let's discuss how this affects you.'",
      "Sell them a solution immediately"
    ],
    correctAnswer: 2,
    explanation: "Trusted advisors educate before selling. Share industry insights proactively, show what leaders are doing, help them think strategically. This positions you as partner, not vendor.",
    category: "Strategic Advisory"
  },
  {
    id: 40,
    scenario: "You're negotiating with a procurement department that only cares about getting the lowest price. They're pushing for 30% discount.",
    question: "How do you handle this?",
    options: [
      "Give them the 30% discount",
      "Hold firm at full price no matter what",
      "Shift to value: 'I understand cost control is important. Let's review what's included at this price and the results you'll get. If we reduce price 30%, we'd need to remove X, Y, Z. Is that acceptable?'",
      "Walk away from the negotiation"
    ],
    correctAnswer: 2,
    explanation: "Procurement wants price reduction. Show the value-for-money equation clearly. If they want lower price, show what they lose. Often when they see the trade-offs, they value the original package.",
    category: "Procurement Negotiation"
  },
  {
    id: 41,
    scenario: "You've been nurturing a prospect for 8 months. They just went with a competitor. How do you handle the loss?",
    options: [
      "Give up and move on to the next prospect",
      "Be angry and cut off all communication",
      "Conduct a professional loss analysis: 'Thanks for considering us. To improve, could you share what made [competitor] the better choice? I appreciate any feedback.'",
      "Try to convince them they made the wrong choice"
    ],
    correctAnswer: 2,
    explanation: "Losses are learning opportunities. Thank them professionally, ask for genuine feedback (not to argue, but to improve), and stay in touch. Many deals reopen when the first choice doesn't work out.",
    category: "Loss Management"
  },
  {
    id: 42,
    scenario: "A prospect is ready to sign but asks you to start work before the contract is signed because 'the legal process takes weeks.'",
    question: "What's your professional approach?",
    options: [
      "Start work immediately to show goodwill",
      "Refuse and risk the relationship",
      "Protect both parties: 'I'm excited to start. Let's use a simple interim agreement or Statement of Work while legal reviews the main contract. This protects both of us.'",
      "Do the work and hope they sign eventually"
    ],
    correctAnswer: 2,
    explanation: "Never start work without agreement. Propose interim solutions (SOW, MSA, simple agreement) that protect both parties and allow work to proceed. This shows professionalism, not mistrust.",
    category: "Contract Management"
  },
  {
    id: 43,
    scenario: "Your best sales quarter ever just ended. You exceeded quota by 150%. Next quarter's quota will likely be higher.",
    question: "What's your strategic approach?",
    options: [
      "Relax - you've earned it",
      "Sandbag deals to smooth out next quarter",
      "Build pipeline aggressively now: Success creates momentum. Use this quarter's wins as proof points, ask for referrals from happy clients, and build Q2 pipeline while you have momentum.",
      "Wait for next quarter to start prospecting"
    ],
    correctAnswer: 2,
    explanation: "Great performance creates opportunities. Use wins as social proof, harvest referrals while excitement is high, and build strong pipeline. Momentum compounds - use it strategically.",
    category: "Sales Strategy"
  },
  {
    id: 44,
    scenario: "A client is unhappy with one aspect of your delivered work. They're threatening to withhold payment for the entire project.",
    question: "How do you resolve this?",
    options: [
      "Threaten legal action immediately",
      "Redo all the work for free",
      "Separate issues: 'Let's fix the specific concern you have - that's fair. For the portions you're satisfied with, can we process payment while we resolve this piece?' Show goodwill + protect yourself.",
      "Demand full payment before any fixes"
    ],
    correctAnswer: 2,
    explanation: "Separate the legitimate concern from payment leverage. Commit to fixing real issues (shows partnership), but negotiate fair payment for good work (protects you). Find middle ground.",
    category: "Dispute Resolution"
  },
  {
    id: 45,
    scenario: "You're presenting to a skeptical prospect who's been burned by agencies before. They question everything you say.",
    question: "How do you build credibility?",
    options: [
      "Get defensive and argue with them",
      "Over-promise to overcome their skepticism",
      "Use proof: Share specific case studies, offer to connect them with references, show actual data/results, acknowledge their skepticism as valid and address it with evidence.",
      "Tell them they need to trust you"
    ],
    correctAnswer: 2,
    explanation: "Skepticism needs proof, not promises. Acknowledge their past experience, validate their caution, then provide evidence: case studies, references, data. Let proof build trust, not claims.",
    category: "Credibility Building"
  },
  {
    id: 46,
    scenario: "A prospect says 'Can you send me a proposal?' very early in the conversation before you've done proper discovery.",
    question: "What's your response?",
    options: [
      "Send a generic proposal immediately",
      "Say no and refuse to send anything",
      "Set a boundary: 'I want to send you something valuable. Can we schedule 30 minutes so I understand your specific needs? That way my proposal will be relevant, not generic.'",
      "Send them pricing and hope for the best"
    ],
    correctAnswer: 2,
    explanation: "Premature proposals rarely close deals. Position discovery as serving them better: 'I could send generic info, but a tailored proposal after understanding your needs will be much more valuable.'",
    category: "Discovery Process"
  },
  {
    id: 47,
    scenario: "You're managing 20 active opportunities in various stages. You need to prioritize where to spend your time.",
    question: "How do you prioritize?",
    options: [
      "Spend equal time on all opportunities",
      "Focus only on the biggest deals",
      "Score opportunities: Size × Likelihood × Timeline. Focus on high-score opportunities that are closeable this quarter. Maintain but deprioritize low-score ones.",
      "Work on whichever deals feel easiest"
    ],
    correctAnswer: 2,
    explanation: "Time is your most valuable resource. Score opportunities on multiple factors (size, probability, timeline, strategic fit). Focus energy where you'll get results. Maintain but don't over-invest in long-shots.",
    category: "Time Management"
  },
  {
    id: 48,
    scenario: "A prospect asks you to present to their team, but wants you to drive 3 hours for a meeting that could be done on Zoom.",
    question: "How do you handle this request?",
    options: [
      "Always say yes to in-person requests",
      "Refuse and insist on Zoom",
      "Assess value: If it's a qualified high-value opportunity at decision stage, in-person might be worth it. If early-stage or small, propose Zoom first with openness to in-person later.",
      "Charge them for your travel time"
    ],
    correctAnswer: 2,
    explanation: "Time investment should match opportunity value. Early-stage or small deals: suggest video. Late-stage, large deals: in-person may be worth it. Be flexible but protect your time strategically.",
    category: "Resource Allocation"
  },
  {
    id: 49,
    scenario: "A client who represents 40% of your revenue is becoming difficult - unreasonable demands, scope creep, late payments. You're dependent on them.",
    question: "What's your strategic approach?",
    options: [
      "Accept everything to keep them happy",
      "Fire them and take the revenue hit",
      "Diversify + set boundaries: Start building new client base to reduce dependency. Meanwhile, have honest conversation about working relationship and set clearer boundaries.",
      "Complain to colleagues but change nothing"
    ],
    correctAnswer: 2,
    explanation: "Revenue concentration is risky. Diversify aggressively while managing the relationship professionally with clear boundaries. Don't burn bridges, but don't be held hostage either.",
    category: "Client Portfolio Management"
  },
  {
    id: 50,
    scenario: "You're in a competitive situation with 2 other vendors. The prospect asks all three of you to present on the same day back-to-back.",
    question: "What presentation slot do you choose and why?",
    options: [
      "Go first to set the standard",
      "Go in the middle",
      "Go last - you can address competitor points, be fresh in their minds during decision-making, and have the advantage of recency bias",
      "It doesn't matter"
    ],
    correctAnswer: 2,
    explanation: "Psychology matters in competitive situations. Last slot gives you recency bias (fresh in minds), ability to address competitor points, and you leave final impression before decision. If last isn't available, first is second-best.",
    category: "Competitive Strategy"
  },
  {
    id: 51,
    scenario: "A prospect's decision-maker suddenly leaves the company mid-sales cycle. Your champion is gone.",
    question: "What's your action plan?",
    options: [
      "Start the sales process over from scratch",
      "Wait to see who replaces them",
      "Activate quickly: Reach out to other stakeholders you've met, congratulate the new decision-maker, offer to brief them on the project, revalidate need with new perspective.",
      "Give up on the deal"
    ],
    correctAnswer: 2,
    explanation: "Decision-maker changes create risk and opportunity. Move quickly to establish relationships with new leadership, offer to brief them (shows respect), and revalidate the need (priorities may have changed).",
    category: "Deal Risk Management"
  },
  {
    id: 52,
    scenario: "You realize mid-project that you underestimated the work by 30%. The fixed-price contract doesn't cover the actual cost.",
    question: "How do you handle this?",
    options: [
      "Eat the cost and say nothing",
      "Demand more money mid-project",
      "Deliver what was contracted professionally, then have honest conversation: 'Here's what we learned. For future phases/projects, here's more accurate pricing.' Protect relationship + learn.",
      "Cut corners to stay within budget"
    ],
    correctAnswer: 2,
    explanation: "Honor your commitments even when you misestimated. Deliver what was promised, learn from it, and use the experience to price future work correctly. Cutting corners damages reputation.",
    category: "Professional Standards"
  },
  {
    id: 53,
    scenario: "A client asks you to recommend other service providers (not competitors) for complementary services like branding or copywriting.",
    question: "How do you respond?",
    options: [
      "Refuse - keep them dependent on you only",
      "Recommend anyone to get them off your back",
      "Curate quality referrals: Recommend 2-3 excellent providers you trust, make warm introductions. This positions you as connector and trusted advisor, strengthening your relationship.",
      "Tell them to find providers themselves"
    ],
    correctAnswer: 2,
    explanation: "Being a connector builds relationship equity. Recommend quality providers you trust, make warm intros, and position yourself as someone who helps their overall success, not just your scope.",
    category: "Relationship Building"
  },
  {
    id: 54,
    scenario: "Your company is launching a new service line that's unproven. A client asks if you have experience with it.",
    question: "How do you position this honestly?",
    options: [
      "Lie and say you have lots of experience",
      "Admit you have no experience and lose confidence",
      "Be transparent but confident: 'This is a new offering for us, but it's built on our proven expertise in [related area]. We'll invest extra to ensure success. Here's our approach and what we're guaranteeing.'",
      "Avoid the question"
    ],
    correctAnswer: 2,
    explanation: "Honesty with confidence. Acknowledge it's new, connect it to proven capabilities, show your plan for ensuring success, and offer guarantees to reduce their risk. Transparency builds trust.",
    category: "New Product Launch"
  },
  {
    id: 55,
    scenario: "You get a referral from your best client to one of their partners. This is a warm lead with high expectations.",
    question: "How do you approach this referral?",
    options: [
      "Treat it like any other lead",
      "Assume the sale is already done",
      "Honor the referral: Thank your client, reach out quickly to the referral mentioning the mutual connection, deliver exceptional experience to reward your client's trust, and update them on outcome.",
      "Ask your client to close the deal for you"
    ],
    correctAnswer: 2,
    explanation: "Referrals are gifts that reflect on the referrer. Move quickly, honor the introduction, deliver exceptional work, and close the loop with your client. This encourages more referrals.",
    category: "Referral Management"
  }
];

const EmployeeQuiz: NextPage = () => {
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
            <title>Quiz Results | Cehpoint Sales Professional Assessment</title>
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
                {passed ? "⭐" : "📊"}
              </motion.div>

              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                color: "var(--text)"
              }}>
                {passed ? "Outstanding Performance!" : "Solid Effort!"}
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
                    ? "Excellent! You demonstrate strong sales skills and strategic thinking. You understand how to handle complex scenarios and deliver value to clients. You're ready to excel in a sales role at Cehpoint."
                    : "You show potential! Review the scenarios where you can improve your approach. Consider retaking the quiz to strengthen your understanding of consultative selling and client management strategies."}
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
            <title>Sales Professional Scenario Quiz | Cehpoint</title>
            <meta name="description" content="Test your sales skills with real-world scenarios" />
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
                Sales Professional Scenario Quiz
              </h1>
              <p style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                maxWidth: "700px",
                margin: "0 auto"
              }}>
                Demonstrate your sales expertise through real-world scenarios
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
                  Assessment Overview
                </h2>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}>
                  {[
                    "10 scenario-based questions testing real-world sales situations",
                    "Covers consultative selling, objection handling, and client management",
                    "Tests strategic thinking and professional judgment",
                    "Instant feedback with explanations of best practices",
                    "Demonstrates your readiness for result-oriented sales roles"
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

              <div style={{
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem"
              }}>
                <p style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  <strong style={{ color: "var(--primary-light)" }}>Note:</strong> This quiz assesses your ability to handle complex sales scenarios with professionalism and strategic thinking. There are no trick questions - choose the response that best demonstrates consultative selling and client-first approach.
                </p>
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
                Start Assessment →
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
          <title>Question {currentQuestionIndex + 1} of {selectedQuestions.length} | Sales Professional Quiz</title>
        </Head>

        <div className="container" style={{ maxWidth: "900px" }}>
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
              Scenario {currentQuestionIndex + 1} of {selectedQuestions.length}
            </p>
            <span style={{
              display: "inline-block",
              padding: "0.375rem 0.875rem",
              background: "rgba(236, 72, 153, 0.15)",
              border: "1px solid rgba(236, 72, 153, 0.3)",
              borderRadius: "20px",
              fontSize: "0.85rem",
              color: "#ec4899"
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
              {currentQuestion.scenario && (
                <div style={{
                  background: "rgba(124, 58, 237, 0.08)",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginBottom: "2rem"
                }}>
                  <p style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    letterSpacing: "0.05em"
                  }}>
                    Scenario:
                  </p>
                  <p style={{
                    fontSize: "1.05rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    margin: 0,
                    fontStyle: "italic"
                  }}>
                    {currentQuestion.scenario}
                  </p>
                </div>
              )}

              {currentQuestion.question && (
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "2.5rem",
                  lineHeight: 1.5
                }}>
                  {currentQuestion.question}
                </h2>
              )}

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
                        paddingRight: "3rem",
                        lineHeight: 1.6
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
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    letterSpacing: "0.05em"
                  }}>
                    {selectedAnswer === currentQuestion.correctAnswer ? "✓ Correct Approach" : "💡 Better Approach"}
                  </p>
                  <p style={{
                    fontSize: "1rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    margin: 0
                  }}>
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
                  {currentQuestionIndex < selectedQuestions.length - 1 ? "Next Scenario →" : "View Results →"}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeQuiz;
