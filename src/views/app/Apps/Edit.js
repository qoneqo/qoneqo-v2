import React from 'react'
import { useNavigate } from 'react-router'
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';

const EditApps = (props) => {
  const navigate = useNavigate();
  
  return (
    <>      
      <Title>Apps</Title>
      <Section>
        <Card title="Edit Apps">
          
        </Card>
      </Section>
    </>
  )
}

export default EditApps