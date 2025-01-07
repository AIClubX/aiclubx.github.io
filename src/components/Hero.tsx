import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&h=1080&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay with AI Club X text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/70 flex items-center justify-center">
          <div 
            className="absolute top-0 left-0 right-0 p-8 text-center text-6xl font-bold text-white/20"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            AI CLUB X
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-full text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              <span className="block">Connect with AI</span>
              <span className="block text-indigo-400">Enthusiasts</span>
            </h1>
            <p className="mt-6 text-xl text-gray-100 sm:text-2xl max-w-2xl mx-auto">
              Join a community of students, researchers, and industry experts passionate about artificial intelligence. Participate in workshops, connect with mentors, and build the future together.
            </p>
            <div className="mt-10">
              <a
                href="/join"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                Join Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}