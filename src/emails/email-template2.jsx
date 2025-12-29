import React from 'react';

export default function EmailTemplate(body) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome {body.firstName}</h1>
        </div>
    );
}

