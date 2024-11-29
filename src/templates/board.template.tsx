import BoardPageLayout from '@/features/board/board-page-layout'
import TaskBoard from '@/features/board/task/task-board'

export default function Board() {
  return (
    <BoardPageLayout>
      <TaskBoard />
    </BoardPageLayout>
  )
}
