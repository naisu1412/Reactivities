import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { ActivityFromValues } from '../../../app/models/activities'
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite'
import ActivityStore from './../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import { DateInput } from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: 'Description need to be at least 5 characters' })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time'),
})

interface DetailParams {
    id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, loadActivity } = activityStore
    const [loading, setLoading] = useState(false);

    const [activity, setActivity] = useState(new ActivityFromValues());

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id).then((activity) => {
                setActivity(new ActivityFromValues(activity));
            }).finally(() => {
                setLoading(false);
            });
        }

    }, [loadActivity, match.params.id]);

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;

        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity)
        } else {
            editActivity(activity)
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field placeholder='Title' component={TextInput} name='title' value={activity.title} />
                                <Field component={TextAreaInput} rows={3} name='description' placeholder='Description' value={activity.description} />
                                <Field component={SelectInput} options={category} name='category' placeholder='Category' value={activity.category} />
                                <Form.Group widths='equal'>
                                    <Field component={DateInput} name='date' date={true} placeholder='Date' value={activity.date} />
                                    <Field component={DateInput} name='time' time={true} placeholder='Time' value={activity.date} />
                                </Form.Group>
                                <Field component={TextInput} name='city' placeholder='City' value={activity.city} />
                                <Field component={TextInput} name='venue' placeholder='Venue' value={activity.venue} />
                                <Button loading={submitting} floated='right' positive type='submit' content='Submit' disabled={loading || invalid || pristine} />
                                <Button onClick={activity.id
                                    ? () => history.push(`/activities/${activity.id}`)
                                    : () => history.push(`/activities`)
                                } floated='right' type='button' content='Cancel' disabled={loading} />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm);
