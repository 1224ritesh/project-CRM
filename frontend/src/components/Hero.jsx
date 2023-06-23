import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
        <Container className="d-flex justify-content-center">
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4">Welcome to the Corp-Wise Connect</h1>
                <p>
                    This is the platform where you can get CA & CS services at your fingertips. 
                </p>
                <div className="d-flex">
                    <LinkContainer to='/login'>
                        <Button variant="primary" className="me-3" >
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Search your CA & CS</span>
                        </Button>
                    </LinkContainer>
                    
                    <LinkContainer to='/login'>
                        <Button variant="secondary" >
                            <i className="bi bi-box-arrow-in-left"></i>
                            <span>CA & CS</span>
                        </Button>
                    </LinkContainer>
                    
                </div>
             
            
            </Card>

        </Container>
    </div>
  )
}

export default Hero