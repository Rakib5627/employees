import { Outlet } from "react-router-dom";



const Root = () => {
    return (
        <div>
            <div className="">
            <div className="mx-2 max-w-6xl md:mx-auto pb-20">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Root;
