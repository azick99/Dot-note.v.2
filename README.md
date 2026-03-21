# 📄 Dot Note — AI PDF Chat App

> Chat with your PDF documents using the power of AI.
> Ask questions, get instant answers — all from your browser.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![LangChain](https://img.shields.io/badge/LangChain-green?style=flat-square)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-purple?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-Embeddings-orange?style=flat-square&logo=openai)

---

## 🚀 Live Demo

👉 [Dot Note](https://dot-note-aziz.vercel.app/)

## 📌 Overview

**Dot Note** is a full-stack AI-powered application that allows users to upload PDF documents and interact with their content through a conversational chat interface.

Instead of reading through entire documents, users simply ask questions and receive accurate, context-aware answers — powered by OpenAI and semantic vector search.

---

## ✨ Features

- 📁 **PDF Upload** — Upload any PDF document directly in the browser
- 💬 **AI Chat Interface** — Ask natural language questions about your document
- 🔍 **Semantic Search** — Finds the most relevant content using vector embeddings
- ⚡ **Real-Time Responses** — Instant answers via REST API integration
- 📱 **Fully Responsive** — Works seamlessly on mobile and desktop
- ♿ **Accessible UI** — Built with accessibility best practices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| AI / LLM | OpenAI API (GPT) |
| Embeddings | OpenAI text-embedding-ada-002 |
| Vector Database | Pinecone |
| Document Processing | LangChain |
| Styling | Tailwind CSS |
| API | REST API (Next.js API Routes) |

---

## 🧠 How It Works

```
User uploads PDF
↓
Document is split into chunks (LangChain)
↓
Each chunk is converted to vector embeddings (OpenAI)
↓
Vectors are stored in Pinecone vector database
↓
User asks a question
↓
Question is converted to a vector
↓
Most relevant chunks are retrieved (semantic search)
↓
OpenAI generates a context-aware answer
↓
Answer is displayed in real-time chat UI
```

---

## 📂 Project Structure

```
dot-note/
├── app/
│   ├── api/            # API routes (chat, upload)
│   ├── components/     # Reusable UI components
│   ├── lib/            # LangChain, Pinecone, OpenAI config
│   └── page.tsx        # Main app entry
├── public/
├── styles/
├── types/
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API Key
- Pinecone API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/azick99/Dot-note.v.2.git

# Navigate into the project
cd Dot-note.v.2

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 What I Learned

- Building scalable full-stack apps with Next.js App Router
- Working with AI/LLM APIs and prompt engineering
- Implementing vector search and semantic similarity
- Structuring TypeScript for large-scale maintainability
- Designing component-driven, accessible UI architecture

---

## 🔮 Future Improvements

- [ ] Add user authentication and saved chat history
- [ ] Support multiple PDF uploads per session
- [ ] Add streaming responses for faster UX
- [ ] Write unit and integration tests
- [ ] Deploy to Vercel with CI/CD pipeline

---

## 👤 Author

**Aziz** — Frontend Developer

- GitHub: [@azick99](https://github.com/azick99)
- Available for freelance work on Upwork & Fiverr

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
