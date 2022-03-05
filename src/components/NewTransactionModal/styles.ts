import styled from 'styled-components'

export const Container = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        background: #e7e9ee;

        border: 1px solid #d7d7d7;
        font-weight: 400;
        font-size: 1rem;

        margin-top: 1rem;

        &:nth-of-type(1) {
            margin-top: 0;
        }

        &::placeholder {
            color: var(--text-body);
        }
    }

    button[type="submit"] {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        border: 0;
        background: var(--green);
        color: #FFF;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }

    
    
`
export const TransactionTypeContainer = styled.div`
    margin: 1rem 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
interface IRadioBox {
    isActive: boolean;
    activeColor: 'green' | 'red';
}

const colors ={
    green: '#DEEDEB',
    red: '#F1DDE5'
}

export const RadioBox = styled.button<IRadioBox>`
    height: 4rem;
    width: 100%;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: ${(props) => props.isActive ? colors[props.activeColor] : 'transparent'};
    display: flex;
    justify-content: center;
    align-items: center;

    transition: border-color 0.2s;

    &:nth-of-type(1) {
        margin-right: 0.5rem;
    }

    &:hover {
        border-color: #aaa;
    }

    img {
        height: 20px;
        width: 20px;
    }

    span {
        margin-left: 1rem;
        color: var(--text-title);
    }
`

export const ErrorMessage = styled.span`
    color: var(--red);
`