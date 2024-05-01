import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from '@/routes/Home'
import { App } from '@/App'
import { Diseases } from '@/routes/Diseases'
import DiseaseDetail from '@/components/DiseaseDetail'
import Diagnoses from '@/routes/Diagnoses'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/diseases',
        element: <Diseases />,
      },
      {
        path: '/diseases/:diseaseid',
        element: <DiseaseDetail />,
      },
      {
        path: '/diagnoses',
        element: <Diagnoses />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
