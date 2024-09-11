import React from "react"
import {
    Box,
    Typography
} from "@mui/material"
import {
    styled
} from "@mui/system"

// Styled components
const EmojiContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
})

const EmojiWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 10px",
})

const EmojiIcon = styled(Box)(({
    selected,
    interactive
}) => ({
    fontSize: "30px",
    border: selected ? "2px blue solid" : "none",
    borderRadius: "50%",
    transition: "border 0.2s ease-in-out",
    cursor: interactive ? "pointer" : "default",
    transition: "transform 0.3s ease",
    "&:hover": interactive ? {
        transform: "scale(1.5)"
    } : {},
}))

function EmojiReaction({
    selectedEmoji,
    onReaction,
    interactive = false
}) {
    const emojis = [{
            name: "happy",
            label: "Happy",
            symbol: "😊"
        },
        {
            name: "neutral",
            label: "Neutral",
            symbol: "😐"
        },
        {
            name: "sad",
            label: "Sad",
            symbol: "😢"
        },
        {
            name: "slightly sad",
            label: "Slightly Sad",
            symbol: "😟"
        },
        {
            name: "slightly happy",
            label: "Slightly Happy",
            symbol: "🙂"
        },
    ]

    return ( <
        EmojiContainer > {
            emojis.map((emoji) => ( <
                EmojiWrapper key = {
                    emoji.name
                } >
                <
                EmojiIcon selected = {
                    selectedEmoji === emoji.name
                }
                interactive = {
                    interactive
                }
                onClick = {
                    interactive ? () => onReaction(emoji.name) : undefined
                } > {
                    emoji.symbol
                } <
                /EmojiIcon> <
                Typography variant = "body2"
                sx = {
                    {
                        fontSize: "10px"
                    }
                } > {
                    emoji.label
                } < /Typography> < /
                EmojiWrapper >
            ))
        } <
        /EmojiContainer>
    )
}

export default EmojiReaction