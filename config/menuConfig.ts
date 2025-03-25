import {
  Dashboard,
  Person,
  People,
  List,
  PostAdd,
  Security,
} from '@mui/icons-material';
import { NavigateFunction } from 'react-router-dom';
import { MenuItem } from '@/base/components/menu/types';
import DashboardPage from '@/app/dashboard/Dashboard';
import TaskList from '@/app/task/TaskList';
import RoleList from '@/app/role/RoleList';
import TaskForm from '@/app/task/TaskForm';
import PersonList from '@/app/person/PersonList';
import PersonForm from '@/app/person/PersonForm';

const getMenuItems = (navigate?: NavigateFunction): MenuItem[] => [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Dashboard,
    badge: 3,
    onClick: () => navigate && navigate('/'),
    route: '/',
    component: DashboardPage,
  },
  {
    id: 'cadastro',
    title: 'Cadastros',
    icon: Person,
    items: [
      {
        id: 'pessoas',
        title: 'Pessoas',
        icon: People,
        items: [
          {
            id: 'pessoas-listagem',
            title: 'Listagem',
            icon: List,
            onClick: () => navigate && navigate('/pessoas-listagem'),
            route: '/pessoas-listagem',
            component: PersonList,
          },
          {
            id: 'pessoas-cadastro',
            title: 'Cadastro',
            icon: PostAdd,
            onClick: () => navigate && navigate('/pessoas-cadastro'),
            route: '/pessoas-cadastro',
            component: PersonForm,
          },
        ],
      },
      {
        id: 'tarefas',
        title: 'Tarefas',
        icon: List,
        items: [
          {
            id: 'tarefas-listagem',
            title: 'Listagem',
            icon: List,
            onClick: () => navigate && navigate('/tarefas-listagem'),
            route: '/tarefas-listagem',
            component: TaskList,
          },
          {
            id: 'tarefas-cadastro',
            title: 'Cadastro',
            icon: PostAdd,
            onClick: () => navigate && navigate('/tarefas-cadastro'),
            route: '/tarefas-cadastro',
            component: TaskForm,
          },
        ],
      },
      {
        id: 'roles',
        title: 'Roles',
        icon: Security,
        items: [
          {
            id: 'roles-listagem',
            title: 'Listagem',
            icon: List,
            onClick: () => navigate && navigate('/roles-listagem'),
            route: '/roles-listagem',
            component: RoleList,
          },
          {
            id: 'roles-cadastro',
            title: 'Cadastro',
            icon: PostAdd,
          },
        ],
      },
    ],
  },
];

export default getMenuItems;
