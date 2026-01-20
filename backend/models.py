from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./skillnexus.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String)
    skills_offered = Column(Text)  # JSON string
    skills_wanted = Column(Text)
    matched_swaps = Column(Text)
    completed_courses = Column(Text)

class Resource(Base):
    __tablename__ = "resources"
    id = Column(String, primary_key=True, index=True)
    skill_id = Column(String, index=True)
    title = Column(String)
    type = Column(String)
    url = Column(String)
    uploaded_by = Column(String)

class Swap(Base):
    __tablename__ = "swaps"
    id = Column(Integer, primary_key=True, index=True)
    # Add fields as needed

Base.metadata.create_all(bind=engine)