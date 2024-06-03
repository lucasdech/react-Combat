import React from "react";
import Game from "./Game";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { ChooseMonster } from '../features/fight/fightSlice';
import './acceuil.css';

const LandingPage = () => {
    function App() {
        const [modalShow, setModalShow] = React.useState(true);

        return (
            <>
                <section className="hidden">
                    <Button variant="primary" onClick={() => setModalShow(true)} />
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </section>
            </>
        );
    }

    function MyVerticallyCenteredModal(props) {
        const dispatch = useDispatch();

        // Déclaration des monstres
        const monster1 = {
            "id": 1,
            "name": "Kaido",
            "pv": 800,
            "pvmax": 800,
            "attack": 10,
            "rage": 0,
            "ragemax": 5,
            "photo": "./kaido.png"
        };

        const monster2 = {
            "id": 2,
            "name": "Big Mom",
            "pv": 900,
            "pvmax": 900,
            "attack": 5,
            "rage": 0,
            "ragemax": 5,
            "photo": "./bigMom.png"
        };

        // Fonction pour choisir un monstre
        const Choose = (monster) => {
            dispatch(ChooseMonster({ monster }));
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-center">
                        <h4>Choisissez Votre Adversaire</h4>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button 
                          variant="light" 
                          onClick={() => { 
                            props.onHide(); 
                            Choose(monster1); 
                          }}>
                            <img src={monster1.photo} alt="photo mechant" />
                        </Button>
                        <Button 
                          variant="light" 
                          onClick={() => { 
                            props.onHide(); 
                            Choose(monster2); 
                          }}>
                            <img src={monster2.photo} alt="photo mechant" />
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <Game />
            <App />
        </>
    );
}

export default LandingPage;

