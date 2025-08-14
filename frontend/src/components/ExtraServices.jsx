import img2 from "../assets/9.png";
import img4 from "../assets/images (7).jpeg";
import img1 from "../assets/nn.jpeg";
import img3 from "../assets/ship.jpeg";

const extraServices = [
  {
    line1: "Source from industry",
    line2: " Hubs",
    img: img1,
  },
  {
    line1: "Customize Your",
    line2: "Products",
    img: img2,
  },
  {
    line1: "Fast, reliable shipping by",
    line2: "ocean or air",
    img: img3,
  },
  {
    line1: "Product monitoring and",
    line2: "Inspection",
    img: img4,
  },
];

const ExtraServices = () => (
  <div className="p-6 bg-white mb-7 mt-4">
    <h2 className="text-2xl font-semibold mb-6">Our extra services</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {extraServices.map((item, index) => (
        <div
          key={index}
          className="border rounded-md overflow-hidden shadow-sm hover:shadow-md bg-white"
        >
          <img
            src={item.img}
            alt={`${item.line1} ${item.line2}`}
            className="w-full h-28 object-cover"
          />
          <div className="p-3">
            <p className="text-sm text-gray-800 font-medium leading-tight">
              {item.line1}<br />
              {item.line2}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ExtraServices;
