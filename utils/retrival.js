// convert csv into vector, and store in vector db
import { CSVLoader } from "langchain/document_loaders/fs/csv";
// import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
// import fs from 'path'

// 1. Load your CSV
const loader = new CSVLoader("../data/bns_sections.csv");
const docs = await loader.load();
console.log("docs", docs)