import { RecentQuery } from "@/types/chat";

interface RecentQueriesProps {
  queries: RecentQuery[];
  onSelect: (query: string) => void;
}

export const RecentQueries = ({ queries, onSelect }: RecentQueriesProps) => {
  return (
    <div className="w-full max-w-xs p-4 border-l">
      <h2 className="font-semibold mb-4">Recent Queries</h2>
      <div className="space-y-2">
        {queries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent queries yet</p>
        ) : (
          queries.map((query) => (
            <button
              key={query.id}
              onClick={() => onSelect(query.query)}
              className="w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors text-sm"
            >
              <p className="line-clamp-2">{query.query}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {query.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};