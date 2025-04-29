import React, { useContext, useEffect, useState } from 'react';
import { Interest_Analysis } from '../utils/history';
import { SessionContext } from '@toolpad/core';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#8884D8'];

const History = () => {
  const Sess = useContext(SessionContext);
  const email = Sess?.user?.email;

  const [chartData, setChartData] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'not_enough_data', 'data_not_ready', 'ready', 'error'

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const response = await Interest_Analysis({ email });
        const data = response.data;

        if (data.status === 'Not enough Data') {
          setStatus('not_enough_data');
          return;
        }

        if (data.status === 'Data not ready') {
          setStatus('data_not_ready');
          return;
        }

        const formattedData = Object.entries(data.interest_areas).map(
          ([name, tags]) => ({
            name,
            value: tags.length,
          })
        );
        setChartData(formattedData);
        setStatus('ready');
      } catch (error) {
        console.error('Error fetching interest analysis:', error);
        setStatus('error');
      }
    };

    fetchData();
  }, [email]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <p>Loading interest areas...</p>;
      case 'not_enough_data':
        return <p>Not enough data to generate the chart.</p>;
      case 'data_not_ready':
        return <p>Data is not ready yet. Please try again later.</p>;
      case 'error':
        return <p>An error occurred while fetching data.</p>;
      case 'ready':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {renderContent()}
    </div>
  );
};

export default History;
