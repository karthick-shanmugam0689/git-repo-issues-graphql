import styled from 'styled-components'

export const NodeBlockContainer = styled.div`
    width: 90%;
    padding: 10px;
    border: 1px solid ${props => props.theme.border};
    margin: 0 auto;
    text-align: left;
    position: relative;
    
    .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .status {
        &.open {
            color: ${props => props.theme.open};
        }
        &.closed {
            color: ${props => props.theme.closed};
        }
    }

    .wrap-lines {
        margin-bottom: 20px;
        overflow: hidden;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        font-size: 15px;
        line-height: 1.4;
        max-width: 90%;
        display: block;
        display: -webkit-box;
    }

    .to-issue {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .show-more {
        text-decoration: underline;
        border: none;
        background-color: ${props => props.theme.main};
    }
`