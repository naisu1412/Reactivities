import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activities'
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite'
import ActivityStore from './../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';


interface DetailParams {
    id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clearActivity } = activityStore

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        let mounted = true;
        if (match.params.id && activity.id.length === 0) {
            if (mounted) {
                loadActivity(match.params.id).then(() => {
                    initialFormState && setActivity(initialFormState);
                });
            }
        }
        return () => {
            clearActivity();
            mounted = false;
        }
    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            });

        } else {
            editActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            });
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
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => history.push('/activities')} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
