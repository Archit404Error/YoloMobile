import React from "react";
import { useEffect, useState } from "react";
import Details from './EventDetails';

export default ({ navigation, route }) => {
    const [id, setId] = useState("-1")
    const [title, setTitle] = useState("Loading...")
    const [image, setImage] = useState("https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg")
    const [desc, setDesc] = useState("Loading...")
    const [loc, setLoc] = useState("Loading...")
    const [startDate, setStart] = useState(new Date())
    const [endDate, setEnd] = useState(new Date())
    const [attendees, setAttendees] = useState([])

    useEffect(() => {
        if (route.params.title) {
            setId(route.params.id)
            setTitle(route.params.title)
            setImage(route.params.image)
            setDesc(route.params.description)
            setLoc(route.params.location)
            setStart(route.params.startDate)
            setEnd(route.params.endDate)
            setAttendees(route.params.attendees)
        } else {
            fetch(`http://yolo-backend.herokuapp.com/event/${route.params.id}`)
                .then(res => res.json())
                .then(json => {
                    setId(json.id)
                    setTitle(json.title)
                    setImage(json.image)
                    setDesc(json.description)
                    setLoc(json.location)
                    setStart(new Date(json.startDate))
                    setEnd(new Date(json.endDate))
                    setAttendees(json.attendees)
                })
        }
    }, [])

    return (
        <Details
            id={id}
            title={title}
            image={image}
            description={desc}
            location={loc}
            startDate={startDate}
            endDate={endDate}
            attendees={attendees}
            navigation={navigation}
        />
    )
}