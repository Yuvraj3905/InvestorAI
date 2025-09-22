# InvestorAI - Pitch Deck Analysis Platform

![InvestorAI Logo](https://via.placeholder.com/150x50?text=InvestorAI)

InvestorAI is an intelligent platform that helps investors analyze pitch decks using AI. It provides detailed insights, risk assessments, and investment recommendations based on the content of pitch decks.

## ✨ Features

- 📄 Upload and analyze PDF/PPTX pitch decks
- 🤖 AI-powered investment decision making
- 📊 Detailed company and market analysis
- ⚠️ Comprehensive risk assessment
- 📱 Responsive and intuitive user interface
- 🔍 Detailed investment metrics and recommendations

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI (Python)
- **AI/ML**: Custom analysis logic
- **Build Tools**: Vite, npm
- **Styling**: Tailwind CSS, Lucide Icons

## 🏗 Project Structure

```
InvestorAI/
├── backend/               # FastAPI backend
│   ├── app.py            # Main FastAPI application
│   ├── ai_logic.py       # AI analysis logic
│   └── requirements.txt  # Python dependencies
│
└── frontend/             # React frontend
    ├── src/
    │   ├── components/   # React components
    │   │   ├── dashboard/  # Dashboard components
    │   │   ├── DocumentUpload.tsx  # File upload component
    │   │   └── ...
    │   ├── App.tsx       # Main application component
    │   └── main.tsx      # Entry point
    ├── public/           # Static assets
    └── package.json      # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python (3.8+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/InvestorAI.git
   cd InvestorAI
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## 🏃‍♂️ Running the Application

1. **Start the backend server** (from `/backend` directory)
   ```bash
   uvicorn app:app --reload
   ```

2. **Start the frontend development server** (from `/frontend` directory)
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🌐 API Endpoints

- `POST /analyze_file` - Upload and analyze a pitch deck file
  - Accepts: `multipart/form-data` with a PDF/PPTX file
  - Returns: Analysis results in JSON format

- `POST /analyze_path` - Analyze a file from a local path (dev only)
  - Body: `{"file_path": "/path/to/file.pdf"}`
  - Returns: Analysis results in JSON format

## 🔧 Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

## 🏗 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
uvicorn app:app --host 0.0.0.0 --port 8000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - The web framework used
- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Vite](https://vitejs.dev/) - Frontend tooling
