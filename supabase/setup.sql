-- ============================================================
-- CPPEM HUB — Supabase Storage Setup
-- Execute no: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Criar bucket "avatars" público com limite de 2MB
INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
  SET
    public             = EXCLUDED.public,
    file_size_limit    = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;


-- 2. Política: usuários autenticados podem fazer upload
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');


-- 3. Política: usuários autenticados podem substituir (upsert)
DROP POLICY IF EXISTS "Authenticated users can update avatars" ON storage.objects;
CREATE POLICY "Authenticated users can update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');


-- 4. Política: usuários autenticados podem deletar
DROP POLICY IF EXISTS "Authenticated users can delete avatars" ON storage.objects;
CREATE POLICY "Authenticated users can delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');


-- 5. Política: qualquer pessoa pode visualizar (bucket público)
DROP POLICY IF EXISTS "Public read access for avatars" ON storage.objects;
CREATE POLICY "Public read access for avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');


-- ============================================================
-- Verificar se as políticas foram criadas
-- ============================================================
-- SELECT policyname, cmd, roles
-- FROM pg_policies
-- WHERE tablename = 'objects' AND schemaname = 'storage';
