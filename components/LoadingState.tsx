export default function LoadingState({
  message = 'Carregando missão...',
}: {
  message?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="w-12 h-12 border-4 border-cppem-border border-t-cppem-green rounded-full animate-spin" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  )
}
