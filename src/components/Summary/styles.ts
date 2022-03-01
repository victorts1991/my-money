import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: -10rem;

    div {
        background: var(--shape);
        padding: 1.5rem 2rem; 
        border-radius: 0.25rem;
        color: var(--text-title);
        margin-left: 2rem;
        width: 100%;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            background: var(--green);
            color: #FFF;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        strong {
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 500;
        }
    }
    
`