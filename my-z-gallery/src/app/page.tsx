'use client';
import { useState, useMemo } from 'react';
import postsData from '../data/posts.json'; // GASが更新するJSONをインポート

// 型定義
type Post = {
  id: string;
  imageUrl?: string;
  videoUrl?: string;
  text: string;
  tags: string[] | string; // GASからの形式に合わせて調整
  date: string;
};

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // データ整形（タグの配列化など）とソート
  const formattedPosts = useMemo(() => {
    return (postsData as Post[]).map(p => ({
      ...p,
      // フォーム入力が文字列の場合の処理
      tags: Array.isArray(p.tags) ? p.tags : (p.tags as string).split(',').map(t => t.trim())
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // 全タグの抽出（重複排除）
  const allTags = Array.from(new Set(formattedPosts.flatMap(p => p.tags)));

  // フィルタリング
  const displayPosts = selectedTag 
    ? formattedPosts.filter(p => (p.tags as string[]).includes(selectedTag))
    : formattedPosts;

  return (
    <main className="min-h-screen bg-[#fffdf5] text-black font-sans p-4 md:p-8 selection:bg-[#ff00ff] selection:text-white">
      
      {/* Header: Marquee effect & Title */}
      <header className="mb-12 border-b-4 border-black pb-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">
          Kosen<span className="text-[#ff00ff]">_</span>Log
        </h1>
        <p className="mt-2 text-sm font-bold bg-black text-white inline-block px-2 py-1">
          EST. 2025 // ARCHIVE
        </p>
      </header>

      {/* Tag Filter (Horizontal Scroll) */}
      <div className="sticky top-4 z-50 mb-8 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-6 py-2 border-2 border-black font-bold text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap
            ${selectedTag === null ? 'bg-black text-white' : 'bg-white hover:bg-[#ccff00]'}`}
          >
            ALL
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2 border-2 border-black font-bold text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap
              ${selectedTag === tag ? 'bg-[#ff00ff] text-white' : 'bg-white hover:bg-[#ccff00]'}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post) => (
          <article 
            key={post.id} 
            className="group relative border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1"
          >
            {/* Date Badge */}
            <div className="absolute -top-4 -right-4 bg-[#ccff00] border-2 border-black px-3 py-1 font-mono font-bold text-sm rotate-3 group-hover:rotate-0 transition-transform">
              {post.date}
            </div>

            {/* Media Area */}
            <div className="mb-4 aspect-square bg-gray-100 border-2 border-black overflow-hidden relative">
              {post.imageUrl ? (
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
              ) : post.videoUrl ? (
                <div className="flex items-center justify-center h-full bg-black text-white font-bold">
                  VIDEO LINK
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 font-bold text-4xl italic">
                  NO IMG
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(post.tags as string[]).map(t => (
                  <span key={t} className="text-xs font-bold border border-black px-1 bg-gray-200">
                    #{t}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium leading-relaxed font-mono">
                {post.text}
              </p>
              
              {/* Function Links */}
              {post.videoUrl && (
                <a 
                  href={post.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-black text-white font-bold py-2 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
                >
                  WATCH VIDEO ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}