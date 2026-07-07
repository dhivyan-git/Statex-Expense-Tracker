export default function CategoryProgress({ data = [] }) {

  const total = data.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const sortedData = [...data].sort(
    (a, b) => b.total - a.total
  );

  return (

    <div className="space-y-6">

      {sortedData.map((item) => {

        const percent =
          total === 0
            ? 0
            : (item.total / total) * 100;

        return (

          <div
            key={item.category}
          >

            <div className="mb-2 flex items-center justify-between">

              <span className="font-medium text-white">

                {item.category}

              </span>

              <span className="font-semibold text-white">

                ₹{item.total.toLocaleString()}

              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
                style={{
                  width: `${percent}%`,
                }}
              />

            </div>

          </div>

        );

      })}

    </div>

  );

}