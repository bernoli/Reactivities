import React, { Component } from "react";
import axios from "axios";
import { Header, Icon, Container, List, ListItem } from "semantic-ui-react";
import { IActivity } from "../models/activity";

interface IState {
  activities: IActivity[];
}

class App extends Component<{}, IState> {
  readonly state: IState = {
    activities: []
  };

  componentDidMount() {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(res => {
        this.setState({ activities: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let activitiesElement = null;
    if (this.state.activities) {
      activitiesElement = (
        <List>
          {this.state.activities.map((activity: IActivity) => (
            <ListItem key={activity.id}>
              {activity.title} - {activity.city} - {activity.venue} - [
              {activity.date}]
            </ListItem>
          ))}
        </List>
      );
    }
    return (
      <div>
        <Container>
          <Header as="h2">
            <Icon name="users" />
            <Header.Content>Reactivities</Header.Content>
          </Header>
          {activitiesElement}
        </Container>
      </div>
    );
  }
}

export default App;
