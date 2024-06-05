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
            "ragemax": 15,
            "photo": "./kaido.png",
            "photo2": "./kaido2.png"

        };

        const monster2 = {
            "id": 2,
            "name": "Big Mom",
            "pv": 900,
            "pvmax": 900,
            "attack": 5,
            "rage": 0,
            "ragemax": 10,
            "photo": "./bigMom.png",
            "photo2": "./bigMom2.png"
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
                <Modal.Body className="d-flex flex-column justify-content-center" id="modalBody" > 
                    <div className="d-flex justify-content-center">
                        <h4 className="text-white fs-1">Choisissez Votre Adversaire</h4>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div id="monster1">
                            <Button className="monstre1"
                                variant="light"
                                onClick={() => {
                                    props.onHide();
                                    Choose(monster1);
                                }}>
                                <img src={monster1.photo} alt="photo mechant" />
                                <h2 className="name1">{monster1.name}</h2>
                            </Button>
                        </div>
                        <div id="monster2">
                            <Button className="monstre2"
                                variant="light"
                                onClick={() => {
                                    props.onHide();
                                    Choose(monster2);
                                }}>
                                <img src={monster2.photo} alt="photo mechant" />
                                <h2 className="name2">{monster2.name}</h2>
                            </Button>
                        </div>
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

