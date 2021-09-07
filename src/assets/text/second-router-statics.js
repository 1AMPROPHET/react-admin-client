import Home from '../../pages/home/Home'
import Category from '../../pages/goods/category/Category'
import Manager from '../../pages/goods/manager/Manager'
import User from '../../pages/user/User'
import Role from '../../pages/role/Role'
import Bar from '../../pages/chart/bar/Bar'
import Pie from '../../pages/chart/pie/Pie'
import Line from '../../pages/chart/line/Line'

export const secondRouter = [
  {
    path: '/home',
    component: Home,
    key: 'sr1'
  },
  {
    path: '/user',
    component: User,
    key: 'sr2'
  },
  {
    path: '/role',
    component: Role,
    key: 'sr3'
  },
  {
    path: '/category',
    component: Category,
    key: 'sr4'
  },
  {
    path: '/product',
    component: Manager,
    key: 'sr5'
  },
  {
    path: '/charts/bar',
    component: Bar,
    key: 'sr6'
  },
  {
    path: '/charts/Line',
    component: Line,
    key: 'sr7'
  },
  {
    path: '/charts/pie',
    component: Pie,
    key: 'sr8'
  },
]