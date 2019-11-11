import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import ActivityListItem from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([groupId, activities]) => (
        <Fragment key={groupId}>
          <Label size="large" color="blue">
            {groupId}
          </Label>
          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
