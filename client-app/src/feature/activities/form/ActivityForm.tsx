import React, { FormEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activities'
import { v4 as uuid } from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity,
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialFormState, createActivity, editActivity }) => {

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }

            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' onChange={handleInputChange} name='title' value={activity.title} />
                <Form.TextArea rows={2} onChange={handleInputChange} name='description' placeholder='Description' value={activity.description} />
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity.date} />
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city} />
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}
