import BoardPageLayout from '@/features/board/board-page-layout'
import TaskList from '@/features/board/tasks/task-list'

export default function Board() {
  return (
    <BoardPageLayout>
      <TaskList />
    </BoardPageLayout>
  )
}
