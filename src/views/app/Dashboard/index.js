import React from 'react';
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import BarChart from '../../../components/Charts/BarChart';
import ColumnChart from '../../../components/Charts/ColumnChart';
import LineChart from '../../../components/Charts/LineChart';
import PieChart from '../../../components/Charts/PieChart';

const Dashboard = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Section className="section-card flex justify-between w-full flex-col md:flex-row">
        <Card title="Total Users" className="w-full my-2 md:w-1/3">
          <p>50.000.000</p>
        </Card>
        <Card title="Total Views" className="w-full my-2 md:w-1/3 md:mx-3">
          <p>29.000.000</p>
        </Card>
        <Card title="Bounce Rate" className="w-full my-2 md:w-1/3">
          <p>23.000</p>
        </Card>
      </Section>
      <Section className="flex flex-col md:flex-row">
        <Card
          title="Total Views"
          className="w-full relative md:w-1/2 h-full my-2"
        >
          <LineChart
            categories={['2019', '2020', '2021', '2022']}
            data={[1002, 2030, 1540, 1801]}
            options={{ chart: { height: '300px' } }}
          />
        </Card>
        <Card
          title="Bounce Rate"
          className="w-full relative md:w-1/2 md:ml-3 h-full my-2"
        >
          <ColumnChart
            categories={['2019', '2020', '2021', '2022']}
            data={[120, 210, 150, 180]}
            options={{ chart: { height: '300px' } }}
          />
        </Card>
      </Section>
    </>
  );
};

export default Dashboard;
