import { COLUMN_COLORS } from '@/config/constants'
import { Board } from '@/features/board/types/board.type'
import { Subtask } from '@/features/board/types/subtask.type'
import { Task } from '@/features/board/types/task.type'
import { User } from '@/types/session-user.type'

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Snow',
    email: 'johnsnow@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '2',
    name: 'Arya Stark',
    email: 'aryastark@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '3',
    name: 'Sansa Stark',
    email: 'sansastark@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '4',
    name: 'Tyrion Lannister',
    email: 'tyrionlannister@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '5',
    name: 'Daenerys Targaryen',
    email: 'daenerystargaryen@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '6',
    name: 'Cersei Lannister',
    email: 'cerseilannister@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '7',
    name: 'Jaime Lannister',
    email: 'jaimelannister@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '8',
    name: 'Bran Stark',
    email: 'branstark@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '9',
    name: 'Jorah Mormont',
    email: 'jorahmormont@test.com',
    password: 'Test1234',
    role: 'user',
  },
  {
    id: '10',
    name: 'Samwell Tarly',
    email: 'samwelltarly@test.com',
    password: 'Test1234',
    role: 'user',
  },
]

const defaultColumns = [
  {
    title: 'Todo',
    color: COLUMN_COLORS[0],
  },
  {
    title: 'In Progress',
    color: COLUMN_COLORS[1],
  },
  {
    title: 'Completed',
    color: COLUMN_COLORS[2],
  },
]

export const MOCK_BOARDS: Board[] = [
  {
    id: '1',
    title: 'Platform Launch',
    description: 'Platform launch Description',
    owner: MOCK_USERS[0],
    invitees: [MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
    columns: defaultColumns,
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-02T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Roadmap',
    description: 'Roadmap Description',
    owner: MOCK_USERS[0],
    invitees: [MOCK_USERS[3], MOCK_USERS[4], MOCK_USERS[5]],
    columns: defaultColumns,
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-02T10:00:00Z'),
  },
]

// Mock subtasks
const MOCK_SUBTASKS: Subtask[] = [
  {
    id: '1',
    taskId: '1',
    title: 'Subtask 1',
    description: 'Description for subtask 1',
    isCompleted: false,
  },
  {
    id: '2',
    taskId: '1',
    title: 'Subtask 2',
    description: 'Description for subtask 2',
    isCompleted: true,
  },
  {
    id: '3',
    taskId: '2',
    title: 'Subtask 3',
    description: 'Description for subtask 3',
    isCompleted: false,
  },
  {
    id: '4',
    taskId: '2',
    title: 'Subtask 4',
    description: 'Description for subtask 4',
    isCompleted: true,
  },
]

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    boardId: '1',
    title: 'Task 1',
    description: 'Description for task 1',
    status: 'To Do',
    assignee: MOCK_USERS[0],
    subtasks: [MOCK_SUBTASKS[0], MOCK_SUBTASKS[1]],
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-02T10:00:00Z'),
  },
  {
    id: '2',
    boardId: '1',
    title: 'Task 2',
    description: 'Description for task 2',
    status: 'In Progress',
    assignee: MOCK_USERS[1],
    subtasks: [MOCK_SUBTASKS[2], MOCK_SUBTASKS[3]],
    createdAt: new Date('2023-01-03T10:00:00Z'),
    updatedAt: new Date('2023-01-04T10:00:00Z'),
  },
  {
    id: '3',
    boardId: '2',
    title: 'Task 3',
    description: 'Description for task 3',
    status: 'Done',
    assignee: MOCK_USERS[2],
    subtasks: [],
    createdAt: new Date('2023-01-05T10:00:00Z'),
    updatedAt: new Date('2023-01-06T10:00:00Z'),
  },
]
