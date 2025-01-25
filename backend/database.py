from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, declarative_base

# Update these values with your PostgreSQL credentials
DB_USER = "ankit123"  # Provided username
DB_PASSWORD = "Ankit@111"  # Provided password
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "chatbot_db"  # Database name you created in pgAdmin

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create the database engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Use the updated declarative_base from SQLAlchemy 2.0
Base = declarative_base()

# Define the Product model
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String)
    price = Column(Float)
    category = Column(String)
    description = Column(String)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))

    supplier = relationship("Supplier", back_populates="products")

# Define the Supplier model
class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    contact_info = Column(String)
    product_categories = Column(String)  # Stored as comma-separated values

    products = relationship("Product", back_populates="supplier")

# Function to initialize the database
def init_db():
    Base.metadata.create_all(bind=engine)

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
