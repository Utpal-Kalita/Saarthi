# Saarthi - Your Companion for Mental Well-being

![Saarthi Banner](https://storage.googleapis.com/aai-web-samples/sarvuday-banner.png)

**Saarthi** is a comprehensive, AI-powered mental wellness platform designed as a "digital public good" to address the significant mental health treatment gap among adolescents and young adults in India. It integrates evidence-based AI tools with a culturally sensitive, multi-tiered support system to provide accessible, affordable, and stigma-free mental health care.

## Core Problem

Mental health is a critical issue among Indian youth, driven by academic stress, family expectations, and the challenges of the digital age. Key issues include:
- **High Prevalence, Low Treatment:** A vast number of young people experience mental health issues, yet a massive treatment gap exists.
- **Significant Stigma:** Social stigma remains a major barrier to seeking help.
- **Systemic Gaps:** Existing school and college mental health programs are often underfunded and lack the resources to provide continuous support.

## The Saarthi Solution: A 3-Tiered Approach

Saarthi provides a "stepped care" model, offering different levels of support based on individual user needs.

### Tier 1: Universal Self-Care & Mental Health Literacy
The free, accessible entry point for proactive self-care and building resilience.
- **AI Conversational Assistant:** A 24/7 AI chatbot providing empathetic conversations, psychoeducation, and guidance on coping strategies (CBT, mindfulness).
- **Clinically Validated Self-Assessments:** Confidential tools like PHQ-9, SDQ, and the Internet Addiction Test (IAT) to help users understand their mental state.
- **Mood & Emotion Journal:** An AI-powered journal to track mood patterns and gain personalized insights.
- **Hyper-Localized Content Hub:** A library of articles and guides in English and Assamese on relevant topics like stress management and healthy digital habits.

### Tier 2: Targeted Peer & Community Support
For users who may benefit from a sense of community and shared experience.
- **Anonymous Peer Support Circles:** Moderated, themed discussion forums where users can connect anonymously with peers facing similar challenges.
- **Teacher & Parent Portal:** A resource hub with micro-learning modules to equip teachers and parents with mental health literacy.
- **Community Challenges:** Optional, positive challenges (e.g., "7-Day Gratitude Journal") to foster engagement and healthy habits.

### Tier 3: Professional Care & Crisis Intervention
A clear and safe escalation path for users requiring professional help.
- **Crisis Intervention:** The AI is trained to detect crisis language and immediately provides a direct, one-tap connection to India's national **Tele-MANAS (14416)** helpline.
- **Find a Therapist:** A directory of verified, licensed therapists and counselors, providing users with clear pathways to connect with:
    1. Free TELE-MANAS Counselors.
    2. Anonymous College Counselors (for partner institutions).
    3. Vetted Paid Counselors for specialized therapy.

## Technical Architecture

Saarthi is built on a modern, scalable, and secure technical stack:
- **Frontend:** Next.js with React, ShadCN UI, and Tailwind CSS.
- **Backend AI Flows:** Genkit (A Google AI Framework) for orchestrating AI models.
- **AI Models:**
    - **Conversational AI:** Google's Gemini models for the chatbot, summarization, and insights.
- **Database:** A dual-database model is envisioned for production, using PostgreSQL for structured data and MongoDB for unstructured chat logs.

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/saarthi.git
   cd saarthi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   You will need to add your Google AI API key to a `.env` file in the root of the project.
   ```
   GEMINI_API_KEY=your_google_ai_api_key_here
   ```

4. **Run the development server:**
   The application uses Genkit for AI flows, which runs alongside the Next.js development server.
   
   In one terminal, run the Genkit server:
   ```bash
   npm run genkit:watch
   ```

   In a second terminal, run the Next.js app:
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## Ethical Guardrails

This project is built with a "Safety by Design" philosophy:
- **Privacy First:** End-to-end encryption and data anonymization are core principles.
- **Human in the Loop:** AI assists, but never replaces, human professionals. All crisis detections are escalated to human-led services.
- **Bias Mitigation:** AI models are chosen and prompted to be as fair and culturally sensitive as possible.
