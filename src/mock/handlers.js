/* eslint-disable no-plusplus */
import { http, HttpResponse } from 'msw';

let data = [
  {
    id: 1,
    title: 'React 공부하기',
  },
  {
    id: 2,
    title: '타입스트립트 공부하기',
  },
  {
    id: 3,
    title: 'next.js 공부하기',
  },
  {
    id: 4,
    title: 'javascript 공부하기',
  },
  {
    id: 5,
    title: 'useEffect 공부하기',
  },
];

const dashboardsData = [
  {
    id: 1,
    title: 'dashboard_1',
  },
  {
    id: 2,
    title: 'dashboard_2',
  },
  {
    id: 3,
    title: 'dashboard_3',
  },
];

const dashboardTodos = {
  1: [
    {
      id: 1,
      title: 'React 공부하기',
    },
    {
      id: 2,
      title: '타입스트립트 공부하기',
    },
    {
      id: 3,
      title: 'next.js 공부하기',
    },
  ],
  2: [
    {
      id: 4,
      title: 'javascript 공부하기',
    },
    {
      id: 5,
      title: 'useEffect 공부하기',
    },
  ],
  3: [
    {
      id: 6,
      title: 'SSR 공부하기',
    },
    {
      id: 7,
      title: '상태관리',
    },
  ],
};

const getDashboards = http.get('/dashboards', () =>
  HttpResponse.json(dashboardsData, { status: 200 }),
);

const getDashboardsTodos = http.get('/dashboards/:id/todos', ({ params }) =>
  HttpResponse.json(dashboardTodos[Number(params.id)], { status: 200 }),
);

const getTodos = http.get('/todos', () =>
  HttpResponse.json(data, { status: 200 }),
);

const deleteTodo = http.delete('/todos/:id', ({ params }) => {
  data = data.filter(d => d.id !== Number(params.id));
  return HttpResponse.json({ id: Number(params.id) }, { status: 202 });
});

const putTodo = http.put('/todos/:id', async ({ params, request }) => {
  const todo = data.find(d => d.id === Number(params.id));
  const newTodo = await request.json();
  todo.title = newTodo.title;
  return HttpResponse.json({ ...todo }, { status: 201 });
});

let id = 10;
const postTodo = http.post('/todos', async ({ request }) => {
  const newTodo = await request.json();
  const todo = {
    id: id++,
    title: newTodo.title,
  };
  data.push(todo);
  return HttpResponse.json(todo, { status: 201 });
});

const handlers = [
  getTodos,
  putTodo,
  deleteTodo,
  postTodo,
  getDashboards,
  getDashboardsTodos,
];

export default handlers;

// GET method, /todos
// fetch('/todos')
// [{id, title}]
