import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import { ActivityDetailsInfo } from './ActivityDetailsInfo';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';

interface DetailParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { activity, loadActivity, loadingInitial } = rootStore.activityStore;



    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id, history])

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

    if (!activity) return <h2>Activity not found</h2>;



    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSideBar attendees={activity.attendees} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
