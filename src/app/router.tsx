import { RouterProvider, createBrowserRouter } from 'react-router'

const lazyLoading = (module) => {
  return {
    ...module,
    Component: module.default,
  }
}

const router = createBrowserRouter([
  { path: '/', lazy: () => import('./Home').then(lazyLoading) },
  { path: '/login', lazy: () => import('./Login').then(lazyLoading) },
])

export default function Router() {
  return <RouterProvider router={router} />
}
