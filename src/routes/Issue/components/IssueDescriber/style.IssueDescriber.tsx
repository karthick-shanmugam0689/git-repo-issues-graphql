import styled from 'styled-components'

export const IssueDescribeContainer = styled.div`
    .status {
        &.open {
            color: ${props => props.theme.open};
        }
        &.closed {
            color: ${props => props.theme.closed};
        }
    }
    .body {
        text-align: left;
    }
`