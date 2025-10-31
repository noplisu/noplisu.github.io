import { ReactNode } from 'react'

export default function Skills({ name, children } : { name: string, children: ReactNode }) {
  return (
    <div className="collapse collapse-arrow bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-hard hover:shadow-medium dark:hover:shadow-glow-red transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <input type="checkbox" className="peer" /> 
      <div className="collapse-title text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
        <span className="mr-3 text-3xl">⚡</span>
        {name}
      </div>
      <div className="collapse-content peer-checked:bg-gray-50/50 dark:peer-checked:bg-gray-700/50 transition-all duration-300"> 
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
