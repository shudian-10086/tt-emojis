'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Search, Heart } from 'lucide-react';
import { EmojiCard } from '@/components/EmojiCard';
import { SearchBar } from '@/components/SearchBar';
import { TikTokEmoji } from '@/lib/tiktokEmojis';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface HeroEmojiSectionProps {
  emojis: TikTokEmoji[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function HeroEmojiSection({ emojis, searchTerm, setSearchTerm }: HeroEmojiSectionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder('tiktok-emojis');
    for (const emoji of emojis) {
      if (emoji.imagePath) {
        const response = await fetch(emoji.imagePath);
        const blob = await response.blob();
        folder?.file(emoji.imagePath.split('/').pop() || 'emoji.png', blob);
      }
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'tiktok-emojis.zip');
  };

  const handleDownloadSelected = async () => {
    const zip = new JSZip();
    const folder = zip.folder('tiktok-emojis-selected');
    const selectedEmojis = emojis.filter(e => selectedIds.includes(e.id));
    for (const emoji of selectedEmojis) {
      if (emoji.imagePath) {
        const response = await fetch(emoji.imagePath);
        const blob = await response.blob();
        folder?.file(emoji.imagePath.split('/').pop() || 'emoji.png', blob);
      }
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'selected-tiktok-emojis.zip');
  };

  useEffect(() => {
    const handler = () => handleDownloadAll();
    window.addEventListener('download-all', handler);
    return () => window.removeEventListener('download-all', handler);
  }, [emojis]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-cyan-50 py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-400/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero 内容 */}
        <div className="text-center max-w-4xl mx-auto mb-16">

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              TikTok Emojis
            </span>
          </h1>

        </div>
          {/* 搜索栏 */}
          <div className="mb-12">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        {/* 表情符号网格 */}
        <div id="emojis" className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {emojis.length} TikTok Emojis Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and copy all hidden tiktok emojis. These tiktok emojis are only available on TikTok and can make your content stand out. Use tiktok emojis to make your TikTok content unique!
            </p>
          </div>

          {emojis.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No tiktok emojis found</h3>
              <p className="text-gray-600">Try adjusting your search or browse all tiktok emojis.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {emojis.map((emoji) => (
                <div key={emoji.id} className="relative">
                  <input
                    type="checkbox"
                    className="absolute left-2 top-2 z-10 w-4 h-4 accent-blue-600"
                    checked={selectedIds.includes(emoji.id)}
                    onChange={e => handleSelect(emoji.id, e.target.checked)}
                    aria-label={`Select ${emoji.name}`}
                  />
                  <EmojiCard emoji={emoji} />
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center gap-4 mt-12">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleDownloadAll}
            >
              Download All
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:bg-gray-300 disabled:text-gray-500"
              onClick={handleDownloadSelected}
              disabled={selectedIds.length === 0}
            >
              Download Selected
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section 组件
export function FAQSection() {
  return (
    <section className="max-w-7xl mx-auto mt-16 mb-8" id="faq">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions about tiktok emojis</h2>
      <Accordion type="single" collapsible className="divide-y divide-gray-100">
        <AccordionItem value="q1">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">1. What are TikTok Emojis?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4 text-md">
            TikTok emojis are a set of hidden, exclusive emojis that can only be displayed on the TikTok platform. You can't type them with a regular keyboard—they require special codes or tools to use.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">2. How do I use tiktok emojis on TikTok?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            Copy your favorite tiktok emojis shortcode (like <code className='bg-gray-100 px-2 py-1 rounded'>[smile]</code>) and paste it into your TikTok comment, message, or video description. After posting, the tiktok emojis will appear automatically.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">3. Why can't I see tiktok emojis on other platforms?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            Tiktok emojis are exclusive to the TikTok app and website. Other platforms will only show the shortcode or a blank box instead of the emoji.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">4. Why are some tiktok emojis not showing up on my TikTok?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            This may be due to an outdated TikTok app, regional restrictions, or network issues. Please update your app and check your internet connection.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q5">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">5. Can I use tiktok emojis on Instagram, Facebook, Twitter, or Snapchat?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            No, tiktok emojis are only supported on the TikTok platform. Other platforms cannot recognize the special tiktok emojis shortcode. However, you can save tiktok emojis images and send them to users on other platforms as pictures.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q6">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">6. How can I copy or download all tiktok emojis at once?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            Our homepage offers one-click copy and batch download features, making it easy to get all tiktok emojis images and codes quickly.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q7">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">7. Are tiktok emojis free for commercial use?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            Tiktok emojis are for personal entertainment and content creation only. Commercial use or redistribution is not allowed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q8">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">8. Why does the tiktok emojis shortcode show as text after I paste it?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            The shortcode will only turn into a tiktok emoji after you post it on TikTok. On other platforms, it will remain as text.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q9">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">9. Does this site collect my personal information?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            No, we do not collect any personal information. All tiktok emojis usage statistics are stored locally in your browser. See our Privacy Policy for details.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q10">
          <AccordionTrigger className="font-fredoka pl-4 pr-4">10. How can I give feedback or report an issue?</AccordionTrigger>
          <AccordionContent className="font-fredoka pl-4 pr-4">
            You can contact us via the Contact Us page or email support@tiktokemojishub.com. We welcome all suggestions to improve your tiktok emojis experience!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
} 