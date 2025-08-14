const Regions = () => {
  const regions = [
    { name: "Arabic Emirates", domain: "shopname.ae", code: "ae" },
    { name: "Australia", domain: "shopname.com.au", code: "au" },
    { name: "United States", domain: "shopname.us", code: "us" },
    { name: "Russia", domain: "shopname.ru", code: "ru" },
    { name: "Italy", domain: "shopname.it", code: "it" },
    { name: "Denmark", domain: "shopname.dk", code: "dk" },
    { name: "France", domain: "shopname.fr", code: "fr" },
    { name: "China", domain: "shopname.cn", code: "cn" },
    { name: "Great Britain", domain: "shopname.co.uk", code: "gb" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-8 -mt-4">Suppliers by region</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {regions.map((region, index) => (
          <div key={index} className="flex items-center space-x-3 text-sm text-gray-700">
            <img
              src={`https://flagcdn.com/w40/${region.code}.png`}
              alt={region.name}
              className="w-8 h-6 object-cover rounded-sm"
            />
            <div className="flex flex-col leading-tight">
              <span>{region.name}</span>
              <span className="text-xs text-gray-500">{region.domain}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;
