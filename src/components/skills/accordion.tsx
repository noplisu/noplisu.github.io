import { ReactNode } from 'react'

export default function Skills({ name, children } : { name: string, children: ReactNode }) {
  return (
    <div className="collapse collapse-arrow join-item border border-base-300 bg-slate-50">
      <input type="radio" name="skills-accordion" /> 
      <div className="collapse-title text-xl font-medium">
        {name}
      </div>
      <div className="collapse-content"> 
        {children}
      </div>
    </div>
  );
}
