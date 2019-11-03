import React from "react";
import { IActivity } from "../../../app/models/activity";
import { Card, Image, Button } from "semantic-ui-react";

interface IProps {
  activity: IActivity;
  setEditMode:(editModel:boolean)=>void;
  setSelectActivity:(activity:IActivity|null)=>void;
}

const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, setSelectActivity }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          {/* widths cause the button to fill the enitre space available  */}
          <Button color="blue" content="Edit" onClick={()=>setEditMode(true)}/>
          <Button color="grey" content="Cancel" onClick={()=>setSelectActivity(null)} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
