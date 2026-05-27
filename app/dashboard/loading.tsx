import LoadingState from '@/components/LoadingState'

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Skeleton header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-cppem-card rounded w-24" />
          <div className="h-7 bg-cppem-card rounded w-40" />
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-cppem-card border border-cppem-border rounded-2xl p-5 h-28" />
        ))}
      </div>

      {/* Skeleton progress */}
      <div className="bg-cppem-card border border-cppem-border rounded-2xl p-6 h-36" />

      {/* Skeleton charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cppem-card border border-cppem-border rounded-2xl h-64" />
        <div className="bg-cppem-card border border-cppem-border rounded-2xl h-64" />
      </div>
    </div>
  )
}
