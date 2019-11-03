import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps{
    createActivity: () => void;
}

const NavBar : React.FC<IProps>= ({createActivity}) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={createActivity}></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
