import { ReactNode } from 'react'

export default function Skills({ name, children } : { name: string, children: ReactNode }) {
  return (
    <div className="collapse collapse-arrow bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
      <input type="checkbox" className="peer" /> 
      <div className="collapse-title text-2xl font-bold text-gray-800 flex items-center">
        <span className="mr-3 text-3xl">⚡</span>
        {name}
      </div>
      <div className="collapse-content peer-checked:bg-gray-50/50 transition-all duration-300"> 
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
