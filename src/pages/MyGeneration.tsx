import {  type IThumbnail } from "../assets/assets"
import SoftBackdrop from "../components/SoftBackdrop"
import { useEffect, useState } from "react"
import { ArrowUpRightIcon, Download as DownloadIcon, Trash2 as Trash2Icon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../configs/api"
import toast from "react-hot-toast"

const MyGeneration = () => {

  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();

  const aspectRatioClassMap: Record<string, string> = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  }

  const[thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(false)

  const fetchThumbnails = async () => {
    // setThumbnails((dummyThumbnails as unknown) as IThumbnail[])
    // setLoading(false)

    try{
      setLoading(true)
      const {data} = await api.get('/api/user/thumbnails');
      console.log('📦 Received thumbnails data:', data);
      console.log('📦 First thumbnail:', data.thumbnails?.[0]);
      setThumbnails(data.thumbnails || [])
    }catch (error: any){
      console.error(error);
      toast.error(error?.response?.data?.message || error.message)
    }finally{
      setLoading(false)
    }
  }


  const handleDownload = (image_url: string) => {
    const link = document.createElement('a');
    link.href = image_url.replace('/upload','/upload/fl_attachment');
    document.body.appendChild(link);
    link.click();
    link.remove()
  }

  const handleDelete = async(id: string) => {
    try{
      const confirm = window.confirm("Are you sure you want to delete this thumbnail? This action cannot be undone.")
      if(!confirm) return;
      const {data} = await api.delete(`/api/thumbnail/${id}`)
      toast.success(data.message)
      setThumbnails(thumbnails.filter((t)=>t._id !== id));

    }catch (error:any){
      console.error(error);
      toast.error(error?.response?.data?.message || error.message)

    }
    
  }

  useEffect(() => {
    if(isLoggedIn){
      fetchThumbnails()
    }
  },[isLoggedIn])

  return (

    <>
      <SoftBackdrop/>
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">

        {/* HEADER */}
        <div className="mb-8 mt-8">
          <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className="text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
        </div>

        {/*LOADING*/}
         {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) =>(
                <div key={i} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[300px]"></div>
              ) )}
          </div>
        )} 


        {/*THUMBNAILS GRID*/}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb: IThumbnail) =>{
              const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];
              return(
                <div key={thumb._id} className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid">
                  {/*IMAGE*/}
                  <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                  {thumb.image_url ?(
                    <img src={thumb.image_url} alt={thumb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  ):(
                    <div>
                      {thumb.isGenerating ? 'Generating..':'No image'}

                    </div>
                  )}
                  {thumb.isGenerating && <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium">Generating...</div>}
                  </div>

                  {/*CONTENT*/}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-zinc-100 mb-2 line-clamp-2 text-sm">{thumb.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                      <span className="px-2 py-0.5 bg-white/8 ">{thumb.aspect_ratio}</span>
                      <span className="px-2 py-0.5 bg-white/8 rounded">{thumb.style}</span>
                      <span className="px-2 py-0.5 bg-white/8 rounded">{thumb.color_scheme}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-500">{new Date(thumb.createdAt!).toDateString()}</p>
                      
                      {/* Action Buttons */}
                      <div onClick={(e) => e.stopPropagation()} 
                        className="max-sm:flex sm:opacity-0 sm:group-hover:opacity-100 flex gap-1.5 transition-opacity duration-200">
                        
                        <button
                          onClick={() => handleDownload(thumb.image_url!)}
                          className="size-7 bg-white/10 hover:bg-pink-600 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-all"
                          title="Download"
                        >
                          <DownloadIcon className="size-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(thumb._id)}
                          className="size-7 bg-white/10 hover:bg-red-600 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-all"
                          title="Delete"
                        >
                          <Trash2Icon className="size-3.5" />
                        </button>
                        
                        <Link 
                          target="_blank" 
                          to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                          className="size-7 bg-white/10 hover:bg-pink-600 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-all"
                          title="Preview"
                        >
                          <ArrowUpRightIcon className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* {/*THUMBNAILS GRID*/}
        {/*      <div key={thumbnail._id} className="group rounded-2xl bg-white/6 border border-white/10 overflow-hidden hover:border-white/20 transition-all">
                <Link to={`/generate/${thumbnail._id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={thumbnail.image_url} 
                      alt={thumbnail.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold text-zinc-200 mb-2 line-clamp-1">{thumbnail.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                    <span className="px-2 py-1 bg-white/5 rounded">{thumbnail.aspect_ratio}</span>
                    <span className="px-2 py-1 bg-white/5 rounded">{thumbnail.style}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDownload(thumbnail.image_url || '')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-xs font-medium transition-colors"
                    >
                      <DownloadIcon className="size-3.5" />
                      Download
                    </button>
                    <button 
                      onClick={() => handleDelete(thumbnail._id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2Icon className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        */}

        {/*EMPTY STATE*/}
        {!loading && thumbnails.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-2">No thumbnails yet</h3>
            <p className="text-sm text-zinc-400 mb-6">Start creating amazing thumbnails with AI</p>
            <Link 
              to="/generate" 
              className="px-6 py-2.5 bg-gradient-to-b from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-lg font-medium transition-all"
            >
              Create Your First Thumbnail
            </Link>
          </div>
        )}
        
      </div>
      
    </>
  )
}

export default MyGeneration
