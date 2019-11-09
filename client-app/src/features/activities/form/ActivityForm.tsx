import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface RouteParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
  history
}) => {
  const {
    createActivity,
    submitting,
    editActivity,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = useContext(ActivityStore);

  const [activity, setActivity] = useState<IActivity>({
    title: "",
    city: "",
    date: "",
    description: "",
    venue: "",
    category: "",
    id: ""
  });


  useEffect(() => {
    if (activity.id.length === 0 && match.params.id) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }
    return () => {
      clearActivity(); // componentWillUnmount
    };
  }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);
  // those dependcies define when useEffect should run, when they change, it should.

  
  const handleInputChaned = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChaned}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChaned}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChaned}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChaned}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChaned}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChaned}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="left"
          type="button"
          content="Cacnel"
          onClick={() => history.push('/activities')}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
