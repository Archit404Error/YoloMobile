import React, { forwardRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../styles";

export default forwardRef((props, ref) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [unselectedTags, setUnselectedTags] = useState(props.tagList);
    const [changed, setChanged] = useState(false);

    return (
        <RBSheet
            ref={ref}
            height={300}
            openDuration={250}
            closeOnDragDown={true}
            onOpen={() => setChanged(false)}
            onClose={() => { if (changed) props.setFilters(selectedTags) }}
        >
            <Text style={[styles.boldSubHeader, { margin: 5 }]}>Select Event Filters (Tap on tags)</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {
                    selectedTags.map((tag, index) => (
                        <>
                            <TouchableOpacity key={index + "unfilter"} style={styles.inverseTag} onPress={() => {
                                setSelectedTags(selectedTags.filter(elem => elem !== tag).sort())
                                setUnselectedTags([...unselectedTags, tag].sort())
                                setChanged(true)
                            }}>
                                <Text style={{ color: "white" }}>{tag}</Text>
                                <AntDesign style={{ position: "absolute", right: -7.5, top: -7.5 }} name="closecircle" size={15} color="red" />
                            </TouchableOpacity>
                        </>
                    ))
                }
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {
                    unselectedTags.map((tag, index) => (
                        <TouchableOpacity key={index + "filter"} onPress={() => {
                            setUnselectedTags(unselectedTags.filter(elem => elem !== tag).sort())
                            setSelectedTags([...selectedTags, tag].sort())
                            setChanged(true)
                        }}>
                            <Text style={styles.tag}>{tag}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </RBSheet>
    )
})