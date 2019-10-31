import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, Container, List, ListItem } from "semantic-ui-react";
import { IActivity } from "../models/activity";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);  
  // note that we must add the empty array [], since useEffect is called anytime the component is rendered.
  // and we want to make sure it runs only once (in order to mimic the componentDidMount)
  // see more details https://reactjs.org/docs/hooks-intro.html
  // If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as:
  // componentDidMount, componentDidUpdate, and componentWillUnmount combined.
  // The array is used to control when should the useEffect be called, when it is empty, it means, never (after first time).

  return (
    <div>
      <Container>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {activities.map((activity: IActivity) => (
            <ListItem key={activity.id}>
              {activity.title} - {activity.city} - {activity.venue} - [
              {activity.date}]
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default App;
