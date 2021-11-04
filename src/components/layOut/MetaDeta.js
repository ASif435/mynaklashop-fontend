import React from 'react';
import {Helmet} from 'react-helmet';
const MetaDeta = ({title}) => {
    return (
        <Helmet>
            <title>{`${title} - Nakla Shop`}</title>
        </Helmet>
    );
};

export default MetaDeta;