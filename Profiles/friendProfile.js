import React, { useState, useEffect } from "react";

import DisplayProfile from "./displayProfile";

export default (props) => {
    const [id, setId] = useState(-1);
    const [name, setName] = useState('Loading...')
    const [profPic, setProfPic] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png')
    const [friends, setFriends] = useState([])
    const [events, setEvents] = useState([])

    const fetchData = () => {
        const url = `http://yolo-backend.herokuapp.com/user/${props.route.params.id}`;
        fetch(url)
            .then(res => res.json())
            .then(resJson => {
                setId(props.route.params.id)
                setName(resJson.name)
                setFriends(resJson.friends)
                setEvents(resJson.acceptedEvents)
                setProfPic(resJson.profilePic)
            })
    }

    useEffect(fetchData, [props])

    return (
        <DisplayProfile
            id={id}
            name={name}
            friends={friends}
            events={events}
            profilePic={profPic}
            navigation={props.navigation}
            editable={false}
        />
    );
}
