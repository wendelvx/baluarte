import { X } from 'lucide-react'

export default function MobileMenu({ isOpen, onClose, links, onNavigate }) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside
        className="
          fixed inset-y-0 right-0 z-50
          w-4/5 max-w-sm
          bg-white shadow-xl
          p-6
          flex flex-col
          animate-slide-in
        "
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-lg font-semibold text-slate-800">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                onNavigate(link.target)
                onClose()
              }}
              className="text-slate-700 text-lg font-medium text-left hover:text-emerald-700 transition"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
