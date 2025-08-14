import warehouseBg from '../assets/warehouse.jpeg';

const QuoteRequestForm = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <section className="relative w-[1200px] h-[400px]">
        {/* Background Image */}
        <img
          src={warehouseBg}
          alt="Warehouse background"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
          {/* Left Text Content */}
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold leading-snug">
              An easy way to send <br /> requests to all suppliers
            </h2>
            <p className="text-white-100 mt-3 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h3 className="text-center font-semibold mb-4 text-2xl">Send quote to suppliers</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="What item you need?"
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
              <textarea
                rows="3"
                placeholder="Type more details"
                className="w-full border rounded-md px-4 py-2 text-sm"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>PCS</option>
                  <option>KG</option>
                  <option>Liters</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm w-full"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteRequestForm;
