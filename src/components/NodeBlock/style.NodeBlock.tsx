import styled from 'styled-components'

export const NodeBlockContainer = styled.div`
    width: 90%;
    padding: 10px;
    border: 1px solid #191919;
    margin: 0 auto;
    text-align: left;
    
    .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .status {
        &.open {
            color: red;
        }
        &.closed {
            color: green;
        }
    }
`