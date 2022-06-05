import React, { useContext } from "react";

import DisplayProfile from "./displayProfile";
import Context from '../Context/context';

export default ({ navigation }) => {

    const context = useContext(Context);

    return (
        <DisplayProfile
            id={context.id}
            name={context.fullName}
            events={context.acceptedEvents}
            friends={context.friends}
            profilePic={context.profilePic}
            navigation={navigation}
            editable={true}
        />
    );
}