import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  // Sample Data
  const siteVisits = [
    { week: 1, visits: 2 },
    { week: 2, visits: 3 },
    { week: 3, visits: 4 },
    { week: 4, visits: 5 },
    { week: 5, visits: 6 },
    { week: 6, visits: 7 },
    { week: 7, visits: 8 },
    { week: 8, visits: 5 },
  ];

  const trafficData = [
    { source: "Jan", active: 6, inactive: 3 },
    { source: "Feb", active: 4, inactive: 2 },
    { source: "March", active: 5, inactive: 2 },
    { source: "April", active: 7, inactive: 4 },
  ];
  
  const pieData = [
    { name: "Organic Search", value: 40 },
    { name: "Direct", value: 30 },
    { name: "Social", value: 20 },
    { name: "Referral", value: 10 },
  ];

  const campaignsData = [
    { name: "Alpha", value: 25 },
    { name: "Beta", value: 20 },
    { name: "Theta", value: 30 },
    { name: "Zeta", value: 25 },
  ];

  const pagesData = [
    { name: "pg1", value: 20 },
    { name: "pg2", value: 25 },
    { name: "pg3", value: 30 },
    { name: "pg4", value: 15 },
    { name: "pg5", value: 10 },
  ];

  const colors = ["#FF8042", "#0088FE", "#FFBB28", "#00C49F", "#FF4D4D"];

  return (
    <div className="p-6">
      {/* Cards Section */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <h3 className="text-md">Site Visits</h3>
          <p className="text-xl font-bold">2,846,548</p>
        </div>
        <div className="bg-purple-400 text-white p-4 rounded-lg">
          <h3 className="text-md">Customers</h3>
          <p className="text-xl font-bold">628</p>
        </div>
        <div className="bg-purple-600 text-white p-4 rounded-lg">
          <h3 className="text-md">Subscription</h3>
          <p className="text-xl font-bold">100</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-md">Active Clock</h3>
          <p className="text-xl font-bold">100</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded-lg">
          <h3 className="text-md">Advertising</h3>
          <p className="text-xl font-bold">50</p>
        </div>
        <div className="bg-green-700 text-white p-4 rounded-lg">
          <h3 className="text-md">Notification</h3>
          <p className="text-xl font-bold">60</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Site Visits by Week */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Site Visits by Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={siteVisits}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic and Leads Per Source */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Active Clock user By Month</h3>
          <ResponsiveContainer width="100%" height={250}>
          <BarChart data={trafficData}>
  <XAxis dataKey="source" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="active" fill="#8884d8" />
  <Bar dataKey="inactive" fill="#82ca9d" />
</BarChart>

          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Top Channels by Conversion */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Video Advertising</h3>
          <PieChart width={250} height={250}>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Top Campaigns by Conversion */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Image Advertising</h3>
          <PieChart width={250} height={250}>
            <Pie data={campaignsData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {campaignsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Top Pages by Conversion (Donut Chart) */}
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Text Advertising</h3>
          <PieChart width={250} height={250}>
            <Pie data={pagesData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
              {pagesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
