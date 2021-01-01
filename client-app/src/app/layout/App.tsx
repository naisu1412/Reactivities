import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';
import { IActivity } from '../models/activities';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data);
      });
  }, []);



  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>

      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>

    </div>
  );

}

export default App;
