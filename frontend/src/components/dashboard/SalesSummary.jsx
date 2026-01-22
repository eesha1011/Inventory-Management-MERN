import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "3/12", sales: 2500 },
  { day: "2/16", sales: 1500 },
  { day: "2/8", sales: 500 },
  { day: "1/23", sales: 1400 },
  { day: "1/8", sales: 4800 }
];

const SalesSummary = () => {

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition h-full flex flex-col">
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sales Summary</h3>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            $12.98m{" "}
            <span className="text-green-500 text-sm font-medium">+5.48%</span>
          </h2>
        </div>

        <select className="border px-2 py-1 text-sm rounded text-gray-900 dark:text-gray-100">
          <option className="dark:text-gray-900">Weekly</option>
          <option className="dark:text-gray-900">Monthly</option>
        </select>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height={"100%"}>
          <BarChart data={data} barCategoryGap={24}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="sales"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              barSize={16}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-sm text-gray-800 mt-2">
        <span>5 days</span>
        <span>Highest Sales Date: <span className="font-bold ">1/8/24</span></span>
      </div>
    </div>
  )

  // const [summary, setSummary] = useState({
  //   orders: 0,
  //   revenue: 0,
  //   productsSold: 0,
  //   avgOrderValue: 0,
  // });

  // useEffect(() => {
  //   const products = JSON.parse(localStorage.getItem("products")) || [];

  //   const orders = products.length;
  //   const revenue = products.reduce((acc, p) => acc + (p.price || 0), 0);
  //   const productsSold = products.reduce((acc, p) => acc + (p.qty || 1), 0);
  //   const avgOrderValue = orders ? Math.round(revenue / orders) : 0;

  //   setSummary({ orders, revenue, productsSold, avgOrderValue });
  // }, []);

  // return (
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  //     <SalesCard title="Total Orders" value={summary.orders} icon={ShoppingCart}/>
  //     <SalesCard title="Total Revenue" value={`₹${summary.revenue}`} icon={IndianRupee}/>
  //     <SalesCard title="Products Sold" value={summary.productsSold} icon={PackageCheck}/>
  //     <SalesCard title="Avg Order Value" value={`₹${summary.avgOrderValue}`} icon={TrendingUp}/>
  //   </div>
  // )
}
 
export default SalesSummary;