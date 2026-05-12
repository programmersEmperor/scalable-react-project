import { RouterProvider, createBrowserRouter } from 'react-router'

const lazyLoading = (module) => {
  return {
    ...module,
    Component: module.default,
  }
}

const router = createBrowserRouter([
  { path: '/', lazy: () => import('./Home').then(lazyLoading) },
])

export default function Router() {
  return <RouterProvider router={router} />
}
