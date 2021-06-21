import styled from 'styled-components'

export const IssueDescribeContainer = styled.div`
    .status {
        &.open {
            color: red;
        }
        &.closed {
            color: green;
        }
    }
    .body {
        text-align: left;
    }
`