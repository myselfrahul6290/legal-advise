
import { CSVLoader  } from "@langchain/community/document_loaders/fs/csv";
// import { } from "langchain/document_loaders/fs/directory";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import path from 'node:path'
import { fileURLToPath } from "node:url";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const filepath=path.join(__dirname,"data","bns_sections.csv")

const loader = new CSVLoader(filepath);
const docs = await loader.load();
// console.log("docs", docs)

const EMBEDDING_MODEL=path.join(__dirname,"model","all-MiniLM-L6-v2")

const embeddings = new HuggingFaceTransformersEmbeddings({
    model:EMBEDDING_MODEL, 
    modelOptions: {
      local_files_only: true,
      quantized: true,
    }
  });

// console.log(embeddings)

// try {
//   const test = await embeddings.embedQuery("test");
//   console.log("Success! Model loaded locally.");
// } catch (err) {
//   console.error("Still missing a file:", err.message);
// }
const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
// console.log(vectorStore)
const directory = "./legal-advise";
await vectorStore.save(directory);

console.log("FAISS index saved to disk!");