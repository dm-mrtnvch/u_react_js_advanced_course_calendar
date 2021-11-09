import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const NavBar: FC = () => {

    const router = useHistory()
    const dispatch = useDispatch()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions()

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                   <>
                       <div style={{color: "white"}}>{user.username}</div>
                       <Menu theme="dark" mode="horizontal" selectable={false}>
                           <Menu.Item
                               key="1"
                               onClick={logout}
                           >
                               logout
                           </Menu.Item>
                       </Menu>
                   </>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            key="1"
                            onClick={() => router.push(RouteNames.LOGIN)}
                        >
                            log in
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default NavBar;