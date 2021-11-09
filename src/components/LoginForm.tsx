import React, {FC, useState} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const LoginForm: FC = () => {

    const {isLoading, error} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {login} = useActions()


    const submit = () => {
        login(username, password)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            onFinish={submit}
        >
            {error &&  <div style={{color: "red"}}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value) }/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required("Please input your password")]}
            >
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;