import {Button, Row, Modal, Layout, DatePicker} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify="center">
                <Button
                    onClick={() => setModalVisible(true)}>
                    add event
                </Button>
            </Row>
            <Modal
                title="add event"
                footer={null}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    submit={addNewEvent}
                    guests={guests}/>
            </Modal>
        </Layout>
    );
};

export default Event;