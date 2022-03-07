import React from 'react'
import { useNavigate } from 'react-router'
import Card from '../../../components/Card';
import Section from '../../../components/Section';
import Title from '../../../components/Title';

const EditUsers = (props) => {
  const navigate = useNavigate();
  
  return (
    <>      
      <Title>Users</Title>
      <Section>
        <Card title="Edit Users">
          
        </Card>
      </Section>
    </>
  )
}

export default EditUsers