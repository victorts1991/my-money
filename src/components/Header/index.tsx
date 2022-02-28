import logoImg from '../../assets/logo.svg'
import { Container, Content, LogoContainer } from './styles'

export function Header() {
    return (
        <Container>
            <Content>
                <LogoContainer>
                    <img src={logoImg} alt="My Money" />
                    <span>My Money</span>
                </LogoContainer>
                <button type="button" >Nova transação</button>
            </Content>
        </Container>
    )
}