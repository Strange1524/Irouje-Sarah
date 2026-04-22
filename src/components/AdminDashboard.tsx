import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteContext } from "../context/SiteContext";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { siteData, setSiteData, fetchSiteData } = useSiteContext();

  const [formData, setFormData] = useState(siteData);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        navigate("/admin");
      }
    };
    
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin");
      } else if (session) {
        setIsAuthenticated(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    setFormData(siteData);
  }, [siteData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePortfolioChange = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const newPortfolio = [...prev.portfolio];
      newPortfolio[index] = {
        ...newPortfolio[index],
        [field]: value
      };
      return {
        ...prev,
        portfolio: newPortfolio
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update global context so UI doesn't have lag
      setSiteData(formData);

      // Save Site Settings
      const { error: settingsError } = await supabase
        .from('site_settings')
        .update({
          hero_name: formData.hero.name,
          hero_role: formData.hero.role,
          hero_description: formData.hero.description,
          hero_image: formData.hero.image,
          about_text1: formData.about.text1,
          about_text2: formData.about.text2,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (settingsError) throw settingsError;

      // Save Portfolio
      for (const item of formData.portfolio) {
        const { error: portfolioError } = await supabase
          .from('portfolio')
          .update({
            title: item.title,
            category: item.category,
            image_url: item.image
          })
          .eq('id', item.id);
          
        if (portfolioError) throw portfolioError;
      }

      alert("Website content updated successfully and saved to Database!");
      // Optionally fetch the latest straight from the DB
      await fetchSiteData();
    } catch (e: any) {
      console.error(e);
      alert("Error saving data: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition">Logout</button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Hero Editor */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Edit Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={formData.hero.name} onChange={(e) => handleChange('hero', 'name', e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Subtitle</label>
                <input type="text" value={formData.hero.role} onChange={(e) => handleChange('hero', 'role', e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={formData.hero.description} onChange={(e) => handleChange('hero', 'description', e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" value={formData.hero.image || ''} onChange={(e) => handleChange('hero', 'image', e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. https://i.ibb.co/.../image.jpg" />
                <p className="text-xs text-gray-500 mt-1">For ImgBB, use the direct image link (ends in .jpg/.png), not the viewing page link.</p>
              </div>
            </div>
          </div>

          {/* About Editor */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Edit About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
                <textarea rows={4} value={formData.about.text1} onChange={(e) => handleChange('about', 'text1', e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
                <textarea rows={4} value={formData.about.text2} onChange={(e) => handleChange('about', 'text2', e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Editor (Full Width) */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Edit Portfolio Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {formData.portfolio.map((project: any, index: number) => (
              <div key={project.id} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-800 mb-4">{project.title}</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Project Title</label>
                    <input type="text" value={project.title} onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)} className="w-full text-sm p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <input type="text" value={project.category} onChange={(e) => handlePortfolioChange(index, 'category', e.target.value)} className="w-full text-sm p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="text" value={project.image} onChange={(e) => handlePortfolioChange(index, 'image', e.target.value)} className="w-full text-sm p-2 border rounded focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Direct Image link" />
                  </div>
                </div>
                
                {/* Preview Thumbnail */}
                <div className="mt-4 aspect-video rounded-md overflow-hidden border">
                  <img src={project.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-8 flex justify-end">
           <button 
             onClick={handleSave} 
             disabled={saving}
             className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
           >
             {saving ? "Saving to Database..." : "Save All Changes"}
           </button>
        </div>
      </div>
    </div>
  );
}
