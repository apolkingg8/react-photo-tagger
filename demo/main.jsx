import React from 'react'
import Wrap from '../react-photo-tagger'

React.render(
    <Wrap
        imgSrc="test.jpeg"
        width="250px"
        height="200px"
        choosingBoxStyle={{
            border: '#fff 1px solid'
        }}
        commandBoxStyle={{
            borderRadius: '5px'
        }}>
    </Wrap>
    , document.body);
