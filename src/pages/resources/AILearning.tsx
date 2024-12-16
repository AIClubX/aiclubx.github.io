import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getKnowledgeBaseContent } from '../../services/github';
import { Search } from 'lucide-react';

interface Article {
  title: string;
  path: string;
  content: string;
}

export default function AILearning() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const content = await getKnowledgeBaseContent();
      setArticles(content);
      if (content.length > 0) {
        setSelectedArticle(content[0]);
      }
    } catch (err) {
      setError('Failed to load learning content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="space-y-1">
            {filteredArticles.map((article) => (
              <button
                key={article.path}
                onClick={() => setSelectedArticle(article)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  selectedArticle?.path === article.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {article.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {selectedArticle ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <article className="prose prose-indigo max-w-none">
                <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
              </article>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Select an article to start learning
            </div>
          )}
        </div>
      </div>
    </div>
  );
}