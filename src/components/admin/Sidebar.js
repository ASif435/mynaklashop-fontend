import React from 'react';
import {Link} from "react-router-dom";
const Sidebar = () => {
    return (
        <>
                <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>
                         <span className="hideme">Dashboard</span></Link>
                    </li>
            
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i>  <span className="hideme">Products</span> <i class= " d-inline fa fa-arrow-down" aria-hidden="true"></i></a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fas fa-clipboard-list"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/product"><i className="fas fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><i className="fas fa-shopping-basket"></i>
                        
                         <span className="hideme">Orders</span></Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fas fa-users"></i>
                         <span className="hideme">Users</span></Link>
                    </li>
          
                </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;