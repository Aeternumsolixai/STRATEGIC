import React from 'react';
import { ShieldAlert, ExternalLink, MessageSquare, Globe, Share2, Check, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
  image: string | null;
  category: 'military' | 'diplomatic' | 'economic';
  priority: 'high' | 'medium' | 'low';
}

export default function ConflictIntelligence() {
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  // API KEY PLACEHOLDERS
  // const NEWS_API_KEY = 56fe193af4fd4ef4a606def9a7dd113b

  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [countdown, setCountdown] = React.useState(300); // 5 minutes in seconds

  const handleShare = async (item: NewsItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Strategic Intel: ${item.title}`,
          url: item.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(item.url);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    setCountdown(300); // Reset countdown on manual or auto refresh
    try {
      const query = encodeURIComponent('Iran OR "US Navy" OR "Strait of Hormuz" OR Blockade');
      const response = await fetch(`/api/news?q=${query}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch news');
      }
      
      const data = await response.json();
      
      const formattedNews: NewsItem[] = data.articles.map((article: any, index: number) => {
        const title = article.title.toLowerCase();
        let category: 'military' | 'diplomatic' | 'economic' = 'diplomatic';
        
        if (title.includes('navy') || title.includes('fleet') || title.includes('military') || title.includes('base')) {
          category = 'military';
        } else if (title.includes('oil') || title.includes('market') || title.includes('economic') || title.includes('price')) {
          category = 'economic';
        }

        return {
          id: index.toString(),
          title: article.title,
          source: article.source.name,
          time: article.publishedAt,
          url: article.url,
          image: article.urlToImage,
          category,
          priority: index < 3 ? 'high' : 'medium',
        };
      });
      
      setNews(formattedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback to mock data on error
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'US Fifth Fleet Increases Patrols in Strait of Hormuz Following Recent Incidents',
          source: 'Reuters',
          time: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          url: 'https://reuters.com',
          image: 'https://picsum.photos/seed/navy-patrol/400/250',
          category: 'military',
          priority: 'high',
        },
        {
          id: '2',
          title: 'Tehran Warns Against Foreign Intervention in Regional Maritime Security',
          source: 'Al Jazeera',
          time: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          url: 'https://aljazeera.com',
          image: 'https://picsum.photos/seed/tehran-diplomacy/400/250',
          category: 'diplomatic',
          priority: 'medium',
        },
        {
          id: '3',
          title: 'Satellite Imagery Shows Increased Activity at Bandar Abbas Naval Base',
          source: 'IntelWatch',
          time: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          url: 'https://intelwatch.com',
          image: 'https://picsum.photos/seed/satellite-intel/400/250',
          category: 'military',
          priority: 'medium',
        },
        {
          id: '4',
          title: 'Insurance Premiums for Tankers Transiting Persian Gulf Rise by 15%',
          source: 'Bloomberg',
          time: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
          url: 'https://bloomberg.com',
          image: 'https://picsum.photos/seed/tanker-insurance/400/250',
          category: 'economic',
          priority: 'low',
        }
      ];
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchNews();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h2 className="font-sans font-semibold text-slate-100 uppercase tracking-wider text-sm">Conflict Intelligence</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono text-red-500 font-bold uppercase">Live Intel</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-950/30 custom-scrollbar">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse space-y-3 p-4 bg-slate-900/50 rounded border border-slate-800">
                <div className="h-3 bg-slate-800 rounded w-1/4"></div>
                <div className="h-4 bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <article key={item.id} className="group relative bg-slate-900/40 border border-slate-800 rounded-lg hover:border-red-500/30 transition-all hover:bg-slate-900/60 overflow-hidden flex flex-col">
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "headline": item.title,
                    "datePublished": item.time,
                    "image": item.image,
                    "author": {
                      "@type": "Organization",
                      "name": item.source
                    }
                  })}
                </script>
                
                {/* Article Image */}
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-32 relative overflow-hidden bg-slate-950 block group/img"
                >
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                      <ShieldAlert className="w-8 h-8 text-slate-800" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity"></div>
                  
                  {/* Interactive Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-red-500/10">
                    <div className="px-3 py-1 bg-slate-900/90 border border-red-500/50 rounded text-[8px] font-bold text-white tracking-[0.2em] uppercase backdrop-blur-sm">
                      Access Intel
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 flex gap-2">
                    <span className={cn(
                      "text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded backdrop-blur-md",
                      item.category === 'military' && "text-red-400 bg-red-400/20 border border-red-400/30",
                      item.category === 'diplomatic' && "text-blue-400 bg-blue-400/20 border border-blue-400/30",
                      item.category === 'economic' && "text-amber-400 bg-amber-400/20 border border-amber-400/30"
                    )}>
                      {item.category}
                    </span>
                  </div>
                </a>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <Globe className="w-3 h-3" /> {item.source}
                    </span>
                    <time dateTime={item.time} className="text-[10px] font-mono text-slate-500">
                      {format(new Date(item.time), 'HH:mm')}
                    </time>
                  </div>
                  
                  <h3 className="text-sm font-medium text-slate-200 leading-snug group-hover:text-white transition-colors line-clamp-2 mb-4">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleShare(item)}
                        className="text-[10px] text-slate-600 hover:text-amber-500 flex items-center gap-1 transition-colors"
                        title="Share Intel"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Share2 className="w-3 h-3" />
                        )}
                        SHARE
                      </button>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> INTEL
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3 h-3" />
              <span>KEYWORDS: IRAN, US NAVY, HORMUZ</span>
            </div>
            <div className="h-3 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-amber-500/50" />
              <span className="text-amber-500/70">NEXT REFRESH: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          <button 
            onClick={fetchNews}
            disabled={loading}
            className="hover:text-slate-300 transition-colors flex items-center gap-2 group"
          >
            <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
            REFRESH FEED
          </button>
        </div>
        {/* Progress Bar */}
        <div className="mt-3 h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500/30 transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 300) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
