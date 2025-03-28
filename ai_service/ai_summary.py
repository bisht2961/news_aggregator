from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_ollama.llms import OllamaLLM
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://localhost",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class NewsContent(BaseModel):
    content: str

TEMPLATE = """
            As a professional summarizer, create a concise and comprehensive summary of the provided news.
                * Craft a summary that is detailed, thorough, in-depth, and complex, while maintaining clarity and conciseness.
                * Incorporate main ideas and essential information, eliminating extraneous language and focusing on critical aspects.
                * Rely strictly on the provided text, without including external information.
                * Format the summary in paragraph form for easy understanding.
                * Conclude your notes with [That was all your news,Thanks for reading.] to indicate completion.
                * The news content is scraped from a url and may contain unnecessary data.
                * Make sure to format the news in order to highlight important word or number.     
        """
@app.get("/summarize/hello")
async def main():
    return {"message": "Hello World"}

@app.post("/summarize/article")
async def summarize_news(news: NewsContent):
    try:
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", TEMPLATE),
                 ("human", "{input}"),
            ]
        )
        model = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro",
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2,
        )
        chain = prompt | model
        summary = chain.invoke({"input": news.content})
        
        return {"summary": summary.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)