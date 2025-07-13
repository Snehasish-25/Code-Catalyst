import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  useGetAllPurchasedCoursesQuery
} from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  DollarSign,
  ShoppingCart
} from "lucide-react";

//Define pie chart colors
const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ffbb28", "#00C49F", "#845EC2"
];

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllPurchasedCoursesQuery();
  if(data)
  console.log(data);

  if (isLoading)
    return <h1 className="text-center text-lg">Loading...</h1>;

  if (isError)
    return <h1 className="text-center text-red-500">Failed to get purchased courses</h1>;

  const purchasedCourses = data?.data || [];

  // Calculate total revenue and sales
  const totalRevenue = purchasedCourses.reduce((acc, item) => acc + (item.amount || 0), 0);
  const totalSales = purchasedCourses.length;

  // Prepare data for line chart (price overview)
  const lineChartData = purchasedCourses.map((purchase) => ({
    name: purchase.courseId?.title || "Unknown",
    price: purchase.courseId?.coursePrice || 0
  }));

  //Prepare data for pie chart (sales per course)
  const salesCountMap = {};
  purchasedCourses.forEach((purchase) => {
    const courseTitle = purchase.courseId?.title || "Unknown";
    salesCountMap[courseTitle] = (salesCountMap[courseTitle] || 0) + 1;
  });

  const pieChartData = Object.entries(salesCountMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 -mt-12 text-gray-800 dark:text-gray-100">
        📊 Instructor Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">

        {/* Total Sales */}
        <div className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="flex items-center gap-2 p-1">
              <ShoppingCart className="text-blue-500 dark:text-blue-400" />
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                {totalSales}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Courses Purchased</p>
            </CardContent>
          </Card>
        </div>

        {/* Total Revenue */}
        <div className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md">
            <CardHeader className="flex items-center gap-2 p-1">
              <DollarSign className="text-green-500 dark:text-green-400" />
              <CardTitle className="text-gray-900 dark:text-gray-100 text-lg font-semibold">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                ₹{totalRevenue}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Lifetime Earnings</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Line Chart: Course Prices */}
      <div className="rounded-2xl overflow-hidden mb-6">
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              💰 Course Prices Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#ccc" />
                <XAxis stroke="#6b7280"  interval={0} />
                <YAxis  stroke="#6b7280" />
                <RechartTooltip
                  contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #ccc" }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart: Sales Distribution */}
      <div className="rounded-2xl overflow-hidden">
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              📈 Sales Distribution by Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300} className="ml-12">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                 
                >
                  {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <RechartTooltip
                  contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #ccc" }}
                  formatter={(value, name) => [`${value} purchases`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

