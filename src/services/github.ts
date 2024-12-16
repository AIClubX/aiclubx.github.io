import axios from 'axios';

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

export async function getKnowledgeBaseContent(): Promise<GitHubContent[]> {
  try {
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
    console.error('Error fetching knowledge base:', error);
    throw error;
  }
}