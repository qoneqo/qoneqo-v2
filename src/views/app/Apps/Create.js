import React from 'react'
import { useNavigate } from 'react-router'
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';

const CreateApps = (props) => {
  const navigate = useNavigate();
  
  return (
    <>      
      <Title>Apps</Title>
      <Section>
        <Card title="Create Apps">
          
        </Card>
      </Section>
    </>
  )
}

export default CreateApps