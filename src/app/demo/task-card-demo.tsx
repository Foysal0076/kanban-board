import { MOCK_TASKS } from '@/config/mock-data'
import TaskCard from '@/features/board/tasks/task-card'

const data = MOCK_TASKS

export default function TaskCardsDemo() {
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] gap-6'>
      {data.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
}
