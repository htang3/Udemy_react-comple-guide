import React from 'react';
import "./WithClass.css"
const withClass = (WrappedComponent, className) => {
    //return functional component
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    )
}
export default withClass;