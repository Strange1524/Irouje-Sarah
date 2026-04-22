import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultData = {
  hero: {
    name: "IROUJE SARAH TEMITOPE",
    role: "Professional & Creative Designer",
    description: "I help brands stand out, build trust, and connect with their audience through clean, modern, and highly effective visual designs.",
    image: "https://i.ibb.co/JT5cwhv/temi.jpg"
  },
  about: {
    text1: "Hello! I am a professional creative designer dedicated to helping small business owners and startups grow. Whether you need a striking logo, an engaging flyer, or a complete brand identity, I translate your vision into designs that sell.",
    text2: "Beyond graphic design, I specialize in social media management and content creation, ensuring your brand stays relevant and highly interactive online."
  },
  portfolio: [
    { id: 1, title: "Tech Startup Brand Mark", category: "Logo Design", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Corporate Event Poster", category: "Flyer Design", image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Instagram Campaign Pack", category: "Social Media", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ]
};

export const SiteContext = createContext<any>(null);

export const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteData, setSiteData] = useState<any>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteData();
  }, []);

  const fetchSiteData = async () => {
    try {
      // 1. Fetch text data
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
        
      // 2. Fetch portfolio data
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('portfolio')
        .select('*')
        .order('id', { ascending: true });

      if (settingsData && portfolioData) {
        setSiteData({
          hero: {
            name: settingsData.hero_name,
            role: settingsData.hero_role,
            description: settingsData.hero_description,
            image: settingsData.hero_image,
          },
          about: {
            text1: settingsData.about_text1,
            text2: settingsData.about_text2,
          },
          portfolio: portfolioData.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            image: item.image_url,
          }))
        });
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteContext.Provider value={{ siteData, setSiteData, fetchSiteData, loading }}>
      {!loading && children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);
