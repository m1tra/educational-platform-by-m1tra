import { MessageSquare } from "lucide-react"
import type { Comment } from "@/src/entities/course/types"

interface CommentsSectionProps {
  comments: Comment[]
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  return (
    <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare size={18} />
        <h2 className="font-medium">{comments.length} Комментарий</h2>
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg mb-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0"></div>
            <div>
              <div className="font-medium">{comment.author}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{comment.text}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
