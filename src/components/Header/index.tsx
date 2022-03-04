import { useState } from 'react'

import logoImg from '../../assets/logo.svg'
import { Container, Content, LogoContainer } from './styles'

interface IHeader {
    onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal }: IHeader) {
    return (
        <Container>
            <Content>
                <LogoContainer>
                    <img src={logoImg} alt="My Money" />
                    <span>My Money</span>
                </LogoContainer>
                <button 
                    type="button" 
                    onClick={onOpenNewTransactionModal}
                >Nova transação</button>

                
            </Content>
        </Container>
    )
}