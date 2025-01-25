from pydantic import BaseModel
from typing import Optional, List, Union

class ChatRequest(BaseModel):
    query: str

class ProductResponse(BaseModel):
    id: int
    name: str
    brand: str
    price: float
    category: str
    description: str
    supplier_id: int

class SupplierResponse(BaseModel):
    id: int
    name: str
    contact_info: str
    product_categories: List[str]

class ChatResponse(BaseModel):
    content: str
    type: str
    data: Optional[Union[List[ProductResponse], List[SupplierResponse], None]] = None