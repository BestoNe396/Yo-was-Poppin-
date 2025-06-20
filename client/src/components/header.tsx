export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          {/* CP Branding */}
          <div className="cp-brand text-2xl w-12 h-12 flex items-center justify-center">
            CP
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Gabe P</h1>
            <p className="text-sm text-gray-600">Contact Portal</p>
          </div>
        </div>
      </div>
    </header>
  );
}
