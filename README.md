# **FormulaGenie**

🛠️ **Weekend Fun Project** to build an **AI-powered Google Sheets & Excel Formula Generator** using modern full-stack tech — introducing **FormulaGenie**, your instant natural language to spreadsheet formula converter! 📊✨  

## **Index**  
1. [Introduction](#introduction)  
2. [Demo](#demo)  
3. [Features](#features)  
4. [Technologies](#technologies)  
5. [Quick Setup](#quick-setup)  
6. [Contributing](#contributing)  

---

## <a name="introduction"> **Introduction** </a>  

**FormulaGenie** is an **AI-powered SaaS tool** that converts plain English descriptions into **production-ready Google Sheets and Excel formulas**.  

Type "sum all values in column B where column C is 'Paid'" and get back perfectly formatted formulas + explanations for both platforms. Save your generations, track usage, and build your formula library effortlessly.  

📌 **Built over the weekend** to showcase Next.js 15, Gemini AI, and modern SaaS patterns!  

---

## <a name="demo"> **Demo** </a>  

🔗 **Live Site:** [https://formulagenie.vercel.app/](https://formulagenie.vercel.app/)  
📽️ **Demo Video:** 

[![Demo Video](https://github.com/user-attachments/assets/DEMO_ASSET_ID)](https://github.com/user-attachments/assets/DEMO_ASSET_ID)

---

## <a name="features"> **Key Features** </a>  

✅ **Natural Language → Formulas** – Describe what you want, get Sheets/Excel formulas instantly.  
✅ **Dual Platform Support** – Generates formulas for Google Sheets AND Excel simultaneously.  
✅ **AI-Powered** – Uses Google's Gemini API for intelligent formula generation and explanations.  
✅ **Generation History** – Save, search, and revisit all your formulas with filtering.  
✅ **Modern SaaS UI** – Beautiful dashboard built with shadcn/ui and Tailwind CSS.  
✅ **Production Ready** – Clerk auth, Neon Postgres, Vercel deployment, fully serverless.  
✅ **Copy-to-Clipboard** – One-click copy for Sheets/Excel formulas with toast notifications.  
✅ **Responsive Design** – Works perfectly on desktop, tablet, and mobile.  

---

## <a name="technologies"> **🛠 Tech Stack** </a>  

**Frontend:**  
- Next.js 15 (App Router)  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  

**Backend:**  
- Next.js API Routes  
- Prisma ORM  
- Google Gemini API (`gemini-1.5-flash`)  
- Neon (Serverless Postgres)  

**Auth & Database:**  
- Clerk (Authentication)  
- NeonDB (PostgreSQL)  

**Deployment:**  
- Vercel (Full-stack deployment)  

---

## <a name="quick-setup"> **🚀 Quick Setup** </a>  

```bash
# Clone & install
git clone <your-repo-url>
cd formulagenie
npm install

# Copy env template
cp .env.example .env.local

# Get your keys:
# 1. Clerk keys: https://clerk.com
# 2. Neon DB URL: https://neon.tech
# 3. Gemini API: https://aistudio.google.com

# Run migrations
npx prisma migrate dev
npx prisma generate

# Start dev server
npm run dev
