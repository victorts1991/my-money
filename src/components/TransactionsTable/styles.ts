import styled from "styled-components";

export const Container = styled.div`
    margin-top: 4rem;

    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;

            &:first-child {
                color: var(--text-title);
            }

            &.deposit {
                color: var(--green); 
            }

            &.withdraw {
                color: var(--red); 
            }

            button {
                border: 0;
                background: transparent;
            }
        }

        @media(max-width: 720px) {
            display: none;
        }
    }
`

export const SmallScreen = styled.div`
    display: none;

    div {
        background: var(--shape);
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        border-radius: 0.25rem;
        margin-bottom: 1rem;

        &:last-child {
            margin-bottom: 0;
        }

        span {
            color: var(--text-title);
            margin-bottom: 0.25rem;

            &.deposit {
                color: var(--green); 
                font-size: 1.5rem;
            }

            &.withdraw {
                color: var(--red); 
                font-size: 1.5em;
            }
        }

        header {
            display: flex;
            justify-content: space-between;

            button {
                border: 0;
                background: transparent;
            }
        }

        footer {
            display: flex;
            justify-content: space-between;
            
            span {
                color: var(--text-body);
            }
            
        }
    }

    
    
    @media(max-width: 720px) {
        display: block;
    }
`

export const EmptyMessage = styled.span`
    display: flex;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 5rem;
    color: var(--text-title);
`