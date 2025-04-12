export default function loading () {
    return (
        <div className="bg-[#fffbe8] h-[100vh]">
            <header className="relative flex justify-between items-center w-full p-4 bg-gradient-to-r from-red-400 to-red-500 shadow-md">
                <div className="w-32 h-32 bg-white border-white rounded-full shadow-md" ></div>
                <div className="text-right text-sm font-semibold text-white flex flex-col items-end">
                    <p className="flex gap-1 items-center w-24 h-3 bg-gray-50 mt-2 rounded-xl"></p>
                    <p className="flex gap-1 items-center w-24 h-3 bg-gray-50 mt-2 rounded-xl"></p>
                    <p className="flex gap-1 items-center w-24 h-3 bg-gray-50 mt-2 rounded-xl"></p>
                </div>
            </header>
            <div className="max-w-2xl mx-auto p-6">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="space-y-4">
                    {/* Título de categoría */}
                    <div className="h-6 w-40 bg-gray-50 rounded-md"></div>

                    {/* Lista de productos */}
                    {Array.from({ length: 3 }).map((_, idx2) => (
                        <div key={idx2} className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-32 bg-gray-50 rounded"></div>
                                <div className="flex-1 border-b border-dashed border-gray-300"></div>
                                <div className="h-4 w-16 bg-gray-50 rounded"></div>
                            </div>
                            <div className="h-3 w-48 bg-gray-50 rounded ml-2"></div>
                        </div>
                    ))}
                </div>
            ))}
            </div>

        </div>
    )
}
