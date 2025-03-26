import {WavyBackgroundDemo} from "./components/wavy/WavyBackgroundDemo";
import Dashboard from "./components/dashboard/Dashboard";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
    useEffect(() => {
        const wakeUpSidd = async () => {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            // console.log(VITE_BACKEND_URL);
            const response = await axios.get(`${VITE_BACKEND_URL}/api/v1/data/ping`);
            console.log(response.data.message);
        }
        wakeUpSidd();
    }, []);

    return (
        <>
           <WavyBackgroundDemo />
           <Dashboard />
        </>
    );
};

export default App;
