import axios from 'axios';
import { logger } from '../utils/logger';

const GITHUB_API = 'https://api.github.com';
const ORG_NAME = 'AIClubX';
const REPO_NAME = 'aiknowledgebase';

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  type: string;
  content?: string;
}

interface GitHubContent {
  title: string;
  path: string;
  content: string;
}

// Sample data for development
const sampleContent: GitHubContent[] = [
  {
    title: 'Introduction to Machine Learning',
    path: 'docs/intro-ml.md',
    content: `# Introduction to Machine Learning

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data.

### Key Concepts

1. Supervised Learning
2. Unsupervised Learning
3. Reinforcement Learning

## Getting Started

To begin your machine learning journey, you'll need:

- Python programming skills
- Understanding of basic statistics
- Knowledge of linear algebra
- Familiarity with calculus`
  },
  {
    title: 'Deep Learning Fundamentals',
    path: 'docs/deep-learning.md',
    content: `# Deep Learning Fundamentals

## Neural Networks

Neural networks are computing systems inspired by biological neural networks in animal brains.

### Architecture

- Input Layer
- Hidden Layers
- Output Layer

## Popular Frameworks

1. TensorFlow
2. PyTorch
3. Keras`
  }
];

export async function getKnowledgeBaseContent(): Promise<GitHubContent[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Return sample data in development
      return sampleContent;
    }

    // Get all markdown files from the docs directory
    const filesResponse = await axios.get(
      `${GITHUB_API}/repos/${ORG_NAME}/${REPO_NAME}/contents/docs`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    const files: GitHubFile[] = filesResponse.data.filter(
      (file: GitHubFile) => file.name.endsWith('.md')
    );

    // Fetch content for each file
    const contents = await Promise.all(
      files.map(async (file) => {
        const contentResponse = await axios.get(
          `${GITHUB_API}/repos/${ORG_NAME}/${REPO_NAME}/contents/${file.path}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json'
            }
          }
        );
        
        const decodedContent = atob(contentResponse.data.content.replace(/\n/g, ''));
        
        // Extract title from first line of markdown
        const title = decodedContent.split('\n')[0].replace(/^#\s+/, '');

        return {
          title,
          path: file.path,
          content: decodedContent
        };
      })
    );

    return contents;
  } catch (error) {
    logger.error('Error fetching knowledge base:', error);
    // Return sample data as fallback
    return sampleContent;
  }
}