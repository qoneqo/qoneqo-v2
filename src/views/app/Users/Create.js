import React from 'react'
import { useNavigate } from 'react-router'
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';

const CreateUsers = (props) => {
  const navigate = useNavigate();
  
  return (
    <>      
      <Title>Users</Title>
      <Section>
        <Card title="Create Users">
          
        </Card>
      </Section>
    </>
  )
}

export default CreateUsers