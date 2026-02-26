import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import type { AspectRatio, IThumbnail, ThumbnailStyle, colorSchemes } from "../assets/assets"
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { toast } from "react-hot-toast/headless";
import api from "../configs/api";
import { useAuth } from "../context/AuthContext";


const Generate = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  // Future feature: thumbnail state management
  const [_thumbnail, _setThumbnail] = useState<IThumbnail | null>(null)
  const [loading, _setLoading] = useState(false)

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9')
  // Future feature: color scheme selector
  const [_colorSchemeId, _setColorSchemeId] = useState<string>('colorSchemes[0].id')
  // Future feature: style selector
  const [_style, _setStyle] = useState<ThumbnailStyle>('Bold & Graphic')

  // Future feature: style dropdown
  const [_styleDropdownOpen, _setStyleDropdownOpen] = useState(false)

  const handleGenerate = async () => {
    // Future: API call to generate thumbnail
    if (!isLoggedIn) return toast.error("Please login to generate thumbnails")
    if (!title.trim()) {
      return toast.error("Please enter a title or topic for the thumbnail")

    }
    _setLoading(true)

    const api_payload = {
      title,
      prompt: additionalInfo,
      color_scheme: _colorSchemeId,
      style: _style,
      aspect_ratio: aspectRatio,
      text_overlay: true
    }

    const { data } = await api.post('/api/thumbnail/generate', api_payload);
    if (data.thumbnail) {
      _setThumbnail(data.thumbnail)  // ✅ set thumbnail directly from response
        _setLoading(false)             // ✅ stop loading immediately
      navigate('/generate/' + data.thumbnail._id);
      toast.success(data.message)
    }

  }

  const fetchThumbnail = async () => {
    // if(id){
    //   const thumbnail : any = dummyThumbnails.find((thumbnail) => thumbnail._id === id);
    //   if(thumbnail){
    //     _setThumbnail(thumbnail)
    //     setAdditionalInfo(thumbnail.user_prompt)
    //     setTitle(thumbnail.title)
    //     _setColorSchemeId(thumbnail.color_scheme)
    //     setAspectRatio(thumbnail.aspect_ratio)
    //     _setStyle(thumbnail.style)
    //     _setLoading(false)
    //   }
    // }

    try {
      const { data } = await api.get(`/api/thumbnail/${id}`);
      _setThumbnail(data?.thumbnail as IThumbnail);
      _setLoading(!data?.thumbnail.image_url);
      setAdditionalInfo(data?.thumbnail?.user_prompt);
      setTitle(data?.thumbnail?.title);
      _setColorSchemeId(data?.thumbnail?.color_scheme);
      setAspectRatio(data?.thumbnail?.aspect_ratio);
      _setStyle(data?.thumbnail?.style);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail()
    }
    // if (id && loading && isLoggedIn) {
    //   const interval = setInterval(() => {
    //     fetchThumbnail()
    //   }, 5000);
    //   return () => clearInterval(interval)
    // }
  }, [id, loading, isLoggedIn])

  useEffect(() => {
    if (!id && _thumbnail) {
      _setThumbnail(null)
    }
  }, [pathname])

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/*LEFT PANEL*/}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">Create Your Thumbnail</h2>
                  <p className="text-sm text-zinc-400">Describe your vision and let AI bring it to life</p>
                </div>

                <div className="space-y-5">
                  {/*TITLE INPUT*/}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Title or Topic</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="e.g - How to make a chicken soup" className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">{title.length}/100</span>
                    </div>
                  </div>
                  {/*Aspect Ratio Selector*/}

                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

                  {/*Style Selector*/}

                  <StyleSelector value={_style} onChange={_setStyle} isOpen={_styleDropdownOpen} setIsOpen={_setStyleDropdownOpen} />

                  {/*Colour Scheme Selector*/}

                  <ColorSchemeSelector value={_colorSchemeId} onChange={_setColorSchemeId} />


                  {/*DETAILS*/}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Additional Prompts <span className="text-zinc-400 text-xs">(optional)</span>
                    </label>
                    <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={3} placeholder="Add any specific elements, mood or style preferences..." className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" />

                  </div>


                </div>
                {/*Button*/}
                {!id && (
                  <button onClick={handleGenerate} className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colours">
                    {loading ? 'Generating...' : 'Generate Thumbnail'}
                  </button>
                )}


              </div>

            </div>

            {/*RIGHT PANEL*/}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                <PreviewPanel thumbnail={_thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
              </div>
            </div>
          </div>

        </main>

      </div>
    </>


  )
}

export default Generate
