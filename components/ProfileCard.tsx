'use client'

import { useState } from 'react'
import Image from 'next/image'
import UploadPhoto from './UploadPhoto'
import { Briefcase, Mail, Camera } from 'lucide-react'

interface ProfileCardProps {
  nome: string
  cargo: string
  email: string
  fotoUrl?: string
  userId: string
}

export default function ProfileCard({
  nome,
  cargo,
  email,
  fotoUrl,
  userId,
}: ProfileCardProps) {
  const [photo, setPhoto] = useState(fotoUrl)
  const [showUpload, setShowUpload] = useState(false)

  const initials = nome
    ? nome
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : email.slice(0, 2).toUpperCase()

  return (
    <div className="bg-cppem-card border border-cppem-border rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-cppem-bg border-2 border-cppem-border flex items-center justify-center">
            {photo ? (
              <Image
                src={photo}
                alt={nome || email}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-2xl font-black text-cppem-neon">
                {initials}
              </span>
            )}
          </div>
          <button
            onClick={() => setShowUpload((v) => !v)}
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cppem-green text-cppem-dark flex items-center justify-center shadow-lg hover:bg-cppem-neon transition-colors"
            title="Alterar foto"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-black text-white">{nome || 'Usuário'}</h2>
          <div className="flex flex-col gap-1.5 mt-2 items-center sm:items-start">
            {cargo && (
              <div className="flex items-center gap-1.5 text-cppem-gold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>{cargo}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </div>
          </div>
        </div>
      </div>

      {showUpload && (
        <div className="mt-6 pt-6 border-t border-cppem-border">
          <UploadPhoto
            userId={userId}
            onSuccess={(url) => {
              setPhoto(url)
              setShowUpload(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
