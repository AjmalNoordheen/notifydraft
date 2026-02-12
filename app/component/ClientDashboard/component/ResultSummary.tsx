
export const ResultSummary = ({ filteredDocuments }: { filteredDocuments: any[] }) => {
  return (
    <>
    <div className="mt-4 border-t border-blue-200 pt-3">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-blue-600">
                  {filteredDocuments.length}
                </p>
                <p className="text-xs font-medium text-gray-600">Total</p>
              </div>
              <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-red-600">
                  {
                    filteredDocuments.filter((d: any) => {
                      const daysLeft = Math.ceil(
                        (d.expiry.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      return daysLeft <= 0;
                    }).length
                  }
                </p>
                <p className="text-xs font-medium text-gray-600">Expired</p>
              </div>
              <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-orange-600">
                  {
                    filteredDocuments.filter((d: any) => {
                      const daysLeft = Math.ceil(
                        (d.expiry.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      return daysLeft <= 30 && daysLeft > 0;
                    }).length
                  }
                </p>
                <p className="text-xs font-medium text-gray-600">Soon</p>
              </div>
              <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-green-600">
                  {
                    filteredDocuments.filter((d: any) => {
                      const daysLeft = Math.ceil(
                        (d.expiry.getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      return daysLeft > 30;
                    }).length
                  }
                </p>
                <p className="text-xs font-medium text-gray-600">Safe</p>
              </div>
            </div>
          </div>
    </>
  )
}

