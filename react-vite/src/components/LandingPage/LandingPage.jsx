import './LandingPage.css'
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function LandingPage() {
    const [showForm, setShowForm] = useState(false);
    const btnRef = useRef();

    const toggleForm = () => {

        setShowForm(!showForm);
    };

    useEffect(() => {
        if (!showForm) return;


        const closeForm = (e) => {
            if (btnRef.current && !btnRef.current.contains(e.target)) {
                setShowForm(false);
            }
        };

        document.addEventListener("click", closeForm);

        return () => document.removeEventListener("click", closeForm);
    }, [showForm]);



    return (
        <div className="landing-page-container">
            <div className='title-area'>
                <h1>Celeri-<span>Scan</span></h1>
                <p>QUICK ___________</p>
                <p>CLEAR________________</p>
                <p>EFFICIENT_________________</p>
            </div>

            <div className={'lp-btn-wrapper'} ref={btnRef}>
                <div className="lp-cred-btn">
                    <OpenModalMenuItem
                        itemText="Log In"
                        onItemClick={toggleForm}
                        modalComponent={<LoginFormModal/>}
                    />
                </div>
                <div className="lp-cred-btn" id="signup-btn">
                    <OpenModalMenuItem
                        itemText="Sign Up"
                        onItemClick={toggleForm}
                        modalComponent={<SignupFormModal />}
                    />
                </div>



            </div>




        </div>
    )
}

export default LandingPage;
