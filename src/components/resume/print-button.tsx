'use client'

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-primary dark:bg-gradient-primary-dark text-white font-semibold rounded-full shadow-soft hover:shadow-glow dark:hover:shadow-glow-red transition-all duration-300 print:hidden"
    >
      Print page
    </button>
  )
}
