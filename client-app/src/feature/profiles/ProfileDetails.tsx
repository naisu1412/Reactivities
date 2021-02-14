import React, { useContext, useState } from 'react'
import { Button, Card, Form, Grid, Header, Tab } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { Field, Form as FinalForm } from 'react-final-form'
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { IProfile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';



const ProfileDetails = () => {
    const [editProfileMode, setEditProfileMode] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const { updateProfile, profile, updateProfileLoading } = rootStore.profileStore;

    const handleFinalFormSubmit = (values: IProfile) => {
        updateProfile(values).then(() => {
            setEditProfileMode(false);
        });
    }
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content='Profile Details' />
                    <Button floated='right' basic content={editProfileMode === false ? 'Edit Profile' : 'Cancel'} onClick={() => {
                        setEditProfileMode(!editProfileMode)
                    }} />
                </Grid.Column>

                <Grid.Column width={16} >
                    {
                        editProfileMode === false ? (
                            <Card fluid>
                                <Card.Content header={profile?.displayName} />
                                <Card.Content extra>
                                    {profile?.bio}
                                </Card.Content>
                            </Card>
                        ) : (

                                <FinalForm
                                    initialValues={profile}
                                    onSubmit={handleFinalFormSubmit}
                                    render={
                                        ({ handleSubmit, invalid, pristine }) => (
                                            <Form onSubmit={handleSubmit}>
                                                <Field name='displayName' component={TextInput} fluid placeholder='Display Name' value={profile?.displayName} />
                                                <Field name='bio' component={TextAreaInput} fluid placeholder='Bio' value={profile?.bio} />
                                                <Button primary floated='right' type='submit' content='Submit' loading={updateProfileLoading}/>
                                            </Form>
                                        )
                                    }
                                />


                            )
                    }

                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfileDetails);