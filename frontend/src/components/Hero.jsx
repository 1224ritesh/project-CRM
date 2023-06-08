import { Container, Card, Button } from "react-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
        <Container className="d-flex justify-content-center">
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                <h1 className="text-center mb-4">Welcome to the CRM</h1>
                <p>
                    This is a Company secretory CRM made with React and Bootstrap in frontend. And Node, Express, MongoDB in backend.
                </p>
                <div className="d-flex">
                    <Button variant="primary" className="me-3" href="/login">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                    </Button>
                    <Button variant="secondary" href="/register">
                        <i className="bi bi-box-arrow-in-left"></i>
                        <span>SignUp</span>
                    </Button>
                </div>
             
                
            </Card>

        </Container>
    </div>
  )
}

export default Hero