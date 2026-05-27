'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, X, Check } from 'lucide-react'

interface UploadPhotoProps {
  userId: string
  onSuccess: (url: string) => void
}

export default function UploadPhoto({ userId, onSuccess }: UploadPhotoProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return

    if (f.size > 2 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo de 2MB.')
      return
    }

    setFile(f)
    setError('')
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `avatars/${userId}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setError('Erro ao fazer upload. Tente novamente.')
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    onSuccess(data.publicUrl)
    setUploading(false)
  }

  function reset() {
    setPreview(null)
    setFile(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-gray-300">Alterar foto de perfil</p>

      {!preview ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full py-8 rounded-xl border-2 border-dashed border-cppem-border hover:border-cppem-green/50 transition-colors flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400"
        >
          <Upload className="w-8 h-8" />
          <span className="text-sm font-medium">Clique para selecionar</span>
          <span className="text-xs">JPG, PNG ou WebP — máx. 2MB</span>
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 rounded-xl object-cover border border-cppem-border"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-cppem-green text-cppem-dark font-bold rounded-lg hover:bg-cppem-neon transition-colors disabled:opacity-50 text-sm"
            >
              {uploading ? (
                <span className="w-4 h-4 border-2 border-cppem-dark border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Salvar
            </button>
            <button
              onClick={reset}
              className="p-2 rounded-lg bg-cppem-bg border border-cppem-border text-gray-600 hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}
