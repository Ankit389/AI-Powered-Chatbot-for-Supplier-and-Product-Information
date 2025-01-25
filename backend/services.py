from sqlalchemy.orm import Session
from database import Product, Supplier
from transformers import pipeline
import langgraph.graph as lg

# Initialize the LLM
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def process_query(query: str, db: Session):
    # Create a simple graph for query processing
    flow = lg.Graph()
    
    # Add nodes for different types of queries
    @flow.node
    def query_classifier(query):
        # Simple keyword-based classification
        query_lower = query.lower()
        if "product" in query_lower or "brand" in query_lower:
            return "product_query"
        elif "supplier" in query_lower:
            return "supplier_query"
        return "general_query"

    @flow.node
    def product_handler(query, db):
        products = db.query(Product).all()
        summary = summarizer(str(products), max_length=100, min_length=30)[0]['summary_text']
        return {
            "content": summary,
            "type": "product",
            "data": products
        }

    @flow.node
    def supplier_handler(query, db):
        suppliers = db.query(Supplier).all()
        summary = summarizer(str(suppliers), max_length=100, min_length=30)[0]['summary_text']
        return {
            "content": summary,
            "type": "supplier",
            "data": suppliers
        }

    @flow.node
    def general_handler(query):
        return {
            "content": "I can help you find information about products and suppliers. Please specify what you're looking for.",
            "type": "text",
            "data": None
        }

    # Set up the graph edges
    flow.set_entry_point("query_classifier")
    flow.add_edge("query_classifier", "product_handler")
    flow.add_edge("query_classifier", "supplier_handler")
    flow.add_edge("query_classifier", "general_handler")
    
    # Execute the graph
    result = flow.execute({"query": query, "db": db})
    return result