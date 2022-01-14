import React from 'react'
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Loader from '../../../components/Loader';
import BarChart from '../../../components/Charts/BarChart';

const Dashboard = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Section>
        <div className="flex justify-between w-full">
          <Card className="w-1/3" title="Total Users">
            <p>50.000.000</p>
          </Card>
          <Card className="w-1/3 mx-3" title="Total Views">
            <p>29.000.000</p>
          </Card>
          <Card className="w-1/3" title="Bounce Rate">
            <p>23.000</p>
          </Card>
        </div>
      </Section>

      <Section>
        <BarChart data={[25,30,10]} categories={['2010', '2011', '2012']} />  
      </Section>
      <Loader />
    </>
  )
}

export default Dashboard
