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
        }
    }
`

export const EmptyMessage = styled.span`
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 5rem;
    color: var(--text-title);
`