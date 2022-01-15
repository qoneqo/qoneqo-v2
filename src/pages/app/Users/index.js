import React from 'react'
import Title from '../../../components/Title';
import Section from '../../../components/Section';
import Card from '../../../components/Card';
import Datatable from '../../../components/Datatable';

const Users = () => {
  return (
    <>
      <Title>Users</Title>
      <section>
      <Section>
        <Card title="List Users">
          <Datatable />
        </Card>        
      </Section>
      </section>
    </>
  )
}

export default Users
