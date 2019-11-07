import React, { useState, FormEvent, useContext } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  activity: act,
 }) => {

  const {createActivity,submitting, editActivity, closeEditForm} = useContext(ActivityStore);

  const initializeForm = () => {
    if (act != null) {
      return act;
    } else {
      return {
        title: "",
        city: "",
        date: '',
        description: "",
        venue: "",
        category: "",
        id: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChaned = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
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
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          floated="left"
          type="button"
          content="Cacnel"
          onClick={() => closeEditForm()}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
