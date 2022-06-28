import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../Components/filterModal";

export default ({ setFilters }) => {
    const filterModal = useRef();

    return (
        <>
            <TouchableOpacity onPress={() => filterModal.current.open()}>
                <Ionicons name={"md-funnel-outline"} size={25} style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <FilterModal
                ref={filterModal}
                setFilters={setFilters}
                tagList={["meetups", "parties", "sports", "clubs", "comedy", "recruiting"]}
            />
        </>
    )
}