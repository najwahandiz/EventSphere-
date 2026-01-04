import { RiFileChart2Fill } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";



export default function Userlayout (){

	return(
		<>
		<Navbar/>
		<main>
			<Outlet />
		</main>
		<Footer/>
		</>
	);

}